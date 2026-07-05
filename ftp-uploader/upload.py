#!/usr/bin/env python3
"""
FTP簡単アップロードツール
使い方: python upload.py <ローカルファイルパス> [リモートパス]
"""

import sys
import os
import json
from ftplib import FTP
from pathlib import Path

def load_config():
    """設定ファイルを読み込む"""
    config_path = Path(__file__).parent / "config.json"
    
    if not config_path.exists():
        print("❌ エラー: config.jsonが見つかりません")
        print("📝 config.json.templateを参考に設定ファイルを作成してください")
        sys.exit(1)
    
    with open(config_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def upload_file(local_path, remote_path=None):
    """ファイルをFTPサーバーにアップロード"""
    
    # 設定を読み込む
    config = load_config()
    
    # ローカルファイルの確認
    if not os.path.exists(local_path):
        print(f"❌ エラー: ファイルが見つかりません: {local_path}")
        sys.exit(1)
    
    # リモートパスが指定されていない場合はファイル名のみ使用
    if remote_path is None:
        remote_path = os.path.basename(local_path)
    
    try:
        # FTP接続
        print(f"🔌 接続中... {config['host']}")
        ftp = FTP()
        ftp.connect(config['host'], config.get('port', 21))
        ftp.login(config['username'], config['password'])
        
        # パッシブモードを設定（ファイアウォール越えに有効）
        ftp.set_pasv(config.get('passive_mode', True))
        
        # ディレクトリ変更（設定されている場合）
        if config.get('remote_directory'):
            print(f"📁 ディレクトリ移動: {config['remote_directory']}")
            ftp.cwd(config['remote_directory'])
        
        # ファイルアップロード
        print(f"⬆️  アップロード中: {local_path} → {remote_path}")
        with open(local_path, 'rb') as file:
            ftp.storbinary(f'STOR {remote_path}', file)
        
        # ファイルサイズ確認
        size = os.path.getsize(local_path)
        print(f"✅ アップロード完了！ ({size:,} bytes)")
        
        # 現在のディレクトリのファイル一覧を表示
        print("\n📋 アップロード先のファイル一覧:")
        ftp.retrlines('LIST')
        
        # 接続終了
        ftp.quit()
        
    except Exception as e:
        print(f"❌ エラーが発生しました: {str(e)}")
        sys.exit(1)

def main():
    """メイン処理"""
    if len(sys.argv) < 2:
        print("使い方: python upload.py <ローカルファイルパス> [リモートパス]")
        print("\n例:")
        print("  python upload.py ./index.html")
        print("  python upload.py ./image.png images/image.png")
        sys.exit(1)
    
    local_path = sys.argv[1]
    remote_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    upload_file(local_path, remote_path)

if __name__ == "__main__":
    main()
