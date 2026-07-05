#!/bin/bash
# claude-delegate.sh — Antigravity → Claude Code タスク委譲スクリプト
#
# Usage:
#   claude-delegate.sh "タスク内容"
#   claude-delegate.sh "タスク内容" --cwd /path/to/dir
#   claude-delegate.sh "タスク内容" --budget 2.0
#   claude-delegate.sh "タスク内容" --model opus

set -euo pipefail

# ── デフォルト設定 ──
DEFAULT_BUDGET="1.00"
DEFAULT_CWD="/Users/hiroshi/cursor/docs"
DEFAULT_MODEL=""  # 空 = Claude Code のデフォルト (sonnet)

# ── 引数パース ──
TASK=""
CWD="$DEFAULT_CWD"
BUDGET="$DEFAULT_BUDGET"
MODEL="$DEFAULT_MODEL"
SYSTEM_PROMPT=""
RAW_JSON=false

while [[ $# -gt 0 ]]; do
  case $1 in
    --cwd)
      CWD="$2"
      shift 2
      ;;
    --budget)
      BUDGET="$2"
      shift 2
      ;;
    --model)
      MODEL="$2"
      shift 2
      ;;
    --system-prompt)
      SYSTEM_PROMPT="$2"
      shift 2
      ;;
    --raw)
      RAW_JSON=true
      shift
      ;;
    --help|-h)
      echo "Usage: claude-delegate.sh \"タスク内容\" [options]"
      echo ""
      echo "Options:"
      echo "  --cwd <path>            作業ディレクトリ (default: $DEFAULT_CWD)"
      echo "  --budget <amount>       最大予算 USD (default: $DEFAULT_BUDGET)"
      echo "  --model <model>         モデル指定 (e.g. opus, sonnet, haiku)"
      echo "  --system-prompt <text>  追加のシステムプロンプト"
      echo "  --raw                   JSON 生出力を返す"
      echo "  -h, --help              このヘルプを表示"
      exit 0
      ;;
    *)
      if [[ -z "$TASK" ]]; then
        TASK="$1"
      else
        echo "Error: 予期しない引数: $1" >&2
        exit 1
      fi
      shift
      ;;
  esac
done

if [[ -z "$TASK" ]]; then
  echo "Error: タスク内容を指定してください" >&2
  echo "Usage: claude-delegate.sh \"タスク内容\"" >&2
  exit 1
fi

# ── Claude Code コマンド構築 ──
CMD=(claude -p "$TASK" --output-format json --max-budget-usd "$BUDGET")

if [[ -n "$MODEL" ]]; then
  CMD+=(--model "$MODEL")
fi

if [[ -n "$SYSTEM_PROMPT" ]]; then
  CMD+=(--append-system-prompt "$SYSTEM_PROMPT")
fi

# ── 実行 ──
echo "━━━ Claude Code に委譲中 ━━━"
echo "📋 タスク: $TASK"
echo "📁 作業Dir: $CWD"
echo "💰 予算上限: \$$BUDGET"
[[ -n "$MODEL" ]] && echo "🤖 モデル: $MODEL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 実行して結果をキャプチャ
RESULT=$(cd "$CWD" && "${CMD[@]}" 2>&1) || {
  EXIT_CODE=$?
  echo "❌ Claude Code がエラーで終了しました (exit code: $EXIT_CODE)" >&2
  echo "$RESULT" >&2
  exit $EXIT_CODE
}

# ── 結果処理 ──
if [[ "$RAW_JSON" == true ]]; then
  echo "$RESULT"
else
  # JSON から result フィールドを抽出
  EXTRACTED=$(echo "$RESULT" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if data.get('is_error'):
        print('❌ エラー:', data.get('result', '不明なエラー'))
        sys.exit(1)
    
    result = data.get('result', '')
    cost = data.get('total_cost_usd', 0)
    duration = data.get('duration_ms', 0)
    turns = data.get('num_turns', 0)
    
    print(result)
    print()
    print(f'━━━ 実行情報 ━━━')
    print(f'⏱  所要時間: {duration/1000:.1f}秒')
    print(f'💰 コスト: \${cost:.4f}')
    print(f'🔄 ターン数: {turns}')
except json.JSONDecodeError:
    # JSON でない場合はそのまま出力
    print(sys.stdin.read() if not result else result)
except Exception as e:
    print(f'結果パースエラー: {e}', file=sys.stderr)
    print(sys.stdin.read())
" 2>&1) || EXTRACTED="$RESULT"
  
  echo "$EXTRACTED"
fi
