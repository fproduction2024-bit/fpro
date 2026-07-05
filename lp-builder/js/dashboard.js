// LP管理システム
class LPManager {
    constructor() {
        this.lps = this.loadLPs();
        this.init();
    }

    init() {
        this.renderLPs();
        this.setupEventListeners();
    }

    loadLPs() {
        const stored = localStorage.getItem('lp-builder-data');
        return stored ? JSON.parse(stored) : [];
    }

    saveLPs() {
        localStorage.setItem('lp-builder-data', JSON.stringify(this.lps));
    }

    createLP(data) {
        const lp = {
            id: this.generateId(),
            title: data.title,
            template: data.template,
            domain: data.domain,
            path: data.path,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'draft',
            content: this.getTemplateContent(data.template)
        };
        this.lps.push(lp);
        this.saveLPs();
        return lp;
    }

    updateLP(id, updates) {
        const index = this.lps.findIndex(lp => lp.id === id);
        if (index !== -1) {
            this.lps[index] = {
                ...this.lps[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveLPs();
        }
    }

    deleteLP(id) {
        if (confirm('このLPを削除してもよろしいですか？')) {
            this.lps = this.lps.filter(lp => lp.id !== id);
            this.saveLPs();
            this.renderLPs();
        }
    }

    generateId() {
        return 'lp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getTemplateContent(template) {
        // テンプレートのデフォルトコンテンツ
        const templates = {
            zentangle: {
                hero: {
                    title: 'ここにメインタイトルを入力',
                    subtitle: 'サブタイトルを入力',
                    ctaText: 'ここをタップしてLINE友だち登録をして講座を受け取る',
                    ctaUrl: '#'
                },
                sections: [
                    {
                        type: 'text',
                        content: 'はじめての人でも、スッと描けちゃう動画クラスのプレゼント！'
                    }
                ],
                profile: {
                    name: 'プロフィール名',
                    bio: 'プロフィール本文'
                },
                footer: {
                    companyUrl: '#',
                    privacyUrl: '#',
                    termsUrl: '#'
                }
            }
        };
        return templates[template] || templates.zentangle;
    }

    renderLPs() {
        const grid = document.getElementById('lpGrid');
        const emptyState = document.getElementById('emptyState');

        if (this.lps.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';

        grid.innerHTML = this.lps.map(lp => this.createLPCard(lp)).join('');

        // イベントリスナーを追加
        this.lps.forEach(lp => {
            document.getElementById(`edit-${lp.id}`)?.addEventListener('click', () => {
                window.location.href = `editor?id=${lp.id}`;
            });
            document.getElementById(`preview-${lp.id}`)?.addEventListener('click', () => {
                this.previewLP(lp.id);
            });
            document.getElementById(`export-${lp.id}`)?.addEventListener('click', () => {
                this.exportLP(lp.id);
            });
            document.getElementById(`delete-${lp.id}`)?.addEventListener('click', () => {
                this.deleteLP(lp.id);
            });
        });
    }

    createLPCard(lp) {
        const url = `https://${lp.domain}${lp.path}`;
        const createdDate = new Date(lp.createdAt).toLocaleDateString('ja-JP');
        const statusClass = lp.status === 'published' ? 'status-published' : 'status-draft';
        const statusText = lp.status === 'published' ? '公開中' : '下書き';

        return `
      <div class="lp-card">
        <div class="lp-card-header">
          <h3 class="lp-card-title">${this.escapeHtml(lp.title)}</h3>
          <div class="lp-card-meta">
            <span>📅 ${createdDate}</span>
            <span class="lp-status ${statusClass}">${statusText}</span>
          </div>
        </div>
        <div class="lp-card-url">🔗 ${url}</div>
        <div class="lp-card-actions">
          <button class="btn btn-primary btn-small" id="edit-${lp.id}">編集</button>
          <button class="btn btn-secondary btn-small" id="preview-${lp.id}">プレビュー</button>
          <button class="btn btn-secondary btn-small" id="export-${lp.id}">エクスポート</button>
          <button class="btn btn-danger btn-small" id="delete-${lp.id}">削除</button>
        </div>
      </div>
    `;
    }

    previewLP(id) {
        const lp = this.lps.find(lp => lp.id === id);
        if (!lp) return;

        const html = this.generateHTML(lp);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }

    exportLP(id) {
        const lp = this.lps.find(lp => lp.id === id);
        if (!lp) return;

        const html = this.generateHTML(lp);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${lp.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
        a.click();
        URL.revokeObjectURL(url);

        alert('HTMLファイルをダウンロードしました！\n\nXサーバーへのアップロード手順:\n1. FileZillaなどのFTPクライアントを開く\n2. Xサーバーに接続\n3. ダウンロードしたHTMLファイルを指定のパスにアップロード');
    }

    generateHTML(lp) {
        // 簡易的なHTML生成（後でeditor.jsで詳細実装）
        return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(lp.title)}</title>
  <style>
    ${this.getTemplateCSS()}
  </style>
</head>
<body>
  <div class="lp-container">
    <section class="hero">
      <h1>${this.escapeHtml(lp.content.hero.title)}</h1>
      <p>${this.escapeHtml(lp.content.hero.subtitle)}</p>
      <a href="${this.escapeHtml(lp.content.hero.ctaUrl)}" class="cta-button">
        ${this.escapeHtml(lp.content.hero.ctaText)}
      </a>
    </section>
  </div>
</body>
</html>`;
    }

    getTemplateCSS() {
        return `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Noto Sans JP', sans-serif; line-height: 1.6; color: #333; }
      .lp-container { max-width: 800px; margin: 0 auto; padding: 20px; }
      .hero { text-align: center; padding: 60px 20px; }
      .hero h1 { font-size: 2.5rem; margin-bottom: 20px; }
      .hero p { font-size: 1.2rem; margin-bottom: 30px; color: #666; }
      .cta-button { 
        display: inline-block; 
        padding: 16px 32px; 
        background: #4CAF50; 
        color: white; 
        text-decoration: none; 
        border-radius: 8px; 
        font-weight: bold;
        transition: all 0.3s ease;
      }
      .cta-button:hover { background: #45a049; transform: translateY(-2px); }
    `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setupEventListeners() {
        const createBtn = document.getElementById('createLpBtn');
        const modal = document.getElementById('createModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const submitBtn = document.getElementById('submitBtn');
        const form = document.getElementById('createLpForm');

        createBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            form.reset();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                form.reset();
            }
        });

        submitBtn.addEventListener('click', () => {
            if (form.checkValidity()) {
                const data = {
                    title: document.getElementById('lpTitle').value,
                    domain: document.getElementById('lpDomain').value,
                    path: document.getElementById('lpPath').value,
                    template: document.getElementById('lpTemplate').value
                };

                const lp = this.createLP(data);
                modal.classList.remove('active');
                form.reset();
                this.renderLPs();

                // 作成後すぐに編集画面へ
                window.location.href = `editor?id=${lp.id}`;
            } else {
                alert('すべての必須項目を入力してください');
            }
        });
    }
}

// 初期化
const lpManager = new LPManager();
