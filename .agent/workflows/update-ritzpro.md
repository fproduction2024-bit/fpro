---
description: リッツプロのダッシュボードを議事録・会話ログから更新してsurge.shにデプロイする
---

# /update-ritzpro — リッツプロ ダッシュボード更新ワークフロー

## 概要
議事録テキスト（週次CSレビュー or クライアント個別MTG）を受け取り、以下を更新・デプロイする。

## 入力
ユーザーが以下のいずれかを貼り付ける：
- **週次CSレビュー議事録** → 全案件ダッシュボード + 該当クライアントダッシュボードを更新
- **クライアント個別MTG議事録** → 該当クライアントダッシュボード + 全案件ダッシュボードを更新
- **Chatwork会話ログ** → 上記と同様
- **テキストメモ**（箇条書き等でも可）→ 上記と同様

## 更新対象ファイル

### 全案件ダッシュボード
- **ファイル**: `workspace-os/02-company_knowledge/Fプロダクション/01-Business content/ritzpro-fc-support/deliverables/ritzpro-all-projects-dashboard.html`
- **デプロイ先**: https://ritzpro-all-projects.surge.sh
- **更新箇所**: PROJECTS配列（フェーズ・進捗率・ハイライト）、TIMELINE_EVENTS配列（新規イベント追加）

### クライアント個別ダッシュボード
各クライアントの `dashboard.html` は `workspace-os/02-company_knowledge/Fプロダクション/03-Project/` 配下にある（旧 `docs/古橋の会社ナレッジ/リッツプロ/` は凍結スナップショット。更新禁止）：

| 案件ID | ディレクトリ（03-Project/ 配下） | surge.sh URL |
|--------|-------------|-------------|
| rtma | `ritzpro-rtma/` | rtma-on-dashboard.surge.sh |
| mind (Valoom) | `ritzpro-mind-valoom/`（浦郷さんValoom_* サブフォルダに個別dashboardあり） | — |
| birth | `ritzpro-birth/` | — |
| sanjuku | `ritzpro-sanjukyu/` | — |
| klf | `ritzpro-klf/`（dashboard未作成 → 必要に応じて新規作成） | — |

## 実行手順

### Step 1: 議事録を解析
ユーザーから受け取ったテキストを読み取り、以下を抽出する：
- **対象案件**: どのクライアントに関する情報か
- **フェーズ変更**: Phase 0→1→2→3 の遷移があったか
- **進捗率更新**: 体感進捗の変化
- **新規アクション/成果**: タイムラインに追加すべきイベント
- **ハイライト更新**: 主要な実績の追加・変更
- **議事録本文**: クライアントダッシュボードの議事録セクションに追加

### Step 2: 全案件ダッシュボードを更新
`ritzpro-all-projects-dashboard.html` の以下を編集：
1. `PROJECTS` 配列の該当案件: `phase`, `progress`, `highlights`, `status` 等
2. `TIMELINE_EVENTS` 配列: 新しいイベントを先頭に追加（`date`, `project`, `title`, `tag`, `tagColor`）

### Step 3: クライアント個別ダッシュボードを更新
該当クライアントの `dashboard.html` を編集：
- 議事録セクション（Minutes/MTGログ）に新しい議事録を追加
- 進捗セクションの更新
- アクションアイテムの追加/完了マーク

### Step 4: デプロイ
// turbo
```bash
# 全案件ダッシュボードをデプロイ
cp "workspace-os/02-company_knowledge/Fプロダクション/01-Business content/ritzpro-fc-support/deliverables/ritzpro-all-projects-dashboard.html" /tmp/ritzpro-all-deploy/index.html
npx -y surge /tmp/ritzpro-all-deploy ritzpro-all-projects.surge.sh
```

// turbo
```bash
# クライアント個別ダッシュボードをデプロイ（surge.sh URLが設定済の場合のみ）
# 例: RTMA の場合
cp "workspace-os/02-company_knowledge/Fプロダクション/03-Project/ritzpro-rtma/dashboard.html" /tmp/rtma-deploy/index.html
npx -y surge /tmp/rtma-deploy rtma-on-dashboard.surge.sh
```

### Step 5: deploy_registry.json を更新
// turbo
`workspace-os/code/deploy-dashboard/deploy_registry.json` の `updatedAt` を更新する（旧docs/側は凍結・更新禁止）。

## タグカラー一覧（TIMELINE_EVENTS用）
| タグ | tagColor |
|------|----------|
| 制作物 / デプロイ | `#5A8A35`（緑） |
| 提案 / 契約 / リサーチ | `#6b9cd4`（青） |
| MTG | `#c98a4c`（オレンジ） |
| 戦略 / モデル | `#BC9B5D`（ゴールド） |

## 注意事項
- 議事録の日付が不明な場合は、ユーザーに確認するか本日の日付を使用
- フェーズ変更は重要な判断なので、不明な場合はユーザーに確認
- 進捗率は議事録の内容から推測し、大きな変更（±15%以上）はユーザーに確認
- 新規案件が出てきた場合は、PROJECTS配列に新規エントリを追加
