/* ========================================
   RITZ PRO Sales Guide – Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Sidebar toggle ---
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const sidebarClose = document.getElementById('sidebarClose');

    hamburger?.addEventListener('click', () => sidebar.classList.add('open'));
    sidebarClose?.addEventListener('click', () => sidebar.classList.remove('open'));

    // Close sidebar on link click (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) sidebar.classList.remove('open');
        });
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = { rootMargin: '-20% 0px -70% 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === id));
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));

    // --- Mapping Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target)?.classList.add('active');
        });
    });

    // --- Scroll-reveal animation ---
    const revealEls = document.querySelectorAll(
        '.element-card, .logic-step, .result-card, .talk-card, .ng-item, .roadmap-phase'
    );

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity .5s ease, transform .5s ease';
        revealObserver.observe(el);
    });

    // Stagger animation for grid items
    document.querySelectorAll('.elements-grid, .results-grid').forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, i) => {
            item.style.transitionDelay = `${i * 0.07}s`;
        });
    });

});
