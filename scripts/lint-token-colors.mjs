import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const disallowedHex = [
  '#e63b2e', '#5ce0b8', '#e0d54a', '#e62f2d', '#b5a642',
  '#48ffa1', '#46d4ff', '#ffd166', '#ff4d6d', '#d9366b'
];
const exts = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html']);
const ignoreDirs = new Set(['node_modules', '.next', '.next-playwright', '.git', 'dist', 'build', 'test-results']);

const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoreDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (exts.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
};

walk(root);

const hits = [];
for (const filePath of files) {
  const relative = path.relative(root, filePath).replace(/\\/g, '/');
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split(/\r?\n/);
  lines.forEach((line, index) => {
    const lower = line.toLowerCase();
    for (const hex of disallowedHex) {
      if (lower.includes(hex)) {
        hits.push(`${relative}:${index + 1} contains ${hex}`);
      }
    }
  });
}

if (hits.length) {
  console.error('Found hardcoded brand hex values:');
  hits.forEach((hit) => console.error(`- ${hit}`));
  process.exit(1);
}

console.log('No hardcoded brand hex values found.');
