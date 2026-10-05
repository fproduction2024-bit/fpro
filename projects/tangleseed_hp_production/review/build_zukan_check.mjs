// タングル図鑑 人間チェック用HTMLを生成する
// 使い方: node projects/tangleseed_hp_production/review/build_zukan_check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const srcPath = path.join(root, 'web/src/data/patterns/patterns.ts');
const publicDir = path.join(root, 'web/public');
const listPath = path.join(root, 'docs/tanglepatterns_complete_list.md');

// --- patterns.ts から配列リテラルを取り出して評価 ---
const src = fs.readFileSync(srcPath, 'utf8');
const start = src.indexOf('[', src.indexOf('export const patterns'));
const end = src.indexOf('\n];', start);
const patterns = new Function(`return ${src.slice(start, end + 2)}`)();
const catStart = src.indexOf('{', src.indexOf('export const categoryTranslations'));
const categoryJa = new Function(`return ${src.slice(catStart, src.indexOf('\n};', catStart) + 2)}`)();

// --- TanglePatterns.com 検証済みURL (docs/tanglepatterns_complete_list.md) ---
const refs = {};
for (const line of fs.readFileSync(listPath, 'utf8').split('\n')) {
  const m = line.match(/^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|$/);
  if (!m) continue;
  const url = (m[3].match(/\((https?:[^)]+)\)/) || [])[1] || '';
  refs[m[1]] = { name: m[2], url, note: url ? '' : m[3], status: m[4] };
}

// --- 自動チェック ---
const seen = { name: {}, slug: {}, nameJa: {} };
for (const p of patterns) for (const k of Object.keys(seen)) (seen[k][p[k].toLowerCase()] ||= []).push(p.id);

const ids = new Set(patterns.map((p) => p.id));
const items = patterns.map((p) => {
  const flags = [];
  const imgFile = p.imageUrl ? path.join(publicDir, p.imageUrl) : '';
  const hasImage = imgFile && fs.existsSync(imgFile);
  if (!hasImage) flags.push(['image', '画像ファイルなし']);
  if (!p.youtubeVideoId) flags.push(['video', '動画IDなし']);
  const jaLen = (p.descriptionJa || '').replace(/\s/g, '').length;
  if (jaLen < 400) flags.push(['desc', `日本語説明が短い(${jaLen}字)`]);
  if (jaLen > 1500) flags.push(['desc', `日本語説明が長い(${jaLen}字)`]);
  if (!p.steps?.length) flags.push(['steps', '手順なし']);
  else if (p.steps.some((s) => !s.instructionJa)) flags.push(['steps', '手順の日本語欠落']);
  for (const k of Object.keys(seen)) {
    const ids = seen[k][p[k].toLowerCase()];
    if (ids.length > 1) flags.push(['dup', `${k}重複(ID ${ids.join(',')})`]);
  }
  const ref = refs[p.id];
  if (!ref) flags.push(['ref', '参照URL未調査']);
  else if (ref.name.split('（')[0].trim().toLowerCase() !== p.name.toLowerCase())
    flags.push(['ref', `調査時の名前と相違: ${ref.name}`]);
  if (ref) {
    // 既にデータから消えたIDとの重複メモは表示しない
    const memo = `${ref.note} ${ref.status}`.replace(/⚠️ID(\d+)と重複/g, (m, id) => (ids.has(id) ? m : ''))
      .replace(/[✓ℹ️]/gu, '').trim();
    if (memo === '要調査') flags.push(['ref', '出典URL未確認']);
    else if (memo) flags.push(['ref', `調査メモ: ${memo}`]);
  }
  return {
    ...p,
    categoryJa: p.category.map((c) => categoryJa[c] || c),
    jaLen,
    hasImage,
    imgSrc: hasImage ? path.relative(here, imgFile).split(path.sep).join('/') : '',
    refUrl: ref?.url || '',
    refNote: ref ? (ref.note || ref.status) : '',
    flags,
  };
});

const data = JSON.stringify(items).replace(/</g, '\\u003c');
const generated = new Date().toISOString().slice(0, 10);
const tpl = fs.readFileSync(path.join(here, 'zukan_check.template.html'), 'utf8');
const out = tpl.replace('/*__DATA__*/[]', data).replace('__GENERATED__', generated).replace(/__COUNT__/g, String(items.length));
fs.writeFileSync(path.join(here, 'tangle_zukan_check.html'), out);
const flagCount = {};
for (const i of items) for (const [k] of i.flags) flagCount[k] = (flagCount[k] || 0) + 1;
console.log(`patterns: ${items.length}`, flagCount);
