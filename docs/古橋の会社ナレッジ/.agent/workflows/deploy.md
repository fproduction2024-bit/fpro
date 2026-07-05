---
description: スキルハックスのダッシュボードを再生成してsurge.shにデプロイする
---

# ダッシュボードのデプロイ手順

## 前提
- ローカルの台本・プレゼント等のmdファイルが最新であること
- surge.shのアカウント: hiroshifuruhashi.imp@gmail.com

## 手順

// turbo-all

1. ダッシュボードHTMLを再生成する
```bash
python3 /Users/hiroshi/cursor/docs/古橋の会社ナレッジ/Brain/スキルハックス/generate_dashboard.py
```

2. デプロイ用ディレクトリにコピーする
```bash
mkdir -p /tmp/skillhacks-deploy && cp /Users/hiroshi/cursor/docs/古橋の会社ナレッジ/Brain/スキルハックス/_deploy/index.html /tmp/skillhacks-deploy/index.html
```

3. surge.shにデプロイする
```bash
npx -y surge /tmp/skillhacks-deploy skillhacks-team.surge.sh
```

4. デプロイが完了したら、ブラウザで https://skillhacks-team.surge.sh を開いて動作確認する

## デプロイ先URL
https://skillhacks-team.surge.sh
