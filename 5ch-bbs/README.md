# 5ch風掲示板Webサイト

5ch（旧2ちゃんねる）のような匿名掲示板Webサイトです。会員登録不要で、誰でも匿名で利用できます。

## 技術スタック

- **フロントエンド**: Next.js (Pages Router) + TypeScript
- **バックエンド**: Next.js API Routes
- **データベース**: SQLite (better-sqlite3)
- **スタイリング**: Tailwind CSS + shadcn/ui + Radix UI
- **アイコン**: Lucide Icons
- **アニメーション**: Framer Motion

## 機能

- ✅ 板（カテゴリ）一覧表示
- ✅ スレッド一覧表示
- ✅ スレッド作成
- ✅ レス投稿
- ✅ スレッド詳細表示（レス一覧）
- ✅ 匿名投稿（名前は任意）
- ✅ レスポンシブデザイン
- ✅ アニメーション効果

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. データベースの初期化（オプション）

データベースは初回起動時に自動的に作成されますが、手動で初期化したい場合は以下のコマンドを実行してください：

```bash
npm run db:init
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## プロジェクト構造

```
5ch-bbs/
├── pages/              # Next.js Pages Router
│   ├── api/           # API Routes
│   ├── boards/        # 板一覧・スレッド一覧ページ
│   ├── threads/       # スレッド詳細ページ
│   └── _app.tsx       # アプリケーションエントリーポイント
├── components/        # Reactコンポーネント
│   └── ui/           # shadcn/uiベースのUIコンポーネント
├── lib/              # ユーティリティ関数
│   ├── db.ts         # データベース接続・初期化
│   └── utils.ts      # 共通ユーティリティ
├── styles/           # スタイルファイル
│   └── globals.css   # グローバルスタイル
└── scripts/          # スクリプト
    └── init-db.ts    # データベース初期化スクリプト
```

## API エンドポイント

### 板（Board）

- `GET /api/boards` - 板一覧を取得

### スレッド（Thread）

- `GET /api/boards/[id]/threads` - 指定した板のスレッド一覧を取得
- `POST /api/boards/[id]/threads` - 新しいスレッドを作成
- `GET /api/threads/[id]` - スレッド詳細を取得

### レス（Post）

- `POST /api/threads/[id]/posts` - スレッドにレスを投稿

## データベーススキーマ

### boards（板）

- `id`: INTEGER PRIMARY KEY
- `name`: TEXT NOT NULL
- `description`: TEXT
- `created_at`: DATETIME

### threads（スレッド）

- `id`: INTEGER PRIMARY KEY
- `board_id`: INTEGER NOT NULL
- `title`: TEXT NOT NULL
- `created_at`: DATETIME
- `updated_at`: DATETIME

### posts（レス）

- `id`: INTEGER PRIMARY KEY
- `thread_id`: INTEGER NOT NULL
- `name`: TEXT DEFAULT '名無し'
- `content`: TEXT NOT NULL
- `created_at`: DATETIME

## 開発

### ビルド

```bash
npm run build
```

### 本番環境での起動

```bash
npm start
```

### リント

```bash
npm run lint
```

## 注意事項

- このプロジェクトはローカル開発環境での動作確認を目的としています
- 本番環境で使用する場合は、適切なセキュリティ対策（CSRF保護、レート制限など）を追加してください
- SQLiteは開発用です。本番環境ではPostgreSQLなどの本格的なデータベースの使用を推奨します

## ライセンス

MIT

