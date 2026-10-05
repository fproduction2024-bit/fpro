// タングル図鑑 人間チェック用HTMLを生成し、データの形式チェックも行う
// 使い方（リポジトリ内）: node projects/tangleseed_hp_production/review/build_zukan_check.mjs
// 使い方（改善キット内）: node tools/build_check.mjs
// 改善キットを作る:       node projects/tangleseed_hp_production/review/build_zukan_check.mjs --kit <出力先フォルダ>
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const kitRoot = path.resolve(here, '..');
const inKit = fs.existsSync(path.join(kitRoot, 'data/patterns.ts'));
const repoRoot = path.resolve(here, '..');
const P = inKit
  ? {
      src: path.join(kitRoot, 'data/patterns.ts'),
      list: path.join(kitRoot, 'data/reference_urls.md'),
      publicDir: kitRoot, // imageUrl "/images/patterns/x.jpg" → <kit>/images/patterns/x.jpg
      template: path.join(here, 'zukan_check.template.html'),
      out: path.join(kitRoot, 'tangle_zukan_check.html'),
      rebuild: 'node tools/build_check.mjs',
      siteBase: '',
    }
  : {
      src: path.join(repoRoot, 'web/src/data/patterns/patterns.ts'),
      list: path.join(repoRoot, 'docs/tanglepatterns_complete_list.md'),
      publicDir: path.join(repoRoot, 'web/public'),
      template: path.join(here, 'zukan_check.template.html'),
      out: path.join(here, 'tangle_zukan_check.html'),
      rebuild: 'node projects/tangleseed_hp_production/review/build_zukan_check.mjs',
      siteBase: 'http://localhost:3000',
    };

// --- patterns.ts から配列リテラルを取り出して評価 ---
const src = fs.readFileSync(P.src, 'utf8');
const literal = (marker, open, close) => {
  const s = src.indexOf(open, src.indexOf(marker));
  return new Function(`return ${src.slice(s, src.indexOf(`\n${close}`, s) + 2)}`)();
};
const patterns = literal('export const patterns', '[', '];');
const categoryJa = literal('export const categoryTranslations', '{', '};');

// --- TanglePatterns.com 調査結果 ---
const refs = {};
for (const line of fs.readFileSync(P.list, 'utf8').split('\n')) {
  const m = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|$/);
  if (!m) continue;
  const url = (m[3].match(/\((https?:[^)]+)\)/) || [])[1] || '';
  refs[m[1]] = { name: m[2], url, note: url ? '' : m[3], status: m[4] };
}

// --- 形式チェック（壊れていたら本番に入れられないもの） ---
const errors = [];
const ids = new Set();
const slugs = new Set();
for (const p of patterns) {
  const at = `ID ${p.id ?? '?'} (${p.name ?? '?'})`;
  for (const k of ['id', 'name', 'nameJa', 'slug', 'description', 'descriptionJa', 'imageUrl', 'createdAt'])
    if (typeof p[k] !== 'string' || !p[k]) errors.push(`${at}: ${k} が空または文字列ではない`);
  if (ids.has(p.id)) errors.push(`${at}: id が重複`);
  if (slugs.has(p.slug)) errors.push(`${at}: slug が重複`);
  ids.add(p.id); slugs.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug || '')) errors.push(`${at}: slug は半角英小文字・数字・ハイフンのみ`);
  if (!['beginner', 'intermediate', 'advanced'].includes(p.difficulty)) errors.push(`${at}: difficulty が不正 (${p.difficulty})`);
  if (!Array.isArray(p.category) || !p.category.length) errors.push(`${at}: category が空`);
  if (!Array.isArray(p.tags)) errors.push(`${at}: tags が配列ではない`);
  if (!Array.isArray(p.steps) || !p.steps.length) errors.push(`${at}: steps が空`);
  else p.steps.forEach((s, i) => {
    if (s.stepNumber !== i + 1) errors.push(`${at}: steps[${i}].stepNumber は ${i + 1} であるべき`);
    if (!s.instruction || !s.instructionJa) errors.push(`${at}: steps[${i}] の instruction / instructionJa が空`);
  });
  if (p.youtubeVideoId && !/^[A-Za-z0-9_-]{11}$/.test(p.youtubeVideoId)) errors.push(`${at}: youtubeVideoId の形式が不正`);
}

// --- 内容の懸念（人間が判断するもの） ---
const seen = { name: {}, slug: {}, nameJa: {}, youtubeVideoId: {} };
for (const p of patterns) for (const k of Object.keys(seen)) if (p[k]) (seen[k][p[k].toLowerCase()] ||= []).push(p.id);
const dupLabel = { name: '英名', slug: 'slug', nameJa: '日本語名', youtubeVideoId: '動画' };

