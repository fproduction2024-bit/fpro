# Claude Code 導入マニュアル

> **最終更新**: 2026年2月  
> **対象**: macOS ユーザー向け

---

## 1. Claude Code とは？

**Claude Code** は、Anthropic社が開発した **ターミナルベースのAIコーディングアシスタント** です。

従来のチャットボットとは異なり、以下のような **エージェント型** の動作が特徴です：

| 機能 | 説明 |
|------|------|
| 🔍 コードベース理解 | プロジェクト全体を読み取り、構造を把握 |
| ✏️ ファイル編集 | 複数ファイルにまたがるコード変更を自動実行 |
| 🖥️ コマンド実行 | ターミナルコマンドを直接実行 |
| 🔀 Git操作 | コミット、ブランチ作成、PR作成を自然言語で |
| 🐛 デバッグ | バグの原因特定から修正まで一気通貫 |
| 🧪 テスト作成 | テストコードの自動生成 |

---

## 2. 料金プラン

Claude Code は **Claude のチャット（claude.ai）とは別の料金体系** です。

| プラン | 月額 | Claude Code | 備考 |
|--------|------|-------------|------|
| **Free** | 無料 | ❌ 利用不可 | チャットのみ |
| **Pro** | $20/月 | ⚠️ 制限付き | 日次メッセージ上限あり |
| **Max 5x** | $100/月 | ✅ おすすめ | Proの5倍の使用量 |
| **Max 20x** | $200/月 | ✅ ヘビーユーザー向け | Proの20倍の使用量 |
| **Team** | $30/席/月〜 | ✅ | チーム管理機能付き |
| **Enterprise** | カスタム | ✅ | セキュリティ・管理機能充実 |

> [!IMPORTANT]  
> Claude Code を快適に使うには **Max プラン（$100/月〜）** がおすすめです。  
> Pro プランでも利用可能ですが、日次の使用量上限がすぐに達する場合があります。

---

## 3. 必要な環境

### システム要件

| 項目 | 要件 |
|------|------|
| **OS** | macOS 10.15以上 |
| **RAM** | 4GB以上（推奨） |
| **Node.js** | v18以上（LTS推奨） |
| **シェル** | Bash / Zsh |
| **ネットワーク** | 安定したインターネット接続 |

---

## 4. インストール手順

### Step 1: Homebrew のインストール

ターミナルを開いて、まず Homebrew がインストールされているか確認します：

```bash
brew -v
```

`command not found: brew` と出た場合は、以下のコマンドでインストール：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> [!WARNING]  
> インストール完了後、画面に表示される **「Next steps」の3行を必ず実行** してください。  
> これを忘れると `brew` コマンドが使えません：
> ```bash
> echo >> /Users/あなたのユーザー名/.zprofile
> echo 'eval "$(/opt/homebrew/bin/brew shellenv zsh)"' >> /Users/あなたのユーザー名/.zprofile
> eval "$(/opt/homebrew/bin/brew shellenv zsh)"
> ```

---

### Step 2: Node.js のインストール

```bash
brew install node
```

インストール確認：

```bash
node -v
```

`v18.x.x` 以上が表示されればOKです。

---

### Step 3: Claude Code のインストール

ターミナルで以下のコマンドを実行します：

```bash
sudo npm install -g @anthropic-ai/claude-code
```

Mac のログインパスワードを求められたら入力してください（文字は表示されません）。

> [!NOTE]  
> `sudo` なしだと権限エラー（`EACCES`）が出る場合があります。

---

### Step 4: 認証（初回のみ）

インストール後、ターミナルで以下を実行：

```bash
claude
```

1. テーマ選択画面が表示される → **Dark mode** を選んで Enter
2. ブラウザが自動で開き、Anthropicアカウントでの認証画面が表示される
3. ブラウザでログイン（またはアカウント作成）
4. **「Build something great」** と表示されたら認証完了 ✅
5. ブラウザを閉じてターミナルに戻る

> [!NOTE]  
> Claude Pro/Max のサブスクリプションが有効なアカウントでログインしてください。

---

### Step 5: プロジェクトの初期設定

作業したいプロジェクトのルートディレクトリに移動してから Claude Code を起動します：

```bash
cd /path/to/your/project
claude
```

初回は `/init` コマンドでプロジェクトの初期設定を行うことを推奨します：

```
> /init
```

これにより、プロジェクトのルートに `CLAUDE.md` ファイルが作成されます。

---

## 5. 基本的な使い方

### 起動方法

```bash
# プロジェクトディレクトリに移動してから起動
cd /path/to/your/project
claude
```

### よく使うコマンド

