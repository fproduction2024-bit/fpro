#!/usr/bin/env python3
"""スキルハックス チームダッシュボード生成スクリプト
全資料をMarkdownから読み込み、1ページのHTMLダッシュボードに変換する。
"""

import os
import html
import glob

BASE = "/Users/hiroshi/cursor/docs/古橋の会社ナレッジ/Brain/スキルハックス"

def read_file(path):
    """Read file content, return empty string if not found."""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return f"（ファイルが見つかりません: {path}）"

def escape(text):
    """HTML escape."""
    return html.escape(text)

# ── Collect all content ──

# 完成版台本（優先表示）
scripts_final = [
    ("第零話 完成版", read_file(f"{BASE}/台本/第零話_台本_完成版.md")),
    ("第一話 完成版", read_file(f"{BASE}/台本/第一話_台本_完成版.md")),
    ("第二話 完成版", read_file(f"{BASE}/台本/第二話_台本_完成版.md")),
    ("第三話 完成版", read_file(f"{BASE}/台本/第三話_台本_完成版.md")),
    ("第四話 VSL 完成版", read_file(f"{BASE}/台本/第四話_VSL_台本_完成版.md")),
]

# ドラフト台本
scripts = [
    ("第一話", read_file(f"{BASE}/台本/第一話_台本.md")),
    ("第一話 v2", read_file(f"{BASE}/台本/第一話_台本_v2.md")),
    ("第二話", read_file(f"{BASE}/台本/第二話_台本.md")),
    ("第二話 v2", read_file(f"{BASE}/台本/第二話_台本_v2.md")),
    ("第三話", read_file(f"{BASE}/台本/第三話_台本.md")),
    ("第三話 v2", read_file(f"{BASE}/台本/第三話_台本_v2.md")),
    ("第四話（VSL）", read_file(f"{BASE}/台本/第四話_VSL_台本.md")),
    ("第四話（VSL）拡充版", read_file(f"{BASE}/台本/第四話_VSL_台本_拡充版.md")),
    ("第四話 VSL v2", read_file(f"{BASE}/台本/第四話_VSL_台本_v2.md")),
]

plots = [
    ("第一話", read_file(f"{BASE}/プロット/第一話_プロット.md")),
    ("第二話", read_file(f"{BASE}/プロット/第二話_プロット.md")),
    ("第三話", read_file(f"{BASE}/プロット/第三話_プロット.md")),
    ("セールス動画", read_file(f"{BASE}/プロット/セールス動画_プロット.md")),
]

slides = [
    ("スライド資料一覧", read_file(f"{BASE}/スライド資料/スライド資料一覧.md")),
    ("スライド制作プロンプト集", read_file(f"{BASE}/スライド資料/スライド制作プロンプト集.md")),
]

presents = [
    ("スキルチェックリスト", read_file(f"{BASE}/プレゼント/スキルチェックリスト.md")),
    ("初案件獲得テンプレート集", read_file(f"{BASE}/プレゼント/初案件獲得テンプレート集.md")),
    ("案件獲得ロードマップ", read_file(f"{BASE}/プレゼント/案件獲得ロードマップ.md")),
    ("副業スキルマッチング診断シート", read_file(f"{BASE}/プレゼント/副業スキルマッチング診断シート.md")),
    ("副業ゼロイチ90日ロードマップ", read_file(f"{BASE}/プレゼント/副業ゼロイチ90日ロードマップ.md")),
]

# LINEシナリオ
line_scenarios = [
    ("第零話（2日締切）", read_file(f"{BASE}/LINEシナリオ/【第零話】LINEシナリオ_2日締切.txt")),
    ("第一話（2日締切）", read_file(f"{BASE}/LINEシナリオ/【第一話】LINEシナリオ_2日締切.txt")),
    ("第二話（2日締切）", read_file(f"{BASE}/LINEシナリオ/【第二話】LINEシナリオ_2日締切.txt")),
    ("第三話（2日締切）", read_file(f"{BASE}/LINEシナリオ/【第三話】LINEシナリオ_2日締切.txt")),
    ("VSL・特別動画（2日締切）", read_file(f"{BASE}/LINEシナリオ/【VSL・特別動画】LINEシナリオ_2日締切.txt")),
    ("VSL・特別動画（7日間）", read_file(f"{BASE}/LINEシナリオ/【VSL・特別動画】LINEシナリオ_7日間.txt")),
    ("セールス（7日間）", read_file(f"{BASE}/LINEシナリオ/【セールス】LINEシナリオ_7日間.txt")),
    ("申込み（1日締切）", read_file(f"{BASE}/LINEシナリオ/【申込み】LINEシナリオ_1日締切.txt")),
]

