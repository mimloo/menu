// Renders public/icons/icon.svg to the PNG sizes referenced by public/manifest.webmanifest.
// usage: npm run icons
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const SIZES = { 'icon-192.png': 192, 'icon-512.png': 512, 'apple-touch-icon.png': 180 };
const svg = readFileSync('public/icons/icon.svg', 'utf8');
const browser = await chromium.launch();

try {
  for (const [file, size] of Object.entries(SIZES)) {
    const page = await browser.newPage({ viewport: { width: size, height: size } });
    await page.setContent(`<body style="margin:0">${svg.replace('width="512" height="512"', `width="${size}" height="${size}"`)}</body>`);
    await page.locator('svg').screenshot({ path: `public/icons/${file}` });
    await page.close();
    console.log(`public/icons/${file}`);
  }
} finally {
  await browser.close();
}
