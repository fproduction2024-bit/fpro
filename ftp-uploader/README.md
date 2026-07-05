# FTP簡単アップロードツール 📤

ローカルファイルをコマンド一つでFTPサーバーにアップロードできるツールです。

## セットアップ

### 1. 設定ファイルの作成

```bash
cd /Users/hiroshi/cursor/ftp-uploader
cp config.json.template config.json
```

### 2. FTP接続情報を編集

`config.json`を開いて、あなたのFTPサーバー情報を入力してください：

```json
{
  "host": "ftp.yourserver.com",
  "port": 21,
  "username": "your_username",
  "password": "your_password",
  "remote_directory": "/public_html",
  "passive_mode": true
}
```

**設定項目:**
- `host`: FTPサーバーのホスト名またはIPアドレス
- `port`: FTPポート番号（通常は21）
- `username`: FTPユーザー名
- `password`: FTPパスワード
- `remote_directory`: アップロード先のディレクトリ（省略可能）
- `passive_mode`: パッシブモードを使用するか（true/false）

### 3. スクリプトに実行権限を付与（オプション）

```bash
chmod +x upload.py
```

## 使い方

### 基本的な使い方

```bash
python upload.py <ローカルファイルパス>
```

ファイルは設定したリモートディレクトリに、元のファイル名でアップロードされます。

### 使用例

#### 1. 単一ファイルをアップロード
```bash
python upload.py ./index.html
```

#### 2. リモートパスを指定してアップロード
```bash
python upload.py ./image.png images/header.png
```

#### 3. 別のディレクトリのファイルをアップロード
```bash
python upload.py /Users/hiroshi/Desktop/document.pdf
```

#### 4. 相対パスでアップロード
```bash
python upload.py ../lp-builder/index.html lp/index.html
```

## Antigravityからの使用

Antigravityに以下のように指示するだけでアップロードできます：

```
/Users/hiroshi/cursor/docs/sample.pdfをFTPにアップロードして
```

## トラブルシューティング

### 接続エラーが出る場合
- `config.json`のホスト名、ユーザー名、パスワードを確認
- ファイアウォールやルーターの設定を確認
- `passive_mode`を`false`に変更してみる

### ファイルが見つからないエラー
- ローカルファイルのパスが正しいか確認
- 絶対パスを使用してみる

### 権限エラーが出る場合
- FTPユーザーがアップロード先ディレクトリへの書き込み権限を持っているか確認

## セキュリティに関する注意

⚠️ `config.json`にはパスワードが平文で保存されます。以下の点に注意してください：

1. **Gitにコミットしない**: `.gitignore`に`config.json`を追加
2. **ファイル権限を制限**: `chmod 600 config.json`で自分だけが読めるようにする
3. **共有しない**: このファイルを他人と共有しない

## .gitignoreの設定

プロジェクトルートの`.gitignore`に以下を追加することをお勧めします：

```
# FTP設定ファイル（パスワード含む）
ftp-uploader/config.json
```

## 対応プロトコル

- FTP（File Transfer Protocol）
- ※ SFTP（SSH File Transfer Protocol）には対応していません
- ※ FTPS（FTP over SSL/TLS）には対応していません

SFTP/FTPSが必要な場合は、別途スクリプトを作成できます。
