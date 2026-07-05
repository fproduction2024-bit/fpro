---
description: Figma デザインを HTML/CSS に変換する（Figma MCP Server 連携）
---

# Figma ↔ Antigravity 双方向ワークフロー

Figma と Antigravity を双方向で連携し、デザインの読み取り・書き込み・HTML変換を行う。

// turbo-all

## 前提条件

- `~/.cursor/mcp.json` に TalkToFigma MCP Server が設定済み
- `bun` がインストール済み（`~/.bun/bin/bun`）
- Figma に「Cursor Talk to Figma MCP Plugin」がインストール済み

## 事前準備（毎回）

### 1. WebSocket サーバーを起動

```bash
cd /Users/hiroshi/cursor/tools/talk-to-figma && ~/.bun/bin/bun socket
```

ターミナルに `WebSocket server started on port 3055` と表示されれば OK。

### 2. Figma でプラグインを起動

1. Figma を開く
2. 右クリック → Plugins → Cursor Talk to Figma MCP Plugin
3. 表示された Channel ID をコピー

### 3. Antigravity で接続

Antigravity に以下を伝える：
```
Figma に接続して。Channel ID: <コピーした Channel ID>
```

## ワークフロー手順

### A. Figma → HTML 変換

1. ユーザーから Figma ファイル URL またはフレーム指定を受け取る
2. MCP 経由でデザインデータ（レイアウト、色、フォント、画像）を取得
3. HTML/CSS に変換（レスポンシブ対応、アニメーション追加）

**リッチさの追加:**
- スクロールアニメーション（Intersection Observer）
- ホバーエフェクト（ボタン、カード、リンク）
- スムーズなトランジション

### B. Antigravity → Figma 書き込み

1. ユーザーの指示に基づき、Figma 上にデザインを直接作成
2. フレーム、テキスト、四角形、画像などを配置
3. 色、フォント、スペーシングを設定

### C. デプロイ（オプション）

ユーザーが希望する場合、`/deploy` ワークフローで surge.sh にデプロイ。
