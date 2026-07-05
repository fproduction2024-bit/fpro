# Cursor Workspace

このワークスペースは、プロジェクトベースで整理された開発環境です。

## ディレクトリ構造

```
cursor/
├── projects/          # 各種プロジェクト
│   ├── web_crawler/      # Webスクレイピングツール
│   ├── action_manager/   # YouTubeワークフロー管理アプリ
│   ├── webp2png/         # WebP画像をPNGに変換するツール
│   ├── hub_dashboard/    # 各種ツールのハブダッシュボード
│   └── obsidian_fix/     # Obsidian関連の修正・拡張
├── data/              # データ・コンテンツ
│   ├── articles/         # スクレイピングされた記事
│   ├── autosns_manuals/  # AutoSNSマニュアル
│   ├── scraped_content/  # スクレイピングされたコンテンツ
│   ├── 5ch-bbs/          # 5ch BBSデータ
│   └── サンパパさんテスト/ # テストデータ
├── docs/              # ドキュメント
│   └── 古橋の会社ナレッジ/ # 会社のナレッジベース
└── archive/           # ビルド成果物・一時ファイル
```

## プロジェクト概要

### Web Crawler
Webサイトから記事やコンテンツをスクレイピングし、Markdown形式で保存するツール。

📂 [詳細はこちら](projects/web_crawler/README.md)

### Action Manager
YouTube動画制作ワークフローを管理するアプリケーション。各ステップのプロンプトをコピーして効率的に作業できます。

📂 [詳細はこちら](projects/action_manager/)

### WebP2PNG
WebP画像をPNG形式に変換するコマンドラインツール。透明度を保持し、一括変換にも対応。

📂 [詳細はこちら](projects/webp2png/README.md)

### Hub Dashboard
各種ツールへのアクセスを集約したダッシュボード。

📂 [詳細はこちら](projects/hub_dashboard/)

### Obsidian Fix
Obsidianの拡張機能や修正スクリプト。

📂 [詳細はこちら](projects/obsidian_fix/)

## セットアップ

各プロジェクトには独自のREADMEとセットアップ手順があります。詳細は各プロジェクトのディレクトリを参照してください。

## データディレクトリ

- **articles/**: GitHubActionsで自動スクレイピングされた記事
- **autosns_manuals/**: AutoSNSのマニュアルデータ
- **scraped_content/**: 手動でスクレイピングしたコンテンツ
- **docs/**: 会社のナレッジベースや重要なドキュメント

## 開発環境

- Python仮想環境は各プロジェクト内に配置
- 共通スクリプトは `scripts/` ディレクトリに配置
- ビルド成果物は `archive/` に保存

## ライセンス

各プロジェクトのライセンスについては、各プロジェクトのREADMEを参照してください。