| コマンド | 説明 |
|----------|------|
| `/init` | プロジェクトの初期設定（CLAUDE.md作成） |
| `/help` | ヘルプを表示 |
| `/clear` | 会話履歴をクリア |
| `/compact` | 会話コンテキストを圧縮 |
| `/cost` | 現在のセッションのトークン使用量を表示 |
| `/doctor` | インストール状態の診断 |
| `Ctrl+C` | 現在の処理を中断 |
| `Ctrl+D` | Claude Code を終了 |

---

### 対話の例

```
# ファイルの内容を理解してもらう
> このプロジェクトの構造を説明して

# バグを修正する
> login.js のエラーハンドリングを改善して

# テストを書く
> utils.ts のユニットテストを作成して

# Gitの操作
> 変更をコミットして。メッセージは「フォーム入力バリデーション追加」で

# ファイルを指定して質問
> @src/api/auth.ts この認証フローの仕組みを説明して
```

---

## 6. CLAUDE.md の活用

`CLAUDE.md` はプロジェクトのルートに置くファイルで、Claude Code に **プロジェクト固有のルールや知識** を伝えます。

### 記述例

```markdown
# CLAUDE.md

## プロジェクト概要
このプロジェクトは Next.js 14 を使用したECサイトです。

## 技術スタック
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL

## コーディング規約
- 関数コンポーネントのみ使用（クラスコンポーネント禁止）
- 変数名・関数名はキャメルケース
- コメントは日本語で記述

## ディレクトリ構造
- src/app/ - ページコンポーネント
- src/components/ - 共通コンポーネント
- src/lib/ - ユーティリティ関数
- prisma/ - データベーススキーマ

## テスト
- Jest + React Testing Library を使用
- テスト実行: npm run test
```

> [!TIP]  
> `CLAUDE.md` を充実させるほど、Claude Code の回答精度が向上します。  
> チーム開発では特に有用です。

---

## 7. 便利なテクニック

### ① ワンショットモード（コマンドラインから直接実行）

```bash
# 対話モードに入らず、一発でタスクを実行
claude -p "このリポジトリのREADMEを日本語で書いて"
```

### ② パイプ入力

```bash
# ファイルの内容をClaude Codeに渡す
cat error.log | claude -p "このエラーログを分析して原因を特定して"
```

### ③ 思考モード（Think Mode）

複雑な問題では、Claude Code に深く考えさせることができます：

```
> think hard about: この認証システムのセキュリティ上の問題点を洗い出して
```

### ④ VS Code 拡張機能

VS Code を使っている場合は、拡張機能をインストールすることでエディタ内から Claude Code を使えます：

1. VS Code の拡張機能マーケットプレイスで「Claude Code」を検索
2. インストール
3. `Cmd + Shift + P` → 「Claude Code」で起動

---

## 8. トラブルシューティング

### よくある問題と解決策

| 問題 | 解決策 |
|------|--------|
| `command not found: claude` | Node.js のパスが通っているか確認。`npm install -g` を再実行 |
| 認証エラー | `claude logout` してから再度 `claude` で認証 |
| レート制限に達した | 時間を置いてから再試行。Max プランへのアップグレードも検討 |
| 動作が遅い | `/compact` で会話コンテキストを圧縮 |
| ファイルが見つからない | プロジェクトルートから起動しているか確認 |

### 診断コマンド

```bash
# インストール状態の確認
claude /doctor

# バージョン確認
claude --version

# ログアウト
claude logout
```

---

## 9. セキュリティ上の注意

> [!CAUTION]  
> Claude Code はプロジェクト内のファイルを読み書きし、コマンドを実行できます。  
> 以下の点に注意してください：

- **機密情報**: `.env` ファイルなど、API キーやパスワードが含まれるファイルがプロジェクト内にある場合は注意
- **コマンド実行**: Claude Code が提案するコマンドは必ず確認してから実行
- **コード変更**: 自動で変更されたコードは必ずレビューしてからコミット
- `.gitignore` に機密ファイルを含めることを推奨

---

## 10. まとめ：導入チェックリスト

- [ ] Homebrew のインストール & パス設定
- [ ] `brew install node` で Node.js をインストール
- [ ] `sudo npm install -g @anthropic-ai/claude-code` でインストール
- [ ] `claude` コマンドで初回認証を完了
- [ ] プロジェクトディレクトリで `/init` を実行
- [ ] `CLAUDE.md` にプロジェクト情報を記述
- [ ] 簡単なタスクで動作確認

---

> **参考リンク**  
> - [Claude Code 公式ドキュメント](https://docs.anthropic.com/en/docs/claude-code/overview)  
> - [Claude 料金ページ](https://claude.ai/pricing)  
> - [Node.js ダウンロード](https://nodejs.org/)
