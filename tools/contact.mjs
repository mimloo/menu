import { chromium } from 'playwright';
import { readdirSync, readFileSync } from 'node:fs';
const files = readdirSync('public/assets').filter(f => f.endsWith('.svg')).sort();
const cells = files.map(f => `<figure><div>${readFileSync('public/assets/' + f, 'utf8')}</div><figcaption>${f}</figcaption></figure>`).join('');
const html = `<style>body{margin:0;background:#F8F8EE;font:14px sans-serif;display:flex;flex-wrap:wrap;gap:12px;padding:12px;width:1900px}
figure{margin:0;border:1px dashed #ccc;padding:6px}div svg{max-width:600px;height:auto;display:block}
div svg[width^="1920"]{width:600px}</style>${cells}`;
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1920, height: 800 } });
await pg.setContent(html); await pg.screenshot({ path: process.argv[2] || 'ref/contact.png', fullPage: true }); await b.close();
