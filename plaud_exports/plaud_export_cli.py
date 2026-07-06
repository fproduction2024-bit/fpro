#!/usr/bin/env python3
"""
plaud_export_cli.py — Plaud 公式CLI (@plaud-ai/cli) 経由で録音を Markdown 出力する新エクスポータ

旧 plaud_export.py は Plaud の非公式API (api-apne1.plaud.ai) を、ブラウザ localStorage から
手動コピーした JWT (.plaud_token) で直叩きしていた。トークンが失効するたびに手動更新が必要で、
非公式APIなので仕様変更で黙って壊れるリスクがあった。

本スクリプトは公式CLIをラップする。CLIが OAuth トークン (~/.plaud/tokens.json) の保存と
自動リフレッシュを担うため、手動トークン更新が不要になる。CLI の transcript/summary は
`-o` でファイルに正確に書き出せるので、それを読んで旧 plaud_export.py と同じ体裁の
Markdown（plaud_exports/YYYY... .md）に組み立てて保存する。

出力先・命名・「AI処理が未完了なものはスキップ」の挙動は旧スクリプトと揃えてあるので、
後段の plaud_bridge.py / mtg-inbox パイプラインは無変更で動く。

## 絶対ルール
- 旧 plaud_export.py / plaud_auto_export.sh / .plaud_token / 既存 launchd には触れない。
- 状態管理は本スクリプト専用の state-file で行う（旧 plaud_processed.json とは別。
  CLIのfile_idと旧APIのidは体系が違う可能性があるため混ぜない）。
- 差し替え時は必ず --seed-baseline を一度実行し、過去録音を一気に再出力しないこと。

## 使い方
    plaud_export_cli.py --plaud-bin <path> --dir <出力先> --state-file <json> [--days 3]
    plaud_export_cli.py ... --dry-run          # 何が起きるか表示のみ
    plaud_export_cli.py ... --seed-baseline    # 現在の対象を全て処理済み登録するのみ（出力しない）
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime

ANSI_RE = re.compile(r"\x1b\[[0-9;]*m")
# Plaud の file_id は 32桁前後の英数字。行頭の第1カラムから拾う。
ID_RE = re.compile(r"^\s+([A-Za-z0-9][A-Za-z0-9_-]{9,40})\s{2,}")


def strip_ansi(s: str) -> str:
    return ANSI_RE.sub("", s)


def run_cli(plaud_bin: str, args: list[str], env: dict) -> subprocess.CompletedProcess:
    """CLI を1回呼ぶ。stdout/stderr を捕捉して返す。"""
    return subprocess.run(
        [plaud_bin, *args],
        capture_output=True,
        text=True,
        env=env,
        timeout=120,
    )


def cli_env() -> dict:
    """cron/launchd 向けに対話・テレメトリ・更新通知を抑止した環境を作る。"""
    env = dict(os.environ)
    env["PLAUD_TELEMETRY_DISABLED"] = "1"
    env["DO_NOT_TRACK"] = "1"
    env["PLAUD_NO_UPDATE_NOTIFIER"] = "1"
    env["CI"] = "1"  # 対話プロンプトを避ける保険
    return env


def list_recent_ids(plaud_bin: str, days: int, env: dict) -> list[str]:
    """`plaud recent -d <days>` の出力から file_id を新しい順で抽出する。"""
    proc = run_cli(plaud_bin, ["recent", "-d", str(days)], env)
    if proc.returncode != 0:
        raise RuntimeError(
            f"`plaud recent` failed (exit {proc.returncode}): {proc.stderr.strip() or proc.stdout.strip()}"
        )
    ids: list[str] = []
    for raw in proc.stdout.splitlines():
        line = strip_ansi(raw)
        # ヘッダ行・区切り線・件数行を除外
        if "ID" in line and "NAME" in line:
            continue
        m = ID_RE.match(line)
        if not m:
            continue
        fid = m.group(1)
        if fid.upper() == "ID":
            continue
        if fid not in ids:
            ids.append(fid)
    return ids


def get_file_meta(plaud_bin: str, file_id: str, env: dict) -> dict:
    """`plaud file <id>` の key: value 出力から name/created_at/duration を取り出す。"""
    proc = run_cli(plaud_bin, ["file", file_id], env)
    if proc.returncode != 0:
        raise RuntimeError(
            f"`plaud file {file_id}` failed (exit {proc.returncode}): {proc.stderr.strip() or proc.stdout.strip()}"
        )
    meta: dict[str, str] = {}
    for raw in proc.stdout.splitlines():
        line = strip_ansi(raw).strip()
        m = re.match(r"^([a-z_]+):\s+(.*)$", line)
        if m:
            meta[m.group(1)] = m.group(2).strip()
    return meta


def fetch_to_file(plaud_bin: str, sub: str, file_id: str, env: dict) -> str | None:
    """transcript/summary を一時ファイルに書き出させ、その中身を返す。
    未生成（AI未完了）なら CLI はファイルを書かず 'not available' を出す → None を返す。"""
    with tempfile.NamedTemporaryFile("r", suffix=".txt", delete=False) as tf:
        tmp_path = tf.name
    try:
        proc = run_cli(plaud_bin, [sub, file_id, "-o", tmp_path], env)
        combined = strip_ansi((proc.stdout or "") + (proc.stderr or ""))
        if "not available" in combined.lower():
            return None
        if proc.returncode != 0:
            raise RuntimeError(
                f"`plaud {sub} {file_id}` failed (exit {proc.returncode}): {combined.strip()}"
            )
        with open(tmp_path, "r", encoding="utf-8") as f:
            content = f.read().strip()
        return content or None
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass


def sanitize(name: str) -> str:
    safe = "".join(c if c.isalnum() or c in " _-" else "_" for c in name)
    return safe.strip() or "untitled"


def build_markdown(meta: dict, summary: str | None, transcript: str | None) -> str:
    name = meta.get("name") or meta.get("id") or "Untitled"
    date_str = meta.get("start_at") or meta.get("created_at") or "Unknown date"
    duration = meta.get("duration") or "-"
    lines = [
        f"# {name}",
        "",
        f"**Date**: {date_str}",
        f"**Duration**: {duration}",
        "",
    ]
    if summary:
        lines += ["---", "", "## AI Summary", "", summary, ""]
    if transcript:
        lines += ["---", "", "## Transcript", "", transcript, ""]
    return "\n".join(lines)


def load_state(state_file: str) -> set[str]:
    if os.path.exists(state_file):
        try:
            with open(state_file, "r") as f:
                return set(json.load(f))
        except Exception:
            return set()
    return set()


def save_state(state_file: str, ids: set[str]) -> None:
    with open(state_file, "w") as f:
        json.dump(sorted(ids), f, ensure_ascii=False, indent=0)


def main() -> int:
    p = argparse.ArgumentParser(description="Export Plaud recordings via the official CLI")
    p.add_argument("--plaud-bin", required=True, help="Path to the `plaud` CLI binary")
    p.add_argument("--dir", default="plaud_exports", help="Output directory")
    p.add_argument("--state-file", default="plaud_cli_processed.json", help="Processed-IDs state file")
    p.add_argument("--days", type=int, default=3, help="How many days back to scan (default: 3)")
    p.add_argument("--dry-run", action="store_true", help="Show what would happen; write nothing")
    p.add_argument("--seed-baseline", action="store_true",
                   help="Mark all currently-listed recordings as processed without exporting")
    args = p.parse_args()

    env = cli_env()
    os.makedirs(args.dir, exist_ok=True)
    processed = load_state(args.state_file)

    try:
        ids = list_recent_ids(args.plaud_bin, args.days, env)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 3

    new_ids = [i for i in ids if i not in processed]
    print(f"Scanned last {args.days} day(s): {len(ids)} recordings, {len(new_ids)} new.")

    if args.seed_baseline:
        processed.update(ids)
        if not args.dry_run:
            save_state(args.state_file, processed)
        print(f"Baseline seeded: {len(ids)} IDs marked processed. No files exported.")
        return 0

    exported = 0
    for fid in new_ids:
        try:
            meta = get_file_meta(args.plaud_bin, fid, env)
        except Exception as e:
            print(f"  WARN: metadata fetch failed for {fid}: {e}", file=sys.stderr)
            continue

        transcript = fetch_to_file(args.plaud_bin, "transcript", fid, env)
        summary = fetch_to_file(args.plaud_bin, "summary", fid, env)

        if transcript is None and summary is None:
            print(f"  Skip {fid} ({meta.get('name','?')}): AI processing not complete yet.")
            continue

        name = meta.get("name") or fid
        out_path = os.path.join(args.dir, f"{sanitize(name)}.md")
        # 同名衝突は連番で回避（別録音を握りつぶさない）
        base, ext = os.path.splitext(out_path)
        n = 2
        while os.path.exists(out_path):
            out_path = f"{base}_{n}{ext}"
            n += 1

        md = build_markdown(meta, summary, transcript)
        if args.dry_run:
            print(f"  [dry-run] would write {out_path} ({len(md)} bytes)")
        else:
            with open(out_path, "w", encoding="utf-8") as f:
                f.write(md)
            print(f"  Exported {fid} -> {out_path}")
            exported += 1

        processed.add(fid)
        if not args.dry_run:
            save_state(args.state_file, processed)

    print(f"Done. {exported} exported, {len(new_ids) - exported} skipped/pending.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
