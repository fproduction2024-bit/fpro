# webp2png

WebP画像をPNG形式に変換するコマンドラインツール

## 機能

- WebP画像をPNG形式に変換
- 透明度（アルファチャンネル）の保持
- 単一ファイルまたは複数ファイルの一括変換
- 再帰的なディレクトリ探索
- プログレスバー表示
- 詳細なエラーハンドリング

## インストール

### 開発モードでインストール

```bash
# 依存関係のインストール
pip install -r requirements.txt

# パッケージを開発モードでインストール
pip install -e .
```

## 使い方

### 基本的な使い方

```bash
# 単一ファイルを変換
webp2png image.webp -o output.png

# カレントディレクトリのすべてのWebPファイルを変換
webp2png *.webp --output-dir ./png_output/

# ディレクトリを再帰的に探索して変換
webp2png -r ./images/ --output-dir ./converted/

# 既存ファイルを上書き
webp2png image.webp -o output.png --force
```

### オプション

- `-o, --output`: 出力ファイル名（単一ファイル時）
- `-d, --output-dir`: 出力ディレクトリ（複数ファイル時）
- `-r, --recursive`: 再帰的にディレクトリを探索
- `-f, --force`: 既存ファイルを上書き
- `-q, --quiet`: エラー以外の出力を抑制
- `-v, --verbose`: 詳細ログ出力
- `--version`: バージョン情報を表示

### Pythonモジュールとして使用

```python
from pathlib import Path
from webp2png.converter import convert_webp_to_png

# 単一ファイルの変換
input_path = Path("image.webp")
output_path = convert_webp_to_png(input_path)
print(f"Converted to: {output_path}")
```

## 要件

- Python 3.8以上
- Pillow 10.0.0以上
- Click 8.0.0以上
- tqdm 4.65.0以上

## テスト

```bash
# テストの実行（pytestが必要な場合はインストール）
pip install pytest
python -m pytest tests/
```

## 動作確認

インストール後、以下のコマンドでバージョン確認ができます：

```bash
webp2png --version
```

実際にWebPファイルを変換するには：

```bash
# 例: カレントディレクトリのWebPファイルを変換
webp2png test.webp -o test.png
```

## ライセンス

MIT License

## 開発

### プロジェクト構造

```
webp2png/
├── webp2png/
│   ├── __init__.py
│   ├── cli.py              # CLIエントリーポイント
│   ├── converter.py        # 変換エンジン
│   ├── validator.py        # 入力検証
│   └── utils.py            # ユーティリティ関数
├── tests/
│   ├── test_converter.py
│   ├── test_validator.py
│   └── fixtures/
├── requirements.txt
├── setup.py
└── README.md
```

