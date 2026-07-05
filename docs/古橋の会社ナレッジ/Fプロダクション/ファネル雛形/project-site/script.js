// ================================
// Funnel Project Dashboard - Script
// ================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    updateAllProgress();
    initPhaseCards();
});

// ================================
// State Management (localStorage)
// ================================

const STORAGE_KEY = 'funnel_project_state';

function getDefaultState() {
    return {
        projectName: '【案件名を入力】',
        clientName: '—',
        startDate: '—',
        endDate: '—',
        checkboxes: {}
    };
}

function loadState() {
    let state;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        state = saved ? JSON.parse(saved) : getDefaultState();
    } catch {
        state = getDefaultState();
    }

    // Restore project info
    document.getElementById('projectName').textContent = state.projectName;
    document.getElementById('clientName').textContent = state.clientName;
    document.getElementById('startDate').textContent = state.startDate;
    document.getElementById('endDate').textContent = state.endDate;

    // Restore checkboxes
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(cb => {
        const key = `${cb.dataset.phase}-${cb.dataset.task}`;
        if (state.checkboxes[key]) {
            cb.checked = true;
        }
    });
}

function saveState() {
    const state = {
        projectName: document.getElementById('projectName').textContent,
        clientName: document.getElementById('clientName').textContent,
        startDate: document.getElementById('startDate').textContent,
        endDate: document.getElementById('endDate').textContent,
        checkboxes: {}
    };

    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(cb => {
        const key = `${cb.dataset.phase}-${cb.dataset.task}`;
        if (cb.checked) {
            state.checkboxes[key] = true;
        }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// ================================
// Make project info editable
// ================================

['projectName', 'clientName', 'startDate', 'endDate'].forEach(id => {
    const el = document.getElementById(id);
    el.style.cursor = 'pointer';
    el.title = 'クリックで編集';

    el.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = el.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = current === '—' ? '' : current;
        input.style.cssText = `
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(99, 102, 241, 0.5);
      border-radius: 6px;
      padding: 0.3rem 0.5rem;
      color: #f0f0f5;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      width: ${Math.max(el.offsetWidth + 20, 100)}px;
      outline: none;
    `;

        el.replaceWith(input);
        input.focus();
        input.select();

        const commit = () => {
            const newValue = input.value.trim() || '—';
            el.textContent = newValue;
            input.replaceWith(el);
            saveState();
        };

        input.addEventListener('blur', commit);
        input.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') commit();
            if (ev.key === 'Escape') {
                el.textContent = current;
                input.replaceWith(el);
            }
        });
    });
});

// ================================
// Phase Card Toggle
// ================================

function initPhaseCards() {
    // Open phase 0 by default
    const firstCard = document.querySelector('.phase-card[data-phase="0"]');
    if (firstCard) firstCard.classList.add('open');
}

function togglePhase(phaseIndex) {
    const card = document.querySelector(`.phase-card[data-phase="${phaseIndex}"]`);
    if (card) {
        card.classList.toggle('open');
    }
}

// ================================
// Checkbox Handling
// ================================

document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
        saveState();
        updateAllProgress();

        // Micro-animation on check
        const item = cb.closest('.checklist-item');
        item.style.transform = 'scale(1.02)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    });
});

// ================================
// Progress Calculation
// ================================

function updateAllProgress() {
    const phaseProgresses = [];

    for (let p = 0; p <= 4; p++) {
        const total = document.querySelectorAll(`.checklist-item input[data-phase="${p}"]`);
        const checked = document.querySelectorAll(`.checklist-item input[data-phase="${p}"]:checked`);
        const percent = total.length > 0 ? Math.round((checked.length / total.length) * 100) : 0;

        phaseProgresses.push(percent);

        // Update ring
        const ring = document.getElementById(`ring${p}`);
        if (ring) {
            const offset = 100 - percent;
            ring.style.strokeDashoffset = offset;
        }

        // Update ring text
        const ringText = document.getElementById(`ringText${p}`);
        if (ringText) {
            ringText.textContent = `${percent}%`;
        }

        // Update timeline node
        const node = document.querySelector(`.timeline-node[data-phase="${p}"]`);
        if (node) {
            node.classList.remove('active', 'completed');
            if (percent === 100) {
                node.classList.add('completed');
            } else if (percent > 0) {
                node.classList.add('active');
            }
        }
    }

    // Total progress
    const totalPercent = Math.round(phaseProgresses.reduce((a, b) => a + b, 0) / 5);
    document.getElementById('totalProgress').textContent = `${totalPercent}%`;

    // Timeline fill
    const fill = document.getElementById('timelineFill');
    if (fill) {
        // Calculate fill width based on completed phases
        let fillPercent = 0;
        for (let i = 0; i <= 4; i++) {
            if (phaseProgresses[i] === 100) {
                fillPercent = ((i + 1) / 5) * 100;
            } else if (phaseProgresses[i] > 0) {
                fillPercent = (i / 5) * 100 + (phaseProgresses[i] / 100) * (100 / 5);
                break;
            }
        }
        fill.style.width = `${fillPercent}%`;
    }

    // Set first uncompleted phase as active if none are active
    const activeNodes = document.querySelectorAll('.timeline-node.active');
    if (activeNodes.length === 0) {
        for (let i = 0; i <= 4; i++) {
            if (phaseProgresses[i] < 100) {
                const node = document.querySelector(`.timeline-node[data-phase="${i}"]`);
                if (node) node.classList.add('active');
                break;
            }
        }
    }
}

// ================================
// Hearing Category Toggle
// ================================

function toggleCategory(catId) {
    const cat = document.getElementById(catId);
    if (cat) {
        cat.classList.toggle('open');
    }
}

// ================================
// Hearing Textarea Persistence
// ================================

const HEARING_STORAGE_KEY = 'funnel_hearing_data';

function loadHearingData() {
    try {
        const saved = localStorage.getItem(HEARING_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            document.querySelectorAll('.hearing-answer').forEach(ta => {
                const field = ta.dataset.field;
                if (data[field]) {
                    ta.value = data[field];
                }
            });
        }
    } catch (e) {
        // ignore
    }
}

function saveHearingData() {
    const data = {};
    document.querySelectorAll('.hearing-answer').forEach(ta => {
        const field = ta.dataset.field;
        if (ta.value.trim()) {
            data[field] = ta.value;
        }
    });
    localStorage.setItem(HEARING_STORAGE_KEY, JSON.stringify(data));
}

// Debounced save for textareas
let hearingSaveTimer = null;
document.querySelectorAll('.hearing-answer').forEach(ta => {
    ta.addEventListener('input', () => {
        clearTimeout(hearingSaveTimer);
        hearingSaveTimer = setTimeout(saveHearingData, 500);
    });
});

// Load hearing data on page load
loadHearingData();