# LINE構築設計書
line_design = read_file(f"{BASE}/LINE構築設計書.md")

meetings = []
meeting_dir = f"{BASE}/ミーティング素材"
for f in sorted(os.listdir(meeting_dir)):
    if f.endswith(('.txt', '.md')):
        meetings.append((f, read_file(os.path.join(meeting_dir, f))))

planning = [
    ("ファネル構成案", read_file(f"{BASE}/スキルハックス_ファネル構成案.md")),
    ("タイトル案・プレゼント案", read_file(f"{BASE}/タイトル案_プレゼント案.md")),
]

# セールスレター
sales_letter_content = read_file(f"{BASE}/sales-letter/index.html")

changelog_content = read_file(f"{BASE}/deploy_log.md")
dev_memo = read_file(f"{BASE}/開発メモ.md")

def make_tabs(items, section_id):
    """Generate tab buttons and content panels for a list of (title, content) tuples."""
    tabs_html = '<div class="tabs">\n'
    panels_html = ''
    for i, (title, content) in enumerate(items):
        active = ' active' if i == 0 else ''
        tab_id = f"{section_id}-{i}"
        tabs_html += f'  <button class="tab-btn{active}" data-target="{tab_id}">{escape(title)}</button>\n'
        panels_html += f'<div class="tab-panel{active}" id="{tab_id}"><div class="md-content">{escape(content)}</div></div>\n'
    tabs_html += '</div>\n'
    return tabs_html + panels_html

# ── Build HTML ──
dashboard_html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Skill Hacks — チームダッシュボード</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<style>
:root {{
  --navy: #1a1a2e;
  --navy-light: #222240;
  --navy-lighter: #2a2a4a;
  --gold: #d4a853;
  --gold-light: #e8c878;
  --gold-dim: rgba(212,168,83,0.15);
  --white: #f0f0f5;
  --gray: #8888aa;
  --bg: #0e0e1a;
  --card: #16162a;
  --border: #2a2a4a;
  --red: #e74c3c;
  --green: #2ecc71;
  --blue: #3b82f6;
}}

* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  background: var(--bg);
  color: var(--white);
  line-height: 1.7;
  min-height: 100vh;
}}

/* ── Sidebar ── */
.layout {{
  display: flex;
  min-height: 100vh;
}}

.sidebar {{
  width: 260px;
  background: var(--navy);
  border-right: 1px solid var(--border);
  position: fixed;
  top: 0; left: 0; bottom: 0;
  overflow-y: auto;
  z-index: 100;
  padding: 0;
}}

.sidebar-header {{
  padding: 28px 24px 20px;
  border-bottom: 1px solid var(--border);
}}

.sidebar-header h1 {{
  font-size: 18px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 1px;
}}

.sidebar-header p {{
  font-size: 11px;
  color: var(--gray);
  margin-top: 4px;
}}

.nav-section {{
  padding: 16px 0 8px;
}}

.nav-section-title {{
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--gray);
  padding: 0 24px;
  margin-bottom: 8px;
}}

.nav-link {{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  font-size: 13px;
  color: var(--white);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}}

.nav-link:hover {{
  background: var(--navy-light);
  color: var(--gold-light);
}}

.nav-link.active {{
  background: var(--gold-dim);
  color: var(--gold);
  border-left-color: var(--gold);
  font-weight: 600;
}}

.nav-link .icon {{ font-size: 16px; }}

.nav-badge {{
  margin-left: auto;
  font-size: 10px;
  background: var(--navy-lighter);
  color: var(--gray);
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
}}

/* ── Main ── */
.main {{
  flex: 1;
  margin-left: 260px;
  padding: 32px 40px;
  max-width: 1100px;
}}

/* ── Section ── */
.section {{
  display: none;
  animation: fadeIn 0.3s ease;
}}

.section.active {{ display: block; }}

@keyframes fadeIn {{
  from {{ opacity: 0; transform: translateY(8px); }}
  to {{ opacity: 1; transform: translateY(0); }}
}}

