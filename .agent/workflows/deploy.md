---
description: HTMLページやリソースをsurge.shにデプロイし、デプロイダッシュボードのレジストリに自動登録する
---

# デプロイワークフロー

// turbo-all

HTMLページ・資料をsurge.shにデプロイし、デプロイ一覧ダッシュボードに自動登録する手順。

## 前提

- デプロイ対象: 単一HTMLファイル or ディレクトリ（`index.html` を含む）
- デプロイ先: surge.sh（`<project-name>.surge.sh`）
- レジストリ: `workspace-os/code/deploy-dashboard/deploy_registry.json`（旧 `docs/古橋の会社ナレッジ/deploy-dashboard/` は凍結スナップショット。更新禁止）
- ダッシュボード: `fpro-deploy-dashboard.surge.sh`
- **重要**: surge.shは日本語パスを処理できないため、デプロイ前に `/tmp` にコピーする

---

## 手順

### 1. デプロイ対象の確認

デプロイ対象のHTMLファイルまたはディレクトリを確認する。
- 単一HTMLファイルの場合 → そのファイルがあるディレクトリをデプロイ対象とする
- `index.html` を含むディレクトリの場合 → そのディレクトリをデプロイ対象とする

### 2. surge.shにデプロイ

`/tmp` にコピーしてからデプロイする（日本語パスの問題回避）。

```bash
rm -rf /tmp/surge-deploy-tmp && cp -r <デプロイ対象ディレクトリ> /tmp/surge-deploy-tmp && npx surge /tmp/surge-deploy-tmp <project-name>.surge.sh
```

- `<project-name>` は英数字とハイフンのみ使用
- 初回デプロイ時はsurge.shアカウントのログインが必要な場合がある

### 3. デプロイレジストリに登録

`workspace-os/code/deploy-dashboard/deploy_registry.json` を編集し、新しいエントリを追加する（既存エントリの場合は `updatedAt` を更新する）。

エントリのフォーマット:
```json
{
  "id": "<project-name>",
  "name": "プロジェクト名（日本語）",
  "url": "https://<project-name>.surge.sh",
  "category": "Brain | YOLO's | リッツプロ | Fプロダクション | タングルシード | その他",
  "description": "簡単な説明文",
  "deployedAt": "YYYY-MM-DD",
  "updatedAt": "YYYY-MM-DD",
  "sourceDir": "workspace-os/... (相対パス)",
  "status": "active"
}
```

### 4. ダッシュボードを再デプロイ

レジストリ更新後、ダッシュボード自体も再デプロイして最新状態を反映する。

```bash
rm -rf /tmp/surge-deploy-tmp && cp -r "/Users/hiroshi/cursor/workspace-os/code/deploy-dashboard" /tmp/surge-deploy-tmp && npx surge /tmp/surge-deploy-tmp fpro-deploy-dashboard.surge.sh
```

### 5. 完了確認

デプロイしたURLとダッシュボード（https://fpro-deploy-dashboard.surge.sh）にアクセスして正常に表示されることを確認する。
