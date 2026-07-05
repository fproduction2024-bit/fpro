// State
const youtubeWorkflow = [
    {
        id: '1-1',
        text: 'フェーズ1-1: ディープリサーチ',
        completed: false,
        description: 'ChatGPTまたはGensparkを使用して、トピックについて詳細なリサーチを行います。結果をGoogleドキュメントに保存・コピーしてください。',
        prompt: '[トピック]について詳細にリサーチしてください。最新のトレンドとデータを重視し、YouTube動画の台本の下地となる形で結果を出力してください。'
    },
    {
        id: '1-2',
        text: 'フェーズ1-2: タイトル決定',
        completed: false,
        description: 'ChatGPTにタイトル案を出させます。クリック率が高そうな（煽りやベネフィットを含む）ものを選択してください。',
        prompt: 'この内容でYouTube動画を作ります。タイトル案を5つ出してください。「煽り」要素や専門的なキーワードを含めて、クリックしたくなるタイトルにしてください。'
    },
    {
        id: '1-3',
        text: 'フェーズ1-3: サムネイル画像生成',
        completed: false,
        description: '16:9の比率でサムネイル用の画像を生成します。',
        prompt: 'この動画のサムネイルのモチーフ案を出してください。その後、決定したモチーフに基づいて、高品質な16:9の画像を生成してください。'
    },
    {
        id: '2-1',
        text: 'フェーズ2: サムネイル作成 (Canva)',
        completed: false,
        description: '1. Canvaのテンプレートを開く\n2. タイトルテキストを入力\n3. 生成した背景画像をアップロードして配置\n4. PNGまたはJPEGでダウンロード',
        prompt: ''
    },
    {
        id: '3-1',
        text: 'フェーズ3-1: 視聴者の悩み定義',
        completed: false,
        description: 'ターゲット視聴者の抱える悩みや課題を明確にします。',
        prompt: 'タイトル「[あなたのタイトル]」について、視聴者が抱えている課題、悩み、解決策を提示してください。'
    },
    {
        id: '3-2',
        text: 'フェーズ3-2: 台本初稿の生成',
        completed: false,
        description: '「台本ボット」を使用します。入力：発信者情報、テーマ、課題。リサーチ資料を添付してください。',
        prompt: 'YouTube動画の台本を作成してください。構成：ステップバイステップ形式。自己紹介は省き、すぐに本編に入ってください。'
    },
    {
        id: '3-3',
        text: 'フェーズ3-3: オープニング再構成',
        completed: false,
        description: '視聴者を惹きつける強力なオープニングに書き換えます。',
        prompt: '以下の7ステップ構成（約1000文字）でオープニングを再構成してください：\n1. 損失回避の喚起\n2. 常識の破壊\n3. 再現性の強調\n4. 具体的ベネフィット\n5. 悩みの言語化\n6. 言い訳の粉砕\n7. 「あなたもできる」というメッセージ'
    },
    {
        id: '3-4',
        text: 'フェーズ3-4: 本編の肉付け',
        completed: false,
        description: '台本の内容を具体的に拡張します。',
        prompt: '各ステップを3000〜4000文字程度に拡張してください。順番に出力してください。'
    },
    {
        id: '4-1',
        text: 'フェーズ4-1: スライド作成 (Genspark)',
        completed: false,
        description: 'Gensparkの「AIスライド」を使用します。台本を添付してください。',
        prompt: '添付の台本からYouTube用スライドを作成してください。\n- 「...」でスライドを区切ってください\n- タイトルページは不要です\n- アスペクト比は16:9にしてください'
    },
    {
        id: '4-2',
        text: 'フェーズ4-2: 音声生成 (Fish Audio)',
        completed: false,
        description: 'クローン音声を使用して、スライドごとに音声を生成します。',
        prompt: ''
    },
    {
        id: '5-1',
        text: 'フェーズ5: 動画編集 (iMovie)',
        completed: false,
        description: '1. スライドJPEGを配置\n2. 音声MP3を配置\n3. 長さを調整\n4. 全スライド分繰り返す\n5. BGMを追加（音量3%）',
        prompt: ''
    },
    {
        id: '6-1',
        text: 'フェーズ6: YouTube投稿',
        completed: false,
        description: 'タイトル、サムネイル、説明欄を設定してアップロードします。',
        prompt: ''
    }
];

// 日本語版としてデータをリセット・更新する
let tasks = youtubeWorkflow;
localStorage.setItem('actionApp_youtubeWorkflow_JA', JSON.stringify(tasks));

let activeTaskId = null;
let timerInterval = null;
let timeLeft = 25 * 60;
let isTimerRunning = false;

// DOM Elements
const taskListEl = document.getElementById('task-list');
const taskCountEl = document.getElementById('task-count');
const inputEl = document.getElementById('new-task-input');
const btnAdd = document.getElementById('btn-add-task');

const activeTaskContainer = document.getElementById('active-task-container');
const noActiveTaskEl = document.getElementById('no-active-task');
const activeTaskTitle = document.getElementById('active-task-title');
const activeTaskDesc = document.getElementById('active-task-desc');
const activeTaskPrompt = document.getElementById('active-task-prompt');
const activeTaskPromptText = document.getElementById('active-task-prompt-text');
const btnCopyPrompt = document.getElementById('btn-copy-prompt');

