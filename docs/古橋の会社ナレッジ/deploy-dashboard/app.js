/* ══════════════════════════════════════════════════
   Deploy Dashboard — Application Logic
   ══════════════════════════════════════════════════ */

(function () {
    'use strict';

    const REGISTRY_URL = 'deploy_registry.json';

    // ── Category meta ──
    const CATEGORY_META = {
        'Brain': { icon: '🧠', color: 'teal' },
        "YOLO's": { icon: '🔥', color: 'orange' },
        'リッツプロ': { icon: '💎', color: 'purple' },
        'Fプロダクション': { icon: '🎬', color: 'blue' },
        'タングルシード': { icon: '🌿', color: 'pink' },
        'その他': { icon: '📁', color: 'default' },
    };

    let allDeploys = [];
    let activeFilter = 'all';

    // ── Init ──
    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            const res = await fetch(REGISTRY_URL);
            allDeploys = await res.json();
        } catch (e) {
            console.warn('Registry fetch failed, using empty list:', e);
            allDeploys = [];
        }

        renderStats();
        renderFilterTabs();
        renderCards();
        renderLastUpdated();
    }

    // ══════════════════════════════════════════════════
    // STATS ROW
    // ══════════════════════════════════════════════════

    function renderStats() {
        const el = document.getElementById('statsRow');
        const total = allDeploys.length;
        const active = allDeploys.filter(d => d.status === 'active').length;
        const categories = [...new Set(allDeploys.map(d => d.category))].length;

        el.innerHTML = `
      <div class="stat-chip">
        <span class="stat-value">${total}</span>
        <span class="stat-label">デプロイ数</span>
      </div>
      <div class="stat-chip">
        <span class="stat-value">${active}</span>
        <span class="stat-label">稼働中</span>
      </div>
      <div class="stat-chip">
        <span class="stat-value">${categories}</span>
        <span class="stat-label">カテゴリ</span>
      </div>
    `;
    }

    // ══════════════════════════════════════════════════
    // FILTER TABS
    // ══════════════════════════════════════════════════

    function renderFilterTabs() {
        const el = document.getElementById('filterTabs');
        const categories = getCategories();

        let html = `
      <button class="filter-tab active" data-filter="all">
        ✨ すべて <span class="count">${allDeploys.length}</span>
      </button>
    `;

        categories.forEach(cat => {
            const count = allDeploys.filter(d => d.category === cat).length;
            const meta = CATEGORY_META[cat] || CATEGORY_META['その他'];
            html += `
        <button class="filter-tab" data-filter="${cat}">
          ${meta.icon} ${cat} <span class="count">${count}</span>
        </button>
      `;
        });

        el.innerHTML = html;

        // Bind events
        el.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                el.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeFilter = tab.dataset.filter;
                renderCards();
            });
        });
    }

    // ══════════════════════════════════════════════════
    // CARDS
    // ══════════════════════════════════════════════════

    function renderCards() {
        const el = document.getElementById('cardsGrid');
        const filtered = activeFilter === 'all'
            ? allDeploys
            : allDeploys.filter(d => d.category === activeFilter);

        if (filtered.length === 0) {
            el.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p>このカテゴリにはデプロイがありません</p>
        </div>
      `;
            return;
        }

        el.innerHTML = filtered.map(deploy => createCard(deploy)).join('');

        // Bind card clicks
        el.querySelectorAll('.deploy-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't navigate if clicking the URL link directly
                if (e.target.closest('.card-url')) return;
                const url = card.dataset.url;
                if (url) window.open(url, '_blank', 'noopener');
            });
        });
    }

    function createCard(deploy) {
        const meta = CATEGORY_META[deploy.category] || CATEGORY_META['その他'];
        const statusClass = deploy.status === 'active' ? 'active' : 'archived';
        const statusLabel = deploy.status === 'active' ? '稼働中' : 'アーカイブ';
        const displayUrl = deploy.url.replace('https://', '');

        return `
      <div class="deploy-card" data-url="${deploy.url}">
        <div class="card-header">
          <span class="card-category" data-cat="${deploy.category}">
            ${meta.icon} ${deploy.category}
          </span>
          <span class="card-status ${statusClass}">
            <span class="status-dot"></span>
            ${statusLabel}
          </span>
        </div>
        <h3 class="card-title">${escapeHtml(deploy.name)}</h3>
        <p class="card-desc">${escapeHtml(deploy.description)}</p>
        <div class="card-footer">
          <a class="card-url" href="${deploy.url}" target="_blank" rel="noopener" onclick="event.stopPropagation()">
            <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            ${displayUrl}
          </a>
          <span class="card-date">${formatDate(deploy.updatedAt)}</span>
        </div>
      </div>
    `;
    }

    // ══════════════════════════════════════════════════
    // FOOTER
    // ══════════════════════════════════════════════════

    function renderLastUpdated() {
        const el = document.getElementById('lastUpdated');
        if (!el) return;

        if (allDeploys.length === 0) {
            el.textContent = '—';
            return;
        }

        const latest = allDeploys
            .map(d => d.updatedAt)
            .sort()
            .reverse()[0];

        el.textContent = formatDate(latest);
    }

    // ══════════════════════════════════════════════════
    // HELPERS
    // ══════════════════════════════════════════════════

    function getCategories() {
        const cats = [...new Set(allDeploys.map(d => d.category))];
        return cats.sort();
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}/${m}/${day}`;
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

})();
