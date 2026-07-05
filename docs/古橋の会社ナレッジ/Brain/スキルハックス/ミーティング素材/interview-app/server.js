const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3456;
const DATA_FILE = path.join(__dirname, 'data', 'interviews.json');

// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory and file exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
}

// Helper: read data
function readData() {
    try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

// Helper: write data
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET /api/interviews — 一覧取得
app.get('/api/interviews', (req, res) => {
    const data = readData();
    // 新しい順に返す
    res.json(data.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)));
});

// POST /api/interviews — 保存
app.post('/api/interviews', (req, res) => {
    const data = readData();
    const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        savedAt: new Date().toISOString(),
        ...req.body,
    };
    data.push(entry);
    writeData(data);
    res.status(201).json(entry);
});

// DELETE /api/interviews/:id — 削除
app.delete('/api/interviews/:id', (req, res) => {
    let data = readData();
    const before = data.length;
    data = data.filter((d) => d.id !== req.params.id);
    if (data.length === before) {
        return res.status(404).json({ error: 'Not found' });
    }
    writeData(data);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`\n  📋 インタビューガイド起動中`);
    console.log(`  → http://localhost:${PORT}\n`);
});