const items = patterns.map((p) => {
  const flags = [];
  const imgFile = p.imageUrl ? path.join(P.publicDir, p.imageUrl) : '';
  const hasImage = Boolean(imgFile) && fs.existsSync(imgFile);
  if (!hasImage) flags.push(['image', '画像ファイルなし']);
  if (!p.youtubeVideoId) flags.push(['video', '動画IDなし']);
  const jaLen = (p.descriptionJa || '').replace(/\s/g, '').length;
  if (jaLen < 400) flags.push(['desc', `日本語説明が短い(${jaLen}字)`]);
  if (jaLen > 1500) flags.push(['desc', `日本語説明が長い(${jaLen}字)`]);
  if (p.steps?.some((s) => !s.instructionJa)) flags.push(['steps', '手順の日本語欠落']);
  const badCat = (p.category || []).filter((c) => !categoryJa[c]);
  if (badCat.length) flags.push(['meta', `未定義カテゴリ: ${badCat.join(', ')}`]);
  for (const k of Object.keys(seen)) {
    const dup = p[k] && seen[k][p[k].toLowerCase()];
    if (dup && dup.length > 1) flags.push(['dup', `${dupLabel[k]}重複(ID ${dup.join(',')})`]);
  }
  const ref = refs[p.id];
  if (!ref) flags.push(['ref', '参照URL未調査']);
  else {
    // 既にデータから消えたIDとの重複メモは表示しない
    const memo = `${ref.note} ${ref.status}`.replace(/⚠️ID(\d+)と重複/g, (m, id) => (ids.has(id) ? m : ''))
      .replace(/[✓ℹ️]/gu, '').trim();
    if (memo === '要調査') flags.push(['ref', '出典URL未確認']);
    else if (memo) flags.push(['ref', `調査メモ: ${memo}`]);
  }
  return {
    ...p,
    categoryJa: (p.category || []).map((c) => categoryJa[c] || c),
    jaLen,
    imgSrc: hasImage ? path.relative(path.dirname(P.out), imgFile).split(path.sep).join('/') : '',
    refUrl: ref?.url || '',
    refNote: ref ? (ref.note || ref.status) : '',
    flags,
  };
});

const data = JSON.stringify(items).replace(/</g, '\\u003c');
const generated = new Date().toISOString().slice(0, 10);
const out = fs.readFileSync(P.template, 'utf8')
  .replace('/*__DATA__*/[]', data)
  .replace('__GENERATED__', generated)
  .replace('__SITE_BASE__', P.siteBase)
  .replace('__REBUILD__', P.rebuild)
  .replace(/__COUNT__/g, String(items.length));
fs.writeFileSync(P.out, out);

const flagCount = {};
for (const i of items) for (const [k] of i.flags) flagCount[k] = (flagCount[k] || 0) + 1;
console.log(`タングル数: ${items.length}  自動フラグ件数:`, flagCount);
console.log(`チェックシート出力: ${P.out}`);
if (errors.length) {
  console.error(`\n形式エラー ${errors.length}件（本番に入れる前に必ず直してください）:`);
  for (const e of errors) console.error(' - ' + e);
  process.exitCode = 1;
} else console.log('形式エラー: なし');

// --- 改善キット書き出し（リポジトリ内でのみ） ---
const kitIdx = process.argv.indexOf('--kit');
if (!inKit && kitIdx > 0) {
  const kit = path.resolve(process.argv[kitIdx + 1]);
  const kitAssets = path.join(here, 'kit');
  fs.rmSync(kit, { recursive: true, force: true });
  fs.mkdirSync(path.join(kit, 'data'), { recursive: true });
  fs.mkdirSync(path.join(kit, 'tools'), { recursive: true });
  fs.copyFileSync(P.src, path.join(kit, 'data/patterns.ts'));
  fs.copyFileSync(P.list, path.join(kit, 'data/reference_urls.md'));
  fs.cpSync(path.join(P.publicDir, 'images/patterns'), path.join(kit, 'images/patterns'), { recursive: true });
  fs.copyFileSync(fileURLToPath(import.meta.url), path.join(kit, 'tools/build_check.mjs'));
  fs.copyFileSync(P.template, path.join(kit, 'tools/zukan_check.template.html'));
  for (const f of fs.readdirSync(kitAssets)) fs.copyFileSync(path.join(kitAssets, f), path.join(kit, f));
  fs.mkdirSync(path.join(kit, 'feedback'));
  fs.writeFileSync(path.join(kit, 'feedback/ここにCSVを入れる.txt'), 'チェックシートの「CSV書き出し」で保存したCSVをこのフォルダに入れてください。\n');
  console.log(`改善キット出力: ${kit}  （キット内で node tools/build_check.mjs を実行してチェックシートを生成してください）`);
}
