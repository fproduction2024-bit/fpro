// LP Editor
class LPEditor {
  constructor() {
    this.lpId = this.getLPIdFromUrl();
    this.lp = null;
    this.sections = [];
    this.init();
  }

  getLPIdFromUrl() {
    console.log('window.location.search:', window.location.search);
    console.log('window.location.href:', window.location.href);
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log('Extracted ID from URL:', id);
    return id;
  }

  init() {
    console.log('Editor init() called');
    console.log('this.lpId:', this.lpId);
    if (!this.lpId) {
      console.error('No LP ID found in URL!');
      alert('LPが見つかりません');
      window.location.href = 'index.html';
      return;
    }

    this.loadLP();
    this.setupEventListeners();
    this.loadFormData();
    this.renderSections();
    this.updatePreview();
  }

  loadLP() {
    const stored = localStorage.getItem('lp-builder-data');
    console.log('Stored data:', stored);
    const lps = stored ? JSON.parse(stored) : [];
    console.log('All LPs:', lps);
    console.log('Looking for ID:', this.lpId);
    this.lp = lps.find(lp => lp.id === this.lpId);
    console.log('Found LP:', this.lp);

    if (!this.lp) {
      console.error('LP not found! ID:', this.lpId);
      alert('LPが見つかりません');
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('lpTitle').textContent = this.lp.title;
    this.sections = this.lp.content.sections || [];
  }

  saveLP() {
    const stored = localStorage.getItem('lp-builder-data');
    const lps = stored ? JSON.parse(stored) : [];
    const index = lps.findIndex(lp => lp.id === this.lpId);

    if (index !== -1) {
      lps[index] = {
        ...this.lp,
        content: this.getFormData(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('lp-builder-data', JSON.stringify(lps));
      alert('保存しました！');
    }
  }

  loadFormData() {
    const content = this.lp.content;

    // Hero
    document.getElementById('heroTitle').value = content.hero.title || '';
    document.getElementById('heroSubtitle').value = content.hero.subtitle || '';
    document.getElementById('heroCtaText').value = content.hero.ctaText || '';
    document.getElementById('heroCtaUrl').value = content.hero.ctaUrl || '';

    // Profile
    document.getElementById('profileName').value = content.profile.name || '';
    document.getElementById('profileBio').value = content.profile.bio || '';

    // Footer
    document.getElementById('footerCompanyUrl').value = content.footer.companyUrl || '';
    document.getElementById('footerPrivacyUrl').value = content.footer.privacyUrl || '';
    document.getElementById('footerTermsUrl').value = content.footer.termsUrl || '';
  }

  getFormData() {
    return {
      hero: {
        title: document.getElementById('heroTitle').value,
        subtitle: document.getElementById('heroSubtitle').value,
        ctaText: document.getElementById('heroCtaText').value,
        ctaUrl: document.getElementById('heroCtaUrl').value
      },
      sections: this.sections,
      profile: {
        name: document.getElementById('profileName').value,
        bio: document.getElementById('profileBio').value
      },
      footer: {
        companyUrl: document.getElementById('footerCompanyUrl').value,
        privacyUrl: document.getElementById('footerPrivacyUrl').value,
        termsUrl: document.getElementById('footerTermsUrl').value
      }
    };
  }

  renderSections() {
    const container = document.getElementById('sectionsContainer');
    container.innerHTML = this.sections.map((section, index) =>
      this.createSectionHTML(section, index)
    ).join('');

    // イベントリスナーを追加
    this.sections.forEach((_, index) => {
      const deleteBtn = document.getElementById(`delete-section-${index}`);
      const moveUpBtn = document.getElementById(`moveup-section-${index}`);
      const moveDownBtn = document.getElementById(`movedown-section-${index}`);
      const contentInput = document.getElementById(`section-content-${index}`);
      const imageInput = document.getElementById(`section-image-${index}`);

      deleteBtn?.addEventListener('click', () => this.deleteSection(index));
      moveUpBtn?.addEventListener('click', () => this.moveSection(index, -1));
      moveDownBtn?.addEventListener('click', () => this.moveSection(index, 1));
      contentInput?.addEventListener('input', (e) => {
        this.sections[index].content = e.target.value;
        this.updatePreview();
      });
      imageInput?.addEventListener('input', (e) => {
        this.sections[index].imageUrl = e.target.value;
        this.updatePreview();
      });
    });
  }

  createSectionHTML(section, index) {
    const typeLabels = {
      text: 'テキスト',
      'image-text': '画像 + テキスト',
      cta: 'CTAボタン'
    };

    let contentHTML = '';
    if (section.type === 'text') {
      contentHTML = `
        <div class="form-group">
          <label>テキスト</label>
          <textarea id="section-content-${index}" placeholder="テキストを入力">${section.content || ''}</textarea>
        </div>
      `;
    } else if (section.type === 'image-text') {
      contentHTML = `
        <div class="form-group">
          <label>画像URL</label>
          <input type="text" id="section-image-${index}" placeholder="https://..." value="${section.imageUrl || ''}">
        </div>
        <div class="form-group">
          <label>テキスト</label>
          <textarea id="section-content-${index}" placeholder="テキストを入力">${section.content || ''}</textarea>
        </div>
      `;
    } else if (section.type === 'cta') {
      contentHTML = `
        <div class="form-group">
          <label>ボタンテキスト</label>
          <input type="text" id="section-content-${index}" placeholder="ボタンのテキスト" value="${section.content || ''}">
        </div>
      `;
    }

    return `
      <div class="section-item">
        <div class="section-header">
          <span class="section-type">${typeLabels[section.type]}</span>
          <div class="section-controls">
            <button class="icon-btn" id="moveup-section-${index}" title="上に移動">⬆️</button>
            <button class="icon-btn" id="movedown-section-${index}" title="下に移動">⬇️</button>
            <button class="icon-btn" id="delete-section-${index}" title="削除">🗑️</button>
          </div>
        </div>
        ${contentHTML}
      </div>
    `;
  }

  addSection(type) {
    const section = {
      type,
      content: '',
      imageUrl: ''
    };
    this.sections.push(section);
    this.renderSections();
    this.updatePreview();
  }

  deleteSection(index) {
    if (confirm('このセクションを削除しますか？')) {
      this.sections.splice(index, 1);
      this.renderSections();
      this.updatePreview();
    }
  }

  moveSection(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.sections.length) return;

    [this.sections[index], this.sections[newIndex]] =
      [this.sections[newIndex], this.sections[index]];

    this.renderSections();
    this.updatePreview();
  }

  updatePreview() {
    const content = this.getFormData();
    const html = this.generatePreviewHTML(content);
    document.getElementById('previewFrame').innerHTML = html;
  }

  generatePreviewHTML(content) {
    const sectionsHTML = this.sections.map(section => {
      if (section.type === 'text') {
        return `<section class="text-section"><p>${this.escapeHtml(section.content)}</p></section>`;
      } else if (section.type === 'image-text') {
        return `
          <section class="image-text-section">
            ${section.imageUrl ? `<img src="${this.escapeHtml(section.imageUrl)}" alt="画像">` : ''}
            <p>${this.escapeHtml(section.content)}</p>
          </section>
        `;
      } else if (section.type === 'cta') {
        return `
          <section class="cta-section">
            <a href="#" class="cta-button">${this.escapeHtml(section.content)}</a>
          </section>
        `;
      }
      return '';
    }).join('');

    return `
      <style>
        ${this.getPreviewCSS()}
      </style>
      <div class="lp-preview">
        <section class="hero">
          <h1>${this.escapeHtml(content.hero.title)}</h1>
          <p class="subtitle">${this.escapeHtml(content.hero.subtitle)}</p>
          <a href="${this.escapeHtml(content.hero.ctaUrl)}" class="cta-button">
            ${this.escapeHtml(content.hero.ctaText)}
          </a>
        </section>

        ${sectionsHTML}

        <section class="profile">
          <h2>${this.escapeHtml(content.profile.name)}</h2>
          <p>${this.escapeHtml(content.profile.bio).replace(/\n/g, '<br>')}</p>
        </section>

        <footer class="footer">
          <div class="footer-links">
            <a href="${this.escapeHtml(content.footer.companyUrl)}">会社概要</a>
            <a href="${this.escapeHtml(content.footer.privacyUrl)}">プライバシーポリシー</a>
            <a href="${this.escapeHtml(content.footer.termsUrl)}">特定商取引法に基づく表記</a>
          </div>
        </footer>
      </div>
    `;
  }

  getPreviewCSS() {
    return `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      .lp-preview { 
        font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.8;
        color: #333;
      }
      section { padding: 40px 20px; }
      .hero { 
        text-align: center; 
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 60px 20px;
      }
      .hero h1 { 
        font-size: 2rem; 
        margin-bottom: 16px;
        font-weight: 700;
      }
      .hero .subtitle { 
        font-size: 1.1rem; 
        margin-bottom: 30px;
        opacity: 0.95;
      }
      .cta-button { 
        display: inline-block;
        padding: 16px 32px;
        background: #4CAF50;
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .cta-button:hover { 
        background: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
      .text-section {
        max-width: 800px;
        margin: 0 auto;
        background: #f9f9f9;
      }
      .text-section p {
        font-size: 1.05rem;
        line-height: 1.8;
      }
      .image-text-section {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
      }
      .image-text-section img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .cta-section {
        text-align: center;
        background: #f5f7fa;
      }
      .profile {
        max-width: 800px;
        margin: 0 auto;
        background: white;
      }
      .profile h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        color: #667eea;
      }
      .footer {
        background: #333;
        color: white;
        text-align: center;
        padding: 30px 20px;
      }
      .footer-links {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }
      .footer-links a {
        color: white;
        text-decoration: none;
        font-size: 0.9rem;
      }
      .footer-links a:hover {
        text-decoration: underline;
      }
    `;
  }

  exportHTML() {
    const content = this.getFormData();
    const html = this.generateFullHTML(content);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.lp.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);

    alert('HTMLファイルをダウンロードしました！\n\nXサーバーへのアップロード手順:\n1. FileZillaなどのFTPクライアントを開く\n2. Xサーバーに接続\n3. ダウンロードしたHTMLファイルを以下のパスにアップロード:\n   ' + this.lp.path);
  }

  generateFullHTML(content) {
    const sectionsHTML = this.sections.map(section => {
      if (section.type === 'text') {
        return `<section class="text-section"><p>${this.escapeHtml(section.content)}</p></section>`;
      } else if (section.type === 'image-text') {
        return `
          <section class="image-text-section">
            ${section.imageUrl ? `<img src="${this.escapeHtml(section.imageUrl)}" alt="画像">` : ''}
            <p>${this.escapeHtml(section.content)}</p>
          </section>
        `;
      } else if (section.type === 'cta') {
        return `
          <section class="cta-section">
            <a href="#" class="cta-button">${this.escapeHtml(section.content)}</a>
          </section>
        `;
      }
      return '';
    }).join('');

    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${this.escapeHtml(content.hero.subtitle)}">
  <title>${this.escapeHtml(this.lp.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    ${this.getPreviewCSS()}
  </style>
</head>
<body>
  <div class="lp-preview">
    <section class="hero">
      <h1>${this.escapeHtml(content.hero.title)}</h1>
      <p class="subtitle">${this.escapeHtml(content.hero.subtitle)}</p>
      <a href="${this.escapeHtml(content.hero.ctaUrl)}" class="cta-button">
        ${this.escapeHtml(content.hero.ctaText)}
      </a>
    </section>

    ${sectionsHTML}

    <section class="profile">
      <h2>${this.escapeHtml(content.profile.name)}</h2>
      <p>${this.escapeHtml(content.profile.bio).replace(/\n/g, '<br>')}</p>
    </section>

    <footer class="footer">
      <div class="footer-links">
        <a href="${this.escapeHtml(content.footer.companyUrl)}">会社概要</a>
        <a href="${this.escapeHtml(content.footer.privacyUrl)}">プライバシーポリシー</a>
        <a href="${this.escapeHtml(content.footer.termsUrl)}">特定商取引法に基づく表記</a>
      </div>
    </footer>
  </div>
</body>
</html>`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setupEventListeners() {
    // Auto-save on input
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => this.updatePreview());
    });

    // Save button
    document.getElementById('saveBtn').addEventListener('click', () => {
      this.saveLP();
    });

    // Preview button
    document.getElementById('previewBtn').addEventListener('click', () => {
      const content = this.getFormData();
      const html = this.generateFullHTML(content);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', () => {
      this.exportHTML();
    });

    // Add section
    const addSectionBtn = document.getElementById('addSectionBtn');
    const sectionModal = document.getElementById('sectionModal');
    const cancelSectionBtn = document.getElementById('cancelSectionBtn');
    const addSectionSubmitBtn = document.getElementById('addSectionSubmitBtn');

    addSectionBtn.addEventListener('click', () => {
      sectionModal.classList.add('active');
    });

    cancelSectionBtn.addEventListener('click', () => {
      sectionModal.classList.remove('active');
    });

    sectionModal.addEventListener('click', (e) => {
      if (e.target === sectionModal) {
        sectionModal.classList.remove('active');
      }
    });

    addSectionSubmitBtn.addEventListener('click', () => {
      const type = document.getElementById('sectionType').value;
      this.addSection(type);
      sectionModal.classList.remove('active');
    });
  }
}

// Initialize
const editor = new LPEditor();
