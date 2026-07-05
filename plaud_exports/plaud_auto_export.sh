#!/bin/bash
# PLAUD NOTE Auto Export Script
# macOS launchd から呼ばれる自動エクスポートスクリプト
# 新しい録音を検出して Markdown にエクスポートする

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
EXPORT_SCRIPT="$SCRIPT_DIR/plaud_export.py"
TOKEN_FILE="$SCRIPT_DIR/.plaud_token"
LOG_FILE="$SCRIPT_DIR/auto_export.log"

# ログ出力
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# トークン読み込み
if [ ! -f "$TOKEN_FILE" ]; then
    log "ERROR: Token file not found: $TOKEN_FILE"
    exit 1
fi

TOKEN=$(cat "$TOKEN_FILE" | tr -d '\n')

if [ -z "$TOKEN" ]; then
    log "ERROR: Token is empty"
    exit 1
fi

log "Starting auto export..."

# Python スクリプト実行
cd "$SCRIPT_DIR"
/usr/bin/python3 "$EXPORT_SCRIPT" \
    --auto \
    --limit 50 \
    --token "$TOKEN" \
    --dir "$SCRIPT_DIR" \
    --state-file "$SCRIPT_DIR/plaud_processed.json" \
    >> "$LOG_FILE" 2>&1

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    log "Auto export completed successfully."
else
    log "ERROR: Auto export failed with exit code $EXIT_CODE"
fi

# ログファイルが大きくなりすぎないように 10000行に制限
tail -n 10000 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
