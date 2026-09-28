// Renders each board to exports/<id>.png at 3840x2160 with headless Chromium.
// usage: npm run export            (screenshots of the live DOM)
//        npm run export -- --h2i   (also saves the in-app html-to-image output, what phones share)
import { chromium } from 'playwright';
import { createServer } from 'vite';
import { mkdirSync, writeFileSync } from 'node:fs';

const IDS = ['brunch-mains', 'bowls', 'sides-sips'];
const h2i = process.argv.includes('--h2i');

mkdirSync('exports', { recursive: true });
const server = await createServer({ server: { port: 5199 }, logLevel: 'error' });
await server.listen();
const base = 'http://localhost:5199';
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
  for (const id of IDS) {
    await page.goto(`${base}/?board=${id}`);
    await page.waitForSelector(`[data-board="${id}"]`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForLoadState('networkidle');
    await page.locator(`[data-board="${id}"]`).screenshot({ path: `exports/${id}.png` });
    console.log(`exports/${id}.png`);
  }

  if (h2i) {
    const gallery = await browser.newPage({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 3 });
    await gallery.goto(base);
    await gallery.waitForFunction(() => document.querySelectorAll('a.btn[href^="blob:"]').length === 3, null, { timeout: 60_000 });
    const pngs = await gallery.evaluate(async () =>
      Promise.all(
        [...document.querySelectorAll('a.btn[href^="blob:"]')].map(async (a) => {
          const buf = await (await fetch(a.href)).arrayBuffer();
          return [...new Uint8Array(buf)];
        }),
      ),
    );
    pngs.forEach((bytes, i) => {
      writeFileSync(`exports/${IDS[i]}.h2i.png`, Buffer.from(bytes));
      console.log(`exports/${IDS[i]}.h2i.png`);
    });
  }
} finally {
  await browser.close();
  await server.close();
}
