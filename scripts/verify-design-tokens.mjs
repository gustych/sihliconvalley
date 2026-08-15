import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const manifestPath = path.join(root, 'node_modules', '@sihliconvalley', 'design-tokens', 'assets', 'logos', 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  const fallback = ['logo-icon.svg', 'logo-lockup.svg', 'logo-wordmark.svg'];
  if (fallback.every((file) => fs.existsSync(path.join(root, 'public', file)))) {
    console.log('Using committed design-token assets.');
    process.exit(0);
  }
  throw new Error(`Missing design-tokens package and committed assets`);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const brand = manifest.sihliconvalley;
if (!brand) {
  throw new Error('Missing sihliconvalley brand in design-tokens manifest');
}
if (!brand.icon?.svg || !brand.lockup?.svg || !brand.wordmark?.svg) {
  throw new Error('Missing required SVG logo entries in design-tokens manifest');
}

console.log('Design-tokens package is available and manifest is valid.');
