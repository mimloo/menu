// Downloads product photos from Shopify's CDN and writes cropped, resized JPEGs to public/photos/<name>.jpg.
// usage: npm run photos
// Sources live in scripts/photos.json ({ name: url }). To refresh a photo, update its URL (Shopify admin ->
// product -> media) and re-run. Crop: a centered square, `CROP` of the original side, so plates fill the circle.
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CROP = 0.84;
const OUT = 512; // px; photos are shown at <=200 board px (400 px in the 2x export)
const sources = JSON.parse(readFileSync(new URL('./photos.json', import.meta.url), 'utf8'));

mkdirSync('public/photos', { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [name, url] of Object.entries(sources)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${name}: ${res.status} ${url}`);
    const type = res.headers.get('content-type') ?? 'image/png';
    const b64 = Buffer.from(await res.arrayBuffer()).toString('base64');
    const jpeg = await page.evaluate(
      async ({ src, crop, out }) => {
        const img = new Image();
        img.src = src;
        await img.decode();
        const side = Math.min(img.naturalWidth, img.naturalHeight) * crop;
        const sx = (img.naturalWidth - side) / 2;
        const sy = (img.naturalHeight - side) / 2;
        const c = document.createElement('canvas');
        c.width = c.height = out;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, sx, sy, side, side, 0, 0, out, out);
        return c.toDataURL('image/jpeg', 0.86).split(',')[1];
      },
      { src: `data:${type};base64,${b64}`, crop: CROP, out: OUT },
    );
    writeFileSync(`public/photos/${name}.jpg`, Buffer.from(jpeg, 'base64'));
    console.log(`public/photos/${name}.jpg`);
  }
} finally {
  await browser.close();
}
