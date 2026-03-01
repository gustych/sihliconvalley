import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const brand = 'sihliconvalley';
const packageRoot = path.join(root, 'node_modules', '@sihliconvalley', 'design-tokens');
const src = path.join(packageRoot, 'assets', 'logos', brand);
const dest = path.join(root, 'public');
const brandDest = path.join(dest, 'design-tokens', 'logos', brand);
const localDesignSystem = path.join(root, 'design-system');

const files = [
  { from: 'icon.png', to: 'logo-icon.png' },
  { from: 'icon.svg', to: 'logo-icon.svg' },
  { from: 'lockup.png', to: 'logo-lockup.png' },
  { from: 'lockup.svg', to: 'logo-lockup.svg' },
  { from: 'wordmark.png', to: 'logo-wordmark.png' },
  { from: 'wordmark.svg', to: 'logo-wordmark.svg' }
];

if (!fs.existsSync(packageRoot)) {
  console.error(`Missing design-tokens package at ${packageRoot}`);
  process.exit(1);
}

fs.mkdirSync(brandDest, { recursive: true });
fs.mkdirSync(localDesignSystem, { recursive: true });

for (const file of files) {
  const from = path.join(src, file.from);
  const to = path.join(dest, file.to);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
  }
}

const brandFiles = fs.readdirSync(src);
for (const fileName of brandFiles) {
  fs.copyFileSync(path.join(src, fileName), path.join(brandDest, fileName));
}

for (const cssFile of ['base.css', `${brand}.css`]) {
  fs.copyFileSync(path.join(packageRoot, 'css', cssFile), path.join(localDesignSystem, cssFile));
}
fs.copyFileSync(path.join(packageRoot, 'tailwind', 'preset.cjs'), path.join(localDesignSystem, 'preset.cjs'));

console.log('Design assets synced.');