.section-header {{
  margin-bottom: 28px;
}}

.section-header h2 {{
  font-size: 26px;
  font-weight: 700;
  color: var(--white);
  display: flex;
  align-items: center;
  gap: 12px;
}}

.section-header h2 .icon {{ font-size: 28px; }}

.section-header p {{
  color: var(--gray);
  font-size: 13px;
  margin-top: 6px;
}}

/* ── Tabs ── */
.tabs {{
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
  overflow-x: auto;
  padding-bottom: 0;
}}

.tab-btn {{
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  font-family: inherit;
}}

.tab-btn:hover {{ color: var(--white); }}

.tab-btn.active {{
  color: var(--gold);
  border-bottom-color: var(--gold);
}}

.tab-panel {{
  display: none;
  padding: 24px 0;
}}

.tab-panel.active {{ display: block; }}

/* ── Markdown rendered content ── */
.md-content {{
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 32px;
  font-size: 14px;
  line-height: 1.8;
  overflow-x: auto;
}}

.md-content h1 {{
  font-size: 22px;
  color: var(--gold);
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
  margin-bottom: 20px;
}}

.md-content h2 {{
  font-size: 18px;
  color: var(--gold-light);
  margin-top: 32px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}}

.md-content h3 {{
  font-size: 15px;
  color: var(--white);
  margin-top: 24px;
  margin-bottom: 8px;
}}

