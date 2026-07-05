# Zoom録画 → YouTube 自動アップロード セットアップガイド（ポーリング方式）

## 仕組み

```
30分ごとに自動実行 → Zoom APIで録画確認 → 新しい録画をダウンロード → YouTubeに限定公開でアップ
```

> Webhook不要！GASのタイマーで定期チェックするシンプルな方式です。

---

## Step 1: GCP プロジェクト設定

### 1-1. YouTube Data API v3 を有効化
1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクト番号 `584021802580` のプロジェクトを選択
3. 左メニュー → **「API とサービス」** → **「ライブラリ」**
4. 「YouTube Data API v3」を検索 → **「有効にする」**

### 1-2. OAuth 同意画面の設定（設定済みならスキップ）
1. **「API とサービス」** → **「OAuth 同意画面」**
2. テストユーザーに `fproduction2024@gmail.com` が追加されていることを確認

---

## Step 2: Zoom Server-to-Server OAuth アプリ

### すでに作成済みの場合
Step 3 に進んでください。以下の3つの値が手元にあることを確認：
- **Account ID**
- **Client ID**
- **Client Secret**

### まだの場合
1. [Zoom App Marketplace](https://marketplace.zoom.us/) → **Develop** → **Build App**
2. **Server-to-Server OAuth** を選択 → 作成
3. **Scopes** → Recording → `cloud_recording:read:recording:admin` を追加
4. **Activation** → アプリを有効化
5. Account ID / Client ID / Client Secret をメモ

> ⚠️ Webhook / Event Subscriptions の設定は**不要**です！

---

## Step 3: Google Apps Script 設定

### 3-1. コードを更新
1. [GAS エディタ](https://script.google.com/) で「Zoom to YouTube Uploader」を開く
2. `Code.gs` の内容を**すべて削除**し、新しいコードを貼り付け:
   - [Code.gs](file:///Users/hiroshi/cursor/tools/zoom-to-youtube/Code.gs)

### 3-2. appsscript.json を更新
1. ⚙ **プロジェクトの設定** → エディタにマニフェスト表示をON
2. `appsscript.json` を以下に置き換え:
   - [appsscript.json](file:///Users/hiroshi/cursor/tools/zoom-to-youtube/appsscript.json)

### 3-3. スクリプトプロパティを設定
⚙ **プロジェクトの設定** → **スクリプト プロパティ**:

| プロパティ名 | 値 |
|---|---|
| `ZOOM_CLIENT_ID` | Zoomの Client ID |
| `ZOOM_CLIENT_SECRET` | Zoomの Client Secret |
| `ZOOM_ACCOUNT_ID` | Zoomの Account ID |
| `DRIVE_FOLDER_ID` | （省略可）一時保存用DriveフォルダのID |

> `ZOOM_WEBHOOK_SECRET_TOKEN` は**不要**になりました。設定済みなら削除してOKです。

### 3-4. YouTube Advanced Service 確認
左メニュー **「サービス」** に `YouTube` が表示されていればOK。なければ **＋** → YouTube Data API v3 を追加。

---

## Step 4: タイマーを起動

1. GAS エディタで関数選択を **`setupTrigger`** に変更
2. **▶ 実行** をクリック（権限の承認が求められたら許可）
3. 実行ログに「✅ タイマー設定完了」と表示されればOK

これで**30分ごと**に自動で新しい録画をチェックします。

---

## Step 5: テスト

### すぐに動作確認する場合
1. Zoomで短いテスト録画を実施（クラウド録画をON）
2. 録画終了後、クラウド処理が完了するのを数分待つ
3. GAS エディタで **`checkNewRecordings`** を手動実行
4. 実行ログを確認
5. YouTube Studio で限定公開動画が追加されていることを確認

### 設定確認
`checkConfig` を実行すると、全設定の状態を一覧で確認できます。

---

## 便利な関数一覧

| 関数名 | 用途 |
|---|---|
| `setupTrigger` | 30分タイマーを開始 |
| `stopTrigger` | タイマーを停止 |
| `checkNewRecordings` | 今すぐ録画を確認（手動実行） |
| `checkConfig` | 設定状態を確認 |
| `viewRecentLogs` | 直近のログを表示 |
| `resetProcessedIds` | 処理済みリストをリセット（再アップしたい時） |

---

## トラブルシューティング

| 問題 | 対処法 |
|---|---|
| 録画が検出されない | クラウド録画がONか確認。録画後数分待ってから再実行 |
| Zoomトークンエラー | Client ID / Secret / Account ID を再確認 |
| YouTubeアップ失敗 | YouTube Advanced Service が有効か確認 |
| 同じ動画が重複アップ | `resetProcessedIds` で処理済みリストをリセット |
