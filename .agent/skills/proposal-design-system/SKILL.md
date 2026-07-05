---
name: 提案書デザインシステム（Proposal Design System）
description: YOLO's / リッツプロの提案書HTMLを作成する際のカラーパレット・タイポグラフィ・コンポーネント設計の標準スキル。ホワイトベース × ティール × オレンジの統一デザインで、すべての提案書に一貫したプレミアムな印象を与える。
---

# 提案書デザインシステム（Proposal Design System）

## ⚠️ 実行前の必須手順（PDCA）
1. 同ディレクトリの `LEARNINGS.md` を必ず読む。勝ちパターンを反映し、負けパターン・禁止事項を避けること。
2. 成果物は LEARNINGS.md 記載のarchiveパスに保存し、ファイル先頭に以下のfrontmatterを付けること:
   ```yaml
   ---
   date: YYYY-MM-DD
   client: <案件・クライアント名>
   type: <広告コピー | LP | 提案書 など>
   skill: <スキル名>
   result: 未計測   # ← 人間が後日、CTR/CPA/受注結果などを一言追記
   verdict: 未計測  # win | lose | 未計測
   reviewed: false  # /skill-review が処理したら true
   ---
   ```

## 概要

提案書（HTML）を作成・リデザインする際に、統一されたカラーパレットとデザイントークンを適用するためのスキル。
すべての提案書で一貫したブランドイメージを維持する。

---

## カラーパレット

### コア3色（必ず使う色）

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `--orange` | `#E8650A` | **プライマリアクセント**。セクションラベル、ハイライトテキスト、重要数値 |
| `--teal` | `#0C4A4E` | **セカンダリ（ヘッダー系）**。ヒーロー背景、テーブルヘッダー、CTA背景 |
| `--bg-white` | `#FFFFFF` | **ベース背景**。メインコンテンツ領域 |

> 💡 **デザイン根拠**: オレンジ（暖色）× ティール（寒色）は補色関係にあり、コントラストが高くプレミアム感がある。ホワイトベースで清潔感と可読性を確保。

### オレンジ系バリエーション

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `--orange` | `#E8650A` | メインアクセント |
| `--orange-light` | `#FF8C33` | ヒーロー内のハイライトテキスト |
| `--orange-dark` | `#C5520A` | ホバー時・ボーダー |
| `--orange-bg` | `#FFF7F0` | ハイライトボックスの背景 |

### 背景・テキスト系

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `--bg-white` | `#FFFFFF` | メイン背景 |
| `--bg-gray` | `#F8F9FB` | 交互セクション背景（`section.alt`） |
| `--text-dark` | `#1a1a2e` | 見出し・タイトル |
| `--text-body` | `#444444` | 本文テキスト |
| `--text-light` | `#6b7280` | 補足テキスト・キャプション |

### 状態色

| 変数名 | HEX | 用途 |
|--------|-----|------|
| `--green` | `#10B981` | ポジティブ値（0円、UP、成功） |
| `--red` | `#EF4444` | ネガティブ値（コスト、警告） |

---

## CSS変数テンプレート（コピペ用）

```css
:root {
    --orange: #E8650A;
    --orange-light: #FF8C33;
    --orange-dark: #C5520A;
    --orange-bg: #FFF7F0;
    --bg-white: #FFFFFF;
    --bg-gray: #F8F9FB;
    --text-dark: #1a1a2e;
    --text-body: #444;
    --text-light: #6b7280;
    --green: #10B981;
    --red: #EF4444;
    --teal: #0C4A4E;
    --radius: 12px;
    --shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}
```

---

## タイポグラフィ

### フォント

```css
font-family: 'Noto Sans JP', 'Inter', sans-serif;
```

