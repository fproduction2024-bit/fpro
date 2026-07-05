---
description: Claude Code にタスクを委譲して結果を受け取る（Antigravity UI からの自動化）
---

# Claude Code タスク委譲

// turbo-all

Antigravity から Claude Code CLI にタスクを投げて結果を受け取るワークフロー。

## 前提

- Claude Code がインストール済み（`/usr/local/bin/claude`）
- 委譲スクリプト: `.agent/scripts/claude-delegate.sh`

---

## 手順

### 1. タスク内容の確認

ユーザーが `/claude` の後に指定したタスク内容を確認する。タスク内容が不明瞭な場合はユーザーに確認する。

### 2. Claude Code にタスクを委譲

`claude-delegate.sh` を使って Claude Code にタスクを実行させる。

```bash
/Users/hiroshi/cursor/.agent/scripts/claude-delegate.sh "ここにタスク内容を入れる"
```

**オプション指定例:**
- 作業ディレクトリ指定: `--cwd /path/to/dir`
- 予算上限変更: `--budget 2.0`（デフォルト: $1）
- モデル変更: `--model opus`
- JSON 生出力: `--raw`

### 3. 結果の報告

Claude Code から返された結果をユーザーに要約して報告する。必要に応じて、結果に基づいた追加アクションを提案する。
