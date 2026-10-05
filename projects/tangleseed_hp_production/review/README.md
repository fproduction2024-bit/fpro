# タングル図鑑 本番前チェック

- `tangle_zukan_check.html` … ブラウザで直接開く人間チェック用シート（全タングルの名前・説明・手順・画像・動画・出典を1ページで確認、ステータス/チェック/メモを記録、CSV・JSON書き出し）
- `build_zukan_check.mjs` … `web/src/data/patterns/patterns.ts` と `docs/tanglepatterns_complete_list.md` から上記HTMLを再生成
- `zukan_check.template.html` … HTMLのテンプレート

再生成: `node projects/tangleseed_hp_production/review/build_zukan_check.mjs`
（チェック結果はブラウザの localStorage にパターンIDで保存されるので、再生成しても消えません）
