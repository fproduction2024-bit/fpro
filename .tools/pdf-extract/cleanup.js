const fs = require('fs');

// Read the extracted markdown
const inputPath = process.argv[2];
const content = fs.readFileSync(inputPath, 'utf-8');

// Clean up the text: remove excessive spaces between Japanese characters
let cleaned = content;

// Remove spaces between Japanese characters (kanji, hiragana, katakana)
// This regex matches a CJK character, followed by spaces, followed by another CJK character
cleaned = cleaned.replace(/([\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF])\s+([\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF])/g, '$1$2');
// Run multiple times since the regex doesn't overlap
for (let i = 0; i < 10; i++) {
    cleaned = cleaned.replace(/([\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF])\s+([\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF])/g, '$1$2');
}

// Clean up spaced-out ASCII/alphanumeric text like "R I T Z P R O" -> "RITZPRO"
// Match single uppercase letters separated by spaces
cleaned = cleaned.replace(/\b([A-Z])\s+(?=[A-Z]\b)/g, '$1');
for (let i = 0; i < 10; i++) {
    cleaned = cleaned.replace(/\b([A-Z])\s+(?=[A-Z](?:\s|[^a-z]))/g, '$1');
}

// Clean up "© 2024 RITZPRO Inc." footer lines
cleaned = cleaned.replace(/©\s*\d+\s*RITZPRO\s*Inc\.\s*/g, '');
cleaned = cleaned.replace(/©\s*2\s*0\s*2\s*4\s*R\s*I\s*T\s*Z\s*P\s*R\s*O\s*I\s*n\s*c\s*\./g, '');

// Clean up remaining spaced ASCII like "N o . 1" -> "No.1"
cleaned = cleaned.replace(/N\s*o\s*\.\s*1/g, 'No.1');

// Clean "M & A" or "M&A" normalization
cleaned = cleaned.replace(/M\s*&\s*A/g, 'M&A');

// Remove page numbers at start of lines (like "02 ", "38 ")
cleaned = cleaned.replace(/^(\d{2})\s+/gm, '');

// Clean up multiple blank lines
cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

// Add a proper title
cleaned = '# 【リッツプロ】伴走型FC支援紹介資料\n\n> PDF自動抽出・整形版\n\n' + cleaned.replace(/^Pages: \d+\n---\n\n/, '');

process.stdout.write(cleaned);