- Google Fonts から読み込み
- 日本語: **Noto Sans JP** (300, 400, 500, 700, 900)
- 英数字・数値: **Inter** (300, 400, 600, 700, 800)

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
```

### サイズガイド

| 要素 | サイズ | ウェイト |
|------|--------|----------|
| ヒーローH1 | 38px（モバイル 26px） | 900 |
| セクションタイトル | 28px | 900 |
| カードタイトル | 18px | 700 |
| 本文 | 14-15px | 400 |
| ラベル | 13px | 700, letter-spacing: 2px, uppercase |
| 大きい数値 | 34-80px | Inter, 800-900 |

---

## コンポーネント設計

### ヒーロー

```css
.hero {
    background: linear-gradient(135deg, #0C4A4E 0%, #145B60 50%, #1A6B70 100%);
    color: #fff;
    padding: 100px 0 80px;
}
```

- ティールグラデーション背景
- 白テキスト + オレンジアクセントで見出し
- バッジ: オレンジ半透明背景 + オレンジボーダー

### サマリーカード

- 背景: 白 + `border: 1px solid #eee`
- 数値: `--orange`, Inter, 34px, weight 800
- ヒーローの下に`margin-top: -50px`でオーバーラップ

### セクション

- 通常セクション: 白背景
- 交互セクション (`.alt`): `--bg-gray` 背景
- ラベル: `--orange`, 13px, uppercase, Inter
- タイトル: `--text-dark`, 28px, weight 900

### カード

```css
.card {
    background: var(--bg-white);
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}
```

### カードアイコン

4色のバリエーション:

| クラス | 背景色 | テキスト色 | 用途 |
|--------|--------|------------|------|
| `.card-icon.orange` | `rgba(232,101,10,0.1)` | `--orange` | メイン・強調 |
| `.card-icon.teal` | `rgba(12,74,78,0.1)` | `--teal` | サブ情報 |
| `.card-icon.green` | `rgba(16,185,129,0.1)` | `--green` | ポジティブ |
| `.card-icon.red` | `rgba(239,68,68,0.1)` | `--red` | ネガティブ・警告 |

### テーブル

- ヘッダー: `background: var(--teal); color: #fff`
- 偶数行: `--bg-gray`
- ホバー: `--orange-bg`
- ハイライトセル: `color: var(--orange); font-weight: 700`

### ハイライトボックス

```css
.highlight-box {
    background: var(--orange-bg);       /* #FFF7F0 */
    border: 1px solid rgba(232, 101, 10, 0.2);
    border-radius: 12px;
    padding: 28px 32px;
}
.highlight-box h4 { color: var(--orange); }
```

### 比較グリッド

- Before: グレー背景 + 通常ボーダー
- After: `--orange-bg` 背景 + オレンジボーダー
- 矢印: `--orange`

### ROIボックス

```css
.roi-box {
    background: linear-gradient(135deg, #f0fdf4, #ecfdf5);
    border: 1px solid rgba(16, 185, 129, 0.3);
}
.roi-num { color: var(--green); font-size: 56px; }
```

### ステップ番号

```css
.step-num-circle {
    background: var(--orange);
    color: #fff;
    width: 48px; height: 48px;
    border-radius: 50%;
}
```

### CTA（最下部）

```css
.cta {
    background: var(--teal);
    color: #fff;
    padding: 60px 0;
    text-align: center;
}
```

---

## レスポンシブ

```css
@media(max-width:768px) {
    .hero h1 { font-size: 26px }
    .summary-grid { grid-template-columns: 1fr }
    .grid-2 { grid-template-columns: 1fr }
    .compare-grid { grid-template-columns: 1fr }
    .steps { flex-direction: column }
    .big-number { font-size: 56px }
}
```

---

## 実装済み提案書（参考）

| 提案書 | パス |
|--------|------|
| ITK採用施策提案 | `docs/古橋の会社ナレッジ/YOLO's/itk/proposal.html` |

---

## 使い方

1. **新規提案書作成時**: このスキルの CSS変数テンプレートとコンポーネント設計をベースに HTML を構築する
2. **既存提案書リデザイン時**: `:root` のカラー変数を上記パレットに差し替え、各コンポーネントのスタイルを適用する
3. **色の使い分けルール**:
   - **オレンジ**: 注目させたい数値・テキスト・ラベル
   - **ティール**: ヘッダー・背景・CTA（信頼感・安定感）
   - **グリーン**: ポジティブな結果（0円、UP、成功）
   - **レッド**: ネガティブ・比較対象のコスト
   - **白/グレー**: ベース背景（読みやすさ優先）
