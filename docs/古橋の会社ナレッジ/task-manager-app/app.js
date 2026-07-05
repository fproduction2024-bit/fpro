document.addEventListener('DOMContentLoaded', () => {
    // ---- State Management ----
    let tasks = JSON.parse(localStorage.getItem('taskManagerTasks')) || [];
    let currentFilter = 'all'; // 'all', 'furuhashi', 'oda'
    
    // Mock Data if empty for demo purposes
    if (tasks.length === 0) {
        tasks = [
            { id: '1', title: 'Brainコミット 商品概要まとめの校正', desc: 'LP用の構成案をチェックする', assignee: 'furuhashi', priority: 'high', status: 'todo', deadline: '2026-05-25' },
            { id: '2', title: 'ON Salon 改善データ収集', desc: 'フランチャイズ加盟店用の実績データをまとめる', assignee: 'oda', priority: 'medium', status: 'inprogress', deadline: '2026-05-22' },
            { id: '3', title: '動画プロット 第3話の修正', desc: 'COMPASS構造に合わせて台本を書き直す', assignee: 'furuhashi', priority: 'high', status: 'done', deadline: '2026-05-18' },
            { id: '4', title: 'TangleSeedのブログ記事更新', desc: 'Vercelへのデプロイ確認を含む', assignee: 'oda', priority: 'low', status: 'todo', deadline: '' }
        ];
        saveTasks();
    }

    // ---- DOM Elements ----
    const lists = {
        todo: document.getElementById('list-todo'),
        inprogress: document.getElementById('list-inprogress'),
        done: document.getElementById('list-done')
    };
    const counts = {
        todo: document.getElementById('count-todo'),
        inprogress: document.getElementById('count-inprogress'),
        done: document.getElementById('count-done')
    };
    
    // Modal
    const modal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const addTaskBtn = document.getElementById('add-task-btn');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // Filters
    const filterBtns = document.querySelectorAll('.nav-item');
    const viewTitle = document.getElementById('current-view-title');
    
    // KPIs
    const kpiTotal = document.getElementById('kpi-total');
    const kpiFuruhashi = document.getElementById('kpi-furuhashi');
    const kpiOda = document.getElementById('kpi-oda');
    const progFuruhashi = document.getElementById('progress-furuhashi');
    const progOda = document.getElementById('progress-oda');

    // Display Date
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('ja-JP', dateOptions);

    // ---- Core Functions ----
    function saveTasks() {
        localStorage.setItem('taskManagerTasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        // Clear current lists
        Object.values(lists).forEach(list => list.innerHTML = '');
        
        let filteredTasks = tasks;
        if (currentFilter !== 'all') {
            filteredTasks = tasks.filter(t => t.assignee === currentFilter);
        }

        const stats = { todo: 0, inprogress: 0, done: 0 };

        filteredTasks.forEach(task => {
            if (!stats[task.status] && stats[task.status] !== 0) {
                task.status = 'todo'; // fallback
            }
            stats[task.status]++;
            
            const card = createTaskCardElement(task);
            lists[task.status].appendChild(card);
        });

        // Update counts
        counts.todo.textContent = stats.todo;
        counts.inprogress.textContent = stats.inprogress;
        counts.done.textContent = stats.done;

        updateKPIs();
        setupDragAndDrop();
    }

    function updateKPIs() {
        const activeTasks = tasks.filter(t => t.status !== 'done');
        kpiTotal.textContent = activeTasks.length;

        const fTasks = activeTasks.filter(t => t.assignee === 'furuhashi').length;
        const oTasks = activeTasks.filter(t => t.assignee === 'oda').length;

        kpiFuruhashi.textContent = fTasks;
        kpiOda.textContent = oTasks;

        const totalActive = activeTasks.length || 1; // prevent div by zero
        progFuruhashi.style.width = `${(fTasks / totalActive) * 100}%`;
        progOda.style.width = `${(oTasks / totalActive) * 100}%`;
    }

    function createTaskCardElement(task) {
        const el = document.createElement('div');
        el.className = 'task-card';
        el.draggable = true;
        el.dataset.id = task.id;

        // Assignee Data
        let avatarClass = 'avatar-oda';
        let avatarText = 'O';
        let assigneeName = '小田さん';
        
        if (task.assignee === 'furuhashi') {
            avatarClass = 'avatar-furuhashi';
            avatarText = 'F';
            assigneeName = '古橋さん';
        } else if (task.assignee === 'unassigned') {
            avatarClass = '';
            avatarText = '-';
            assigneeName = '未割り当て';
        }

        // Deadline check
        let deadlineHtml = '';
        if (task.deadline) {
            const today = new Date().toISOString().split('T')[0];
            const isOverdue = task.deadline < today && task.status !== 'done';
            deadlineHtml = `<div class="task-deadline ${isOverdue ? 'overdue' : ''}">
                <i class="fa-regular fa-clock"></i> ${task.deadline}
            </div>`;
        }

        el.innerHTML = `
            <div class="task-card-header">
                <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                <div class="task-actions">
                    <button class="btn-icon edit-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon delete-btn" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <h4 class="task-title">${escapeHTML(task.title)}</h4>
            ${task.desc ? `<p class="task-desc">${escapeHTML(task.desc)}</p>` : ''}
            <div class="task-footer">
                <div class="assignee-badge">
                    <div class="avatar-sm ${avatarClass}">${avatarText}</div>
                    ${assigneeName}
                </div>
                ${deadlineHtml}
            </div>
        `;

        // Event listeners for Edit/Delete
        el.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(task);
        });
        
        el.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if(confirm('このタスクを削除してもよろしいですか？')) {
                tasks = tasks.filter(t => t.id !== task.id);
                saveTasks();
                renderTasks();
            }
        });

        return el;
    }

    // ---- Drag and Drop ----
    function setupDragAndDrop() {
        const cards = document.querySelectorAll('.task-card');
        const columns = document.querySelectorAll('.kanban-cards');

        cards.forEach(card => {
            card.addEventListener('dragstart', () => {
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                
                // Update task status based on new parent
                const newStatus = card.closest('.kanban-column').dataset.status;
                const taskId = card.dataset.id;
                
                const task = tasks.find(t => t.id === taskId);
                if (task && task.status !== newStatus) {
                    task.status = newStatus;
                    saveTasks();
                    renderTasks(); // Re-render to update counts and KPIs
                }
            });
        });

        columns.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.task-card:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // ---- Modal and Form ----
    function openModal(task = null) {
        const titleEl = document.getElementById('modal-title');
        
        if (task) {
            titleEl.textContent = 'Edit Task';
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.desc || '';
            document.getElementById('task-assignee').value = task.assignee;
            document.getElementById('task-priority').value = task.priority;
            document.getElementById('task-deadline').value = task.deadline || '';
        } else {
            titleEl.textContent = 'Add New Task';
            taskForm.reset();
            document.getElementById('task-id').value = '';
            
            // Set default assignee if filtered
            if(currentFilter !== 'all') {
                document.getElementById('task-assignee').value = currentFilter;
            }
        }
        
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    addTaskBtn.addEventListener('click', () => openModal());
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('task-id').value;
        const newTask = {
            id: id || Date.now().toString(),
            title: document.getElementById('task-title').value,
            desc: document.getElementById('task-desc').value,
            assignee: document.getElementById('task-assignee').value,
            priority: document.getElementById('task-priority').value,
            deadline: document.getElementById('task-deadline').value,
            status: 'todo' // Default status for new
        };

        if (id) {
            // Update existing
            const index = tasks.findIndex(t => t.id === id);
            // Preserve status
            newTask.status = tasks[index].status;
            tasks[index] = newTask;
        } else {
            // Add new
            tasks.push(newTask);
        }

        saveTasks();
        renderTasks();
        closeModal();
    });

    // ---- Filters ----
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            
            // Update Title
            if (currentFilter === 'all') viewTitle.textContent = 'All Tasks Overview';
            if (currentFilter === 'furuhashi') viewTitle.textContent = "Furuhashi's Tasks";
            if (currentFilter === 'oda') viewTitle.textContent = "Oda's Tasks";
            
            renderTasks();
        });
    });

    // Utility
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }

    // Initial render
    renderTasks();
});
