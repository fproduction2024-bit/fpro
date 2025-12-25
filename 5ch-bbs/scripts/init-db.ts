import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'bbs.db');

// 既存のデータベースを削除（開発用）
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

// 新しいデータベースを作成
fs.writeFileSync(dbPath, '');

const db = new Database(dbPath);

// テーブル作成
db.exec(`
  CREATE TABLE IF NOT EXISTS boards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    board_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards(id)
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thread_id INTEGER NOT NULL,
    name TEXT DEFAULT '名無し',
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES threads(id)
  );

  CREATE INDEX IF NOT EXISTS idx_threads_board_id ON threads(board_id);
  CREATE INDEX IF NOT EXISTS idx_threads_updated_at ON threads(updated_at);
  CREATE INDEX IF NOT EXISTS idx_posts_thread_id ON posts(thread_id);
  CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
`);

// 初期データの投入
const insertBoard = db.prepare('INSERT INTO boards (name, description) VALUES (?, ?)');
const boards = [
  ['ニュース速報', '最新ニュースを速報でお届け'],
  ['雑談', '気軽に雑談できる板'],
  ['プログラミング', 'プログラミングに関する話題'],
  ['その他', 'その他の話題']
];

const insertMany = db.transaction((boards) => {
  for (const [name, description] of boards) {
    insertBoard.run(name, description);
  }
});

insertMany(boards);

console.log('データベースの初期化が完了しました。');
db.close();