.md-content p {{ margin-bottom: 12px; color: #ccc; }}

.md-content ul, .md-content ol {{
  padding-left: 24px;
  margin-bottom: 12px;
}}

.md-content li {{
  margin-bottom: 4px;
  color: #ccc;
}}

.md-content li input[type="checkbox"] {{
  margin-right: 6px;
  accent-color: var(--gold);
}}

.md-content code {{
  background: var(--navy);
  color: var(--gold-light);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
}}

.md-content pre {{
  background: var(--navy);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  margin-bottom: 16px;
}}

.md-content pre code {{
  background: none;
  padding: 0;
}}

.md-content table {{
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 13px;
}}

.md-content th {{
  background: var(--navy);
  color: var(--gold);
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border: 1px solid var(--border);
}}

.md-content td {{
  padding: 8px 12px;
  border: 1px solid var(--border);
  color: #ccc;
}}

.md-content tr:hover td {{
  background: var(--navy-light);
}}

.md-content blockquote {{
  border-left: 3px solid var(--gold);
  padding: 12px 16px;
  margin: 16px 0;
  background: var(--gold-dim);
  border-radius: 0 8px 8px 0;
  color: #ddd;
}}

.md-content strong {{ color: var(--white); }}

.md-content hr {{
  border: none;
  border-top: 1px solid var(--border);
  margin: 24px 0;
}}

/* ── Overview Cards ── */
.overview-grid {{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}}

.overview-card {{
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
  cursor: pointer;
}}

.overview-card:hover {{
  border-color: var(--gold);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}}

.overview-card .card-icon {{
  font-size: 28px;
  margin-bottom: 12px;
}}

.overview-card .card-title {{
  font-size: 14px;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 4px;
}}

.overview-card .card-desc {{
  font-size: 12px;
  color: var(--gray);
}}

.overview-card .card-count {{
  font-size: 24px;
  font-weight: 700;
  color: var(--gold);
  margin-top: 12px;
}}

/* ── Status Bar ── */
.status-bar {{
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 24px;
}}

.status-item {{
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}}

.status-dot {{
  width: 8px; height: 8px;
  border-radius: 50%;
}}

.status-dot.green {{ background: var(--green); }}
.status-dot.yellow {{ background: var(--gold); }}
.status-dot.red {{ background: var(--red); }}
.status-dot.blue {{ background: var(--blue); }}

/* ── Footer ── */
.footer {{
  text-align: center;
  padding: 40px 0 20px;
  color: var(--gray);
  font-size: 11px;
  border-top: 1px solid var(--border);
  margin-top: 60px;
}}

/* ── Scrollbar ── */
::-webkit-scrollbar {{ width: 6px; }}
::-webkit-scrollbar-track {{ background: var(--bg); }}
::-webkit-scrollbar-thumb {{ background: var(--border); border-radius: 3px; }}
::-webkit-scrollbar-thumb:hover {{ background: var(--gray); }}

/* ── Mobile ── */
@media (max-width: 768px) {{
  .sidebar {{ display: none; }}
  .main {{ margin-left: 0; padding: 16px; }}
  .overview-grid {{ grid-template-columns: 1fr 1fr; }}
}}
</style>
</head>
<body>

<div class="layout">
  <!-- Sidebar -->
  <nav class="sidebar">
    <div class="sidebar-header">
      <h1>✦ SKILL HACKS</h1>
      <p>プロジェクトダッシュボード</p>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">概要</div>
      <a class="nav-link active" data-section="overview">
        <span class="icon">📊</span> ダッシュボード
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">制作物</div>
      <a class="nav-link" data-section="scripts-final">
        <span class="icon">✅</span> 完成版台本
        <span class="nav-badge">5</span>
      </a>
      <a class="nav-link" data-section="scripts">
        <span class="icon">📝</span> ドラフト台本
        <span class="nav-badge">9</span>
      </a>
      <a class="nav-link" data-section="plots">
        <span class="icon">🗂️</span> プロット
        <span class="nav-badge">4</span>
      </a>
      <a class="nav-link" data-section="slides-section">
        <span class="icon">🖼️</span> スライド資料
        <span class="nav-badge">2</span>
      </a>
      <a class="nav-link" data-section="presents">
        <span class="icon">🎁</span> プレゼント
        <span class="nav-badge">5</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">LINE構築</div>
      <a class="nav-link" data-section="line-design">
        <span class="icon">📐</span> LINE構築設計書
      </a>
      <a class="nav-link" data-section="line-scenarios">
        <span class="icon">💬</span> LINEシナリオ
        <span class="nav-badge">8</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">Webページ</div>
      <a class="nav-link" onclick="window.open('https://skillhacks-sales.surge.sh','_blank')">
        <span class="icon">🛒</span> セールスLP
        <span class="nav-badge" style="background:var(--green);color:#fff">LIVE</span>
      </a>
      <a class="nav-link" onclick="window.open('https://skillhacks-presents.surge.sh','_blank')">
        <span class="icon">🎁</span> プレゼント集
        <span class="nav-badge" style="background:var(--green);color:#fff">LIVE</span>
      </a>
      <a class="nav-link" data-section="sales-letter">
        <span class="icon">📄</span> セールスレター
      </a>
      <a class="nav-link" data-section="content-pages">
        <span class="icon">📺</span> コンテンツページ
        <span class="nav-badge">4</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">企画</div>
      <a class="nav-link" data-section="planning">
        <span class="icon">💡</span> 企画書
        <span class="nav-badge">2</span>
      </a>
      <a class="nav-link" data-section="meetings">
        <span class="icon">📋</span> ミーティング素材
        <span class="nav-badge">{len(meetings)}</span>
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">システム</div>
      <a class="nav-link" data-section="dev-memo">
        <span class="icon">🛠️</span> 開発メモ
      </a>
      <a class="nav-link" data-section="changelog">
        <span class="icon">🔄</span> デプロイ履歴
      </a>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="main">

    <!-- Overview Section -->
    <div class="section active" id="overview">
      <div class="section-header">
        <h2><span class="icon">📊</span> プロジェクトダッシュボード</h2>
        <p>Skill Hacks ファネル動画 — 全制作物の一覧</p>
      </div>

      <div class="status-bar">
        <div class="status-item"><span class="status-dot green"></span> 完成版台本 5本</div>
        <div class="status-item"><span class="status-dot green"></span> LINEシナリオ 8本</div>
        <div class="status-item"><span class="status-dot green"></span> プレゼント 5種</div>
        <div class="status-item"><span class="status-dot green"></span> セールスLP デプロイ済み</div>
        <div class="status-item"><span class="status-dot green"></span> プレゼント集 デプロイ済み</div>
        <div class="status-item"><span class="status-dot green"></span> セールスレター 完成</div>
        <div class="status-item"><span class="status-dot green"></span> コンテンツページ 4本</div>
      </div>

      <div class="overview-grid">
        <div class="overview-card" onclick="navigate('scripts-final')">
          <div class="card-icon">✅</div>
          <div class="card-title">完成版台本</div>
          <div class="card-desc">第零話〜第四話（VSL）</div>
          <div class="card-count">5本</div>
        </div>
        <div class="overview-card" onclick="navigate('line-scenarios')">
          <div class="card-icon">💬</div>
          <div class="card-title">LINEシナリオ</div>
          <div class="card-desc">全ステップ配信文章</div>
          <div class="card-count">8本</div>
        </div>
        <div class="overview-card" onclick="navigate('line-design')">
          <div class="card-icon">📐</div>
          <div class="card-title">LINE構築設計書</div>
          <div class="card-desc">ファネル全体設計</div>
          <div class="card-count">1本</div>
        </div>
        <div class="overview-card" onclick="navigate('presents')">
          <div class="card-icon">🎁</div>
          <div class="card-title">プレゼント</div>
          <div class="card-desc">視聴者向け特典</div>
          <div class="card-count">5種</div>
        </div>
        <div class="overview-card" onclick="window.open('https://skillhacks-sales.surge.sh','_blank')">
          <div class="card-icon">🛒</div>
          <div class="card-title">セールスLP</div>
          <div class="card-desc">申込みページ</div>
          <div class="card-count" style="color:var(--green)">LIVE</div>
        </div>
        <div class="overview-card" onclick="window.open('https://skillhacks-presents.surge.sh','_blank')">
          <div class="card-icon">🎁</div>
          <div class="card-title">プレゼント集サイト</div>
          <div class="card-desc">五大特典Webページ</div>
          <div class="card-count" style="color:var(--green)">LIVE</div>
        </div>
        <div class="overview-card" onclick="navigate('sales-letter')">
          <div class="card-icon">📄</div>
          <div class="card-title">セールスレター</div>
          <div class="card-desc">VSLページ用レター</div>
          <div class="card-count">1本</div>
        </div>
        <div class="overview-card" onclick="navigate('content-pages')">
          <div class="card-icon">📺</div>
          <div class="card-title">コンテンツページ</div>
          <div class="card-desc">各話の視聴ページ</div>
          <div class="card-count">4本</div>
        </div>
        <div class="overview-card" onclick="navigate('plots')">
          <div class="card-icon">🗂️</div>
          <div class="card-title">プロット</div>
          <div class="card-desc">各話の構成案</div>
          <div class="card-count">4本</div>
        </div>
        <div class="overview-card" onclick="navigate('slides-section')">
          <div class="card-icon">🖼️</div>
          <div class="card-title">スライド資料</div>
          <div class="card-desc">全93枚のスライド仕様</div>
          <div class="card-count">93枚</div>
        </div>
        <div class="overview-card" onclick="navigate('meetings')">
          <div class="card-icon">📋</div>
          <div class="card-title">ミーティング素材</div>
          <div class="card-desc">会議メモ・文字起こし</div>
          <div class="card-count">{len(meetings)}本</div>
        </div>
      </div>
    </div>

    <!-- Scripts Final Section -->
    <div class="section" id="scripts-final">
      <div class="section-header">
        <h2><span class="icon">✅</span> 完成版台本</h2>
        <p>第零話〜第四話（VSL）の完成版台本</p>
      </div>
      {make_tabs(scripts_final, "script-final")}
    </div>

    <!-- Scripts Draft Section -->
    <div class="section" id="scripts">
      <div class="section-header">
        <h2><span class="icon">📝</span> ドラフト台本</h2>
        <p>各話のドラフト版台本（v1・v2等）</p>
      </div>
      {make_tabs(scripts, "script")}
    </div>

    <!-- Plots Section -->
    <div class="section" id="plots">
      <div class="section-header">
        <h2><span class="icon">🗂️</span> プロット</h2>
        <p>各話の構成案・プロット</p>
      </div>
      {make_tabs(plots, "plot")}
    </div>

    <!-- Slides Section -->
    <div class="section" id="slides-section">
      <div class="section-header">
        <h2><span class="icon">🖼️</span> スライド資料</h2>
        <p>全93枚のスライド仕様書と制作用プロンプト集</p>
      </div>
      {make_tabs(slides, "slide")}
    </div>

    <!-- Presents Section -->
    <div class="section" id="presents">
      <div class="section-header">
        <h2><span class="icon">🎁</span> プレゼント</h2>
        <p>視聴者向けプレゼント全5種</p>
      </div>
      {make_tabs(presents, "present")}
    </div>

    <!-- Planning Section -->
    <div class="section" id="planning">
      <div class="section-header">
        <h2><span class="icon">💡</span> 企画書</h2>
        <p>ファネル構成案・タイトル案・プレゼント案</p>
      </div>
      {make_tabs(planning, "plan")}
    </div>

    <!-- Meetings Section -->
    <div class="section" id="meetings">
      <div class="section-header">
        <h2><span class="icon">📋</span> ミーティング素材</h2>
        <p>会議メモ・文字起こし・フィードバック</p>
      </div>
      {make_tabs(meetings, "meeting")}
    </div>

    <!-- LINE Design Section -->
    <div class="section" id="line-design">
      <div class="section-header">
        <h2><span class="icon">📐</span> LINE構築設計書</h2>
        <p>ファネル全体のシナリオ構成・KPI設計・構築チェックリスト</p>
      </div>
      <div class="md-content">{escape(line_design)}</div>
    </div>

    <!-- LINE Scenarios Section -->
    <div class="section" id="line-scenarios">
      <div class="section-header">
        <h2><span class="icon">💬</span> LINEシナリオ</h2>
        <p>全8本のLINE配信シナリオ（第零話〜申込み）</p>
      </div>
      {make_tabs(line_scenarios, "line")}
    </div>

    <!-- Sales Letter Section -->
    <div class="section" id="sales-letter">
      <div class="section-header">
        <h2><span class="icon">📄</span> セールスレター</h2>
        <p>VSL動画ページ用のセールスレターHTML</p>
      </div>
      <div class="md-content"><pre><code>{escape(sales_letter_content)}</code></pre></div>
    </div>

    <!-- Content Pages Section -->
    <div class="section" id="content-pages">
      <div class="section-header">
        <h2><span class="icon">📺</span> コンテンツページ</h2>
        <p>第一話〜第四話(VSL)の視聴ページHTML — 4ページ</p>
      </div>
      <div class="md-content">
        <h3>📁 コンテンツページ一覧</h3>
        <ul>
          <li>第一話_コンテンツページ.html</li>
          <li>第二話_コンテンツページ.html</li>
          <li>第三話_コンテンツページ.html</li>
          <li>第四話VSL_コンテンツページ.html</li>
        </ul>
        <p>※ HTMLソースは各ファイルに格納されています。ローカルのcontent-pagesディレクトリをご参照ください。</p>
      </div>
    </div>

    <!-- Changelog Section -->
    <div class="section" id="changelog">
      <div class="section-header">
        <h2><span class="icon">🔄</span> デプロイ履歴</h2>
        <p>ダッシュボードの更新・変更ログ</p>
      </div>
      <div class="md-content">{escape(changelog_content)}</div>
    </div>

    <!-- Dev Memo Section -->
    <div class="section" id="dev-memo">
      <div class="section-header">
        <h2><span class="icon">🛠️</span> 開発メモ</h2>
        <p>開発・仕様変更に関する備忘録</p>
      </div>
      <div class="md-content">{escape(dev_memo)}</div>
    </div>

    <div class="footer">
      Skill Hacks Project Dashboard — Built with ✦ by チーム古橋
    </div>

  </main>
</div>

<script>
// ── Render all markdown ──
document.querySelectorAll('.md-content').forEach(el => {{
  const raw = el.textContent;
  el.innerHTML = marked.parse(raw);
}});

// ── Sidebar navigation ──
document.querySelectorAll('.nav-link').forEach(link => {{
  link.addEventListener('click', () => {{
    const target = link.dataset.section;
    navigate(target);
  }});
}});

function navigate(target) {{
  // Update sidebar
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-section="${{target}}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Update sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById(target);
  if (section) {{
    section.classList.add('active');
    window.scrollTo(0, 0);
  }}
}}

// ── Tab switching ──
document.querySelectorAll('.tab-btn').forEach(btn => {{
  btn.addEventListener('click', () => {{
    const target = btn.dataset.target;
    const parent = btn.closest('.section');

    // Update tab buttons
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update tab panels
    parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(target)?.classList.add('active');
  }});
}});
</script>
</body>
</html>"""

# ── Write HTML ──
output_path = f"{BASE}/dashboard.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(dashboard_html)

print(f"✅ ダッシュボードを生成しました: {output_path}")
