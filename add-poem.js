const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'poems.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Paste your poem. Press ENTER twice to finish:\n');

let lines = [];

rl.on('line', (line) => {
  if (line.trim() === '' && lines[lines.length - 1] === '') {
    rl.close(); // double enter = done
  } else {
    lines.push(line);
  }
});

rl.on('close', () => {
  const rawText = lines.join(' ').trim();

  if (!rawText) {
    console.error('❌ Empty poem');
    process.exit(1);
  }

  // ✨ Auto-format logic
  const formattedPoem = rawText
    .replace(/\s+/g, ' ') // collapse spaces
    .replace(/([.!?])\s+/g, '$1\n') // break after sentences
    .replace(/\n{2,}/g, '\n\n') // limit blank lines
    .trim();

  const poems = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const nextId = poems.length > 0 ? Math.max(...poems.map((p) => p.id)) + 1 : 1;

  poems.push({
    id: nextId,
    poem: formattedPoem,
  });

  fs.writeFileSync(filePath, JSON.stringify(poems, null, 2), 'utf8');

  console.log(`✅ Poem #${nextId} added`);
});
