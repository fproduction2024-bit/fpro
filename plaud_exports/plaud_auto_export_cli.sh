#!/bin/bash
# plaud_auto_export_cli.sh — Plaud 公式CLI版の自動エクスポート（launchd から呼ばれる）
#
# 旧 plaud_auto_export.sh（非公式API + 手動JWT .plaud_token）の後継。
# 公式CLI (@plaud-ai/cli) が OAuth トークン (~/.plaud/tokens.json) の保存と
# 自動リフレッシュを担うため、手動トークン更新が不要。
#
# 差し替え前に plaud_export_cli.py --seed-baseline を一度実行して、過去録音を
# 一気に再出力しないようにしておくこと（実施済み前提）。
#
# 出力先は従来どおり plaud_exports/。後段の inbox-bridge / mtg-inbox は無変更で動く。

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EXPORT_SCRIPT="$SCRIPT_DIR/plaud_export_cli.py"
STATE_FILE="$SCRIPT_DIR/plaud_cli_processed.json"
LOG_FILE="$SCRIPT_DIR/auto_export_cli.log"

# Node（公式バイナリを ~/opt/node に展開済み）を PATH に通す。
# CLI は #!/usr/bin/env node で起動するため node が PATH に必要。
export PATH="$HOME/opt/node/bin:$PATH"
PLAUD_BIN="$HOME/opt/plaud-cli/node_modules/.bin/plaud"

# cron/launchd 向け: テレメトリ・更新通知・対話プロンプトを抑止
export PLAUD_TELEMETRY_DISABLED=1
export DO_NOT_TRACK=1
export PLAUD_NO_UPDATE_NOTIFIER=1
export CI=1

# 直近何日分を走査するか（AI要約が遅れて完了するケースも拾えるよう3日）
DAYS="${PLAUD_EXPORT_DAYS:-3}"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "===== plaud_auto_export_cli.sh 開始 (days=$DAYS) ====="

if [ ! -x "$PLAUD_BIN" ]; then
    log "ERROR: plaud CLI not found at $PLAUD_BIN"
    exit 1
fi

/usr/bin/python3 "$EXPORT_SCRIPT" \
    --plaud-bin "$PLAUD_BIN" \
    --dir "$SCRIPT_DIR" \
    --state-file "$STATE_FILE" \
    --days "$DAYS" \
    >> "$LOG_FILE" 2>&1
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    log "完了 (exit 0)"
else
    log "ERROR: エクスポート失敗 (exit $EXIT_CODE)"
fi

# ログを末尾10000行に制限
if [ -f "$LOG_FILE" ]; then
    tail -n 10000 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
fi

exit $EXIT_CODE
