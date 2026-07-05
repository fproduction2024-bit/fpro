---
name: Figma双方向連携スキル（Figma Bidirectional Design Pipeline）
description: Antigravity ↔ Figma の双方向デザインパイプライン。HTML作成→Figma取り込み、Figma読み取り→HTML変換の両方向をサポートする。
---

# Figma 双方向デザインパイプライン

Antigravity と Figma を連携し、デザインの作成・編集・変換を双方向で行うスキル。

## 前提条件（初回セットアップ済み）

| コンポーネント | 場所 | 用途 |
|--------------|------|------|
| bun ランタイム | `~/.bun/bin/bun` | WebSocket/MCPサーバー実行 |
| Talk-to-Figma | `/Users/hiroshi/cursor/tools/talk-to-figma/` | Figma ↔ AI 通信基盤 |
| MCP 設定 | `~/.cursor/mcp.json` → `TalkToFigma` | Cursor Agent 用 MCP |
| Figma Plugin | Talk To Figma MCP Plugin（コミュニティ版） | Figma 側の通信プラグイン |
| html.to.design | Figma プラグイン | HTML → Figma レイヤー変換 |

## ワークフロー A：Antigravity → Figma（デザイン作成）

### 手順

1. **HTML/CSS を作成する**
   - ユーザーの要件に基づきリッチな HTML/CSS LP/ページを作成
   - 必ず以下を含める：
     - Google Fonts（Noto Sans JP, Inter 等）
     - CSS Custom Properties でカラーパレット定義
     - スクロールアニメーション（Intersection Observer）
     - ホバーエフェクト＆トランジション
     - レスポンシブ対応
     - 高級感あるデザイン（グラデーション、backdrop-filter、border-radius）

2. **surge.sh にデプロイする**
   ```bash
   cd <HTMLファイルのディレクトリ> && npx -y surge ./ <プロジェクト名>.surge.sh
   ```

3. **ユーザーに Figma 取り込み手順を案内する**
   - Figma を開く
   - Plugins → **html.to.design** を起動
   - デプロイ URL を貼り付け
   - Import options の推奨設定：
     - ✅ Use Autolayout
     - ✅ Create styles & variables
     - ✅ HTML layer names
     - ⬜ その他は OFF
   - **Proceed** をクリック

### 完成物
- HTML/CSS ファイル → surge.sh にデプロイ済み
- Figma に編集可能なレイヤーとして取り込み済み

---

## ワークフロー B：Figma → HTML（デザイン実装）

### 手順

1. **WebSocket サーバーを起動**
   ```bash
   /Users/hiroshi/.bun/bin/bun /Users/hiroshi/cursor/tools/talk-to-figma/src/socket.ts
   ```
   `WebSocket server running on port 3055` と表示されれば OK。

2. **Figma でプラグインを起動**
   - Figma でデザインファイルを開く
   - 右クリック → Plugins → **Cursor Talk to Figma MCP Plugin**
   - 表示された **Channel ID** をコピー

3. **Cursor Agent で接続**（Antigravity ではなく Cursor の Agent モード）
   - Agent チャットで：「Figma に接続して。Channel ID: <コピーした ID>」
   - TalkToFigma MCP 経由でデザインデータを読み取り
   - HTML/CSS に変換

### 注意事項
- TalkToFigma MCP は **Cursor Agent** に接続されている（Antigravity からは直接利用不可）
- WebSocket サーバーはターミナルで常時起動しておく必要がある
- Figma Plugin も常時起動しておく必要がある

---

## ワークフロー C：双方向イテレーション

```
① Antigravity が HTML を作成
↓
② surge.sh にデプロイ
↓
③ html.to.design で Figma に取り込み
↓
④ Figma でデザイン微調整（色、フォント、レイアウト）
↓
⑤ /figma-to-html ワークフローで HTML に再変換
↓
⑥ ①に戻ってさらに改善
```

---

## トラブルシューティング

| 症状 | 対処 |
|------|------|
| `bun: command not found` | フルパスで実行: `/Users/hiroshi/.bun/bin/bun` |
| npm EACCES エラー | `sudo chown -R 501:20 "/Users/hiroshi/.npm"` |
| WebSocket サーバーが落ちる | `bun socket` ではなくフルパスで起動 |
| Figma Plugin が見つからない | コミュニティページから「場所を指定して開く」で起動 |
| TalkToFigma MCP が赤い | Cursor を再起動 |
| html.to.design で空白ページ | スクロールアニメーション (`.reveal`) が原因。デプロイ前に `opacity:0` を `opacity:1` に変更するか、JS を調整 |

## 関連ワークフロー

- `/figma-to-html` — Figma デザインを HTML/CSS に変換
- `/deploy` — surge.sh へのデプロイ