const timerMinEl = document.getElementById('timer-minutes');
const timerSecEl = document.getElementById('timer-seconds');
const btnStart = document.getElementById('btn-start-timer');
const btnPause = document.getElementById('btn-pause-timer');
const btnComplete = document.getElementById('btn-complete-active');

const dateDayEl = document.getElementById('current-day');
const dateDateEl = document.getElementById('current-date');

// Initialization
function init() {
    updateDate();
    renderTasks();
    checkActiveTask();

    // Key listeners
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    btnAdd.addEventListener('click', addTask);

    btnStart.addEventListener('click', startTimer);
    btnPause.addEventListener('click', pauseTimer);
    btnComplete.addEventListener('click', completeActiveTask);

    // Copy Prompt
    if (btnCopyPrompt) {
        btnCopyPrompt.addEventListener('click', () => {
            const text = activeTaskPromptText.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btnCopyPrompt.innerHTML;
                btnCopyPrompt.innerHTML = '<i class="fa-solid fa-check"></i> コピー完了!';
                setTimeout(() => btnCopyPrompt.innerHTML = originalText, 2000);
            });
        });
    }
}

function updateDate() {
    const now = new Date();
    // Japanese Date Format
    const optionsDay = { weekday: 'long' };
    const optionsDate = { month: 'long', day: 'numeric' };

    dateDayEl.textContent = now.toLocaleDateString('ja-JP', optionsDay);
    dateDateEl.textContent = now.toLocaleDateString('ja-JP', optionsDate);
}

// Task Management
function addTask() {
    const text = inputEl.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        description: '',
        prompt: ''
    };

    tasks.push(newTask);
    saveTasks();
    inputEl.value = '';
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id, event) {
    event.stopPropagation();
    tasks = tasks.filter(t => t.id !== id);
    if (activeTaskId === id) {
        activeTaskId = null;
        pauseTimer();
        resetTimer();
        checkActiveTask();
    }
    saveTasks();
    renderTasks();
}

function selectTask(id) {
    activeTaskId = id;
    resetTimer();
    checkActiveTask();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('actionApp_youtubeWorkflow_JA', JSON.stringify(tasks));
    updateCount();
}

function renderTasks() {
    taskListEl.innerHTML = '';

    tasks.forEach(task => {
        // ID comparison needs to be loose if IDs are strings ('1-1') vs numbers (Date.now())
        // but here our initial IDs are strings.
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} ${task.id === activeTaskId ? 'active' : ''}`;
        li.onclick = () => selectTask(task.id);

        li.innerHTML = `
            <div class="task-checkbox" onclick="event.stopPropagation(); toggleTask('${task.id}')">
                ${task.completed ? '<i class="fa-solid fa-check" style="color: white; font-size: 0.8rem;"></i>' : ''}
            </div>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="btn-delete" onclick="deleteTask('${task.id}', event)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        taskListEl.appendChild(li);
    });

    updateCount();
}

function updateCount() {
    const count = tasks.filter(t => !t.completed).length;
    taskCountEl.textContent = `残り ${count} 件`;
}

function checkActiveTask() {
    if (activeTaskId) {
        const task = tasks.find(t => t.id === activeTaskId);
        if (task) {
            noActiveTaskEl.classList.add('hidden');
            activeTaskContainer.classList.remove('hidden');

            // Update Title
            activeTaskTitle.textContent = task.text;

            // Update Description
            if (activeTaskDesc) {
                activeTaskDesc.textContent = task.description || '説明はありません。';
                activeTaskDesc.innerHTML = escapeHtml(task.description || '').replace(/\n/g, '<br>');
            }

            // Update Prompt
            if (activeTaskPrompt) {
                if (task.prompt) {
                    activeTaskPrompt.classList.remove('hidden');
                    activeTaskPromptText.textContent = task.prompt;
                } else {
                    activeTaskPrompt.classList.add('hidden');
                }
            }

            return;
        }
    }

    // No valid active task
    noActiveTaskEl.classList.remove('hidden');
    activeTaskContainer.classList.add('hidden');
}

// Timer Logic
function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    timerMinEl.textContent = m.toString().padStart(2, '0');
    timerSecEl.textContent = s.toString().padStart(2, '0');
}

function startTimer() {
    if (isTimerRunning) return;

    isTimerRunning = true;
    btnStart.classList.add('hidden');
    btnPause.classList.remove('hidden');

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            completeActiveTask();
        }
    }, 1000);
}

function pauseTimer() {
    isTimerRunning = false;
    clearInterval(timerInterval);
    btnStart.classList.remove('hidden');
    btnPause.classList.add('hidden');
}

function resetTimer() {
    pauseTimer();
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

function completeActiveTask() {
    pauseTimer();
    if (activeTaskId) {
        const task = tasks.find(t => t.id === activeTaskId);
        if (task && !task.completed) {
            toggleTask(activeTaskId);
        }
        activeTaskId = null;
        checkActiveTask();
        renderTasks();
    }
}

// Utility
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Start
init();
