# Proline KPI Google Sheets Export セットアップ手順

## 概要
毎週月曜日 9:00 に自動でプロラインのKPIデータを取得し、Google Sheetsに書き込みます。

## セットアップ手順

### 1. Google Cloud サービスアカウントの作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成（または既存を選択）
3. **APIs & Services** > **Enable APIs** で以下を有効化:
   - Google Sheets API
   - Google Drive API
4. **APIs & Services** > **Credentials** > **Create Credentials** > **Service Account**
5. サービスアカウント名を入力（例: `proline-kpi-exporter`）
6. 作成後、サービスアカウントをクリック > **Keys** > **Add Key** > **Create new key** > **JSON**
7. ダウンロードしたJSONファイルを以下にコピー:
   ```
   /Users/hiroshi/cursor/projects/proline_extractor/credentials.json
   ```

### 2. スプレッドシートの共有設定

スプレッドシートが自動作成された後、サービスアカウントのメールアドレスに編集権限を付与する必要があります。

サービスアカウントのメールアドレスは `credentials.json` 内の `client_email` フィールドにあります。

### 3. 手動テスト

```bash
cd /Users/hiroshi/cursor/projects/proline_extractor
source .venv/bin/activate
python3 sheets_export.py
```

### 4. スケジューラーの有効化

```bash
# plistをLaunchAgentsにコピー
cp com.hiroshi.proline-kpi-export.plist ~/Library/LaunchAgents/

# スケジューラーを有効化
launchctl load ~/Library/LaunchAgents/com.hiroshi.proline-kpi-export.plist

# 状態確認
launchctl list | grep proline
```

### 5. スケジューラーの停止（必要な場合）

```bash
launchctl unload ~/Library/LaunchAgents/com.hiroshi.proline-kpi-export.plist
```

## ファイル構成

```
proline_extractor/
├── credentials.json      # Google Cloud サービスアカウント認証情報（要作成）
├── session.json          # プロラインセッション情報
├── extractor.py          # KPI抽出スクリプト
├── sheets_export.py      # Google Sheets書き込みスクリプト
├── run_export.sh         # 実行用シェルスクリプト
├── com.hiroshi.proline-kpi-export.plist  # launchd設定
└── logs/                 # ログファイル
```

## 出力されるデータ

| 列 | 内容 |
|----|------|
| Date | 実行日時 |
| User Count | 友だち数（全体） |
| Monthly Sends | 月間配信数 |
| Monthly Limit | 月間配信上限 |
| Step Count | ステップ数 |
| Plan Name | プラン名 |
| Friends (45-15 days) | 友だち追加数（45〜15日前） |
| Purchasers (45-15 days) | 購入者数（45〜15日前） |
| Conversion Rate (%) | 購入率 |
