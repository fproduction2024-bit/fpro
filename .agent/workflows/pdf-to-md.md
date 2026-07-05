---
description: PDFファイルからテキストを抽出してMarkdownファイルに変換する
---

# PDF → Markdown 変換ワークフロー

ユーザーからPDFファイルのパスを受け取り、テキストを抽出してクリーンなMarkdownファイルとして保存します。

## 手順

### 1. PDFファイルのパスを確認
- ユーザーが指定したPDFファイルの絶対パスを特定する
- ファイルが存在するか確認する

### 2. テキスト抽出を実行
// turbo
```bash
cd /Users/hiroshi/cursor/.tools/pdf-extract && node extract.js "<PDFファイルの絶対パス>" > "<出力先の絶対パス（拡張子を.mdに変えたもの）>" 2>&1
```
- 出力先はPDFと同じディレクトリに、同じファイル名で拡張子を `.md` にしたものにする
- 例: `資料.pdf` → `資料.md`

### 3. テキストをクリーンアップ
// turbo
```bash
cd /Users/hiroshi/cursor/.tools/pdf-extract && node cleanup.js "<ステップ2で出力した.mdファイルのパス>" > "<同パス_clean.md>" 2>&1
```

### 4. クリーン版で上書き
// turbo
```bash
mv "<_clean.mdファイル>" "<元の.mdファイル>"
```

### 5. 内容を確認
- `view_file` で出力されたMarkdownの内容を確認する
- 問題がないかユーザーに報告する

## 注意事項
- スライド資料のPDFは文字間にスペースが入りやすく、cleanup.jsで自動除去される
- 画像・図表・グラフはテキストとして抽出できない（PDFの構造上の制限）
- 抽出ツール一式は `/Users/hiroshi/cursor/.tools/pdf-extract/` に配置済み
