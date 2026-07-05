const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.mjs');

const pdfPath = process.argv[2];
if (!pdfPath) {
    console.error('Usage: node extract.js <pdf-path>');
    process.exit(1);
}

async function extractPDF(filePath) {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const doc = await pdfjsLib.getDocument({ data }).promise;

    console.log(`Pages: ${doc.numPages}`);
    console.log('---');
    console.log('');

    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        const text = strings.join(' ');
        if (text.trim()) {
            console.log(`## Page ${i}`);
            console.log('');
            console.log(text.trim());
            console.log('');
        }
    }
}

extractPDF(pdfPath).catch(err => {
    console.error('Error:', err.message || err);
    process.exit(1);
});
