import fs from 'fs';
import path from 'path';

const root = path.resolve(process.cwd());
const manifestPath = path.join(root, 'node_modules', '@sihliconvalley', 'design-tokens', 'assets', 'logos', 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  throw new Error(`Missing design-tokens manifest at ${manifestPath}`);
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
