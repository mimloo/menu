# Mimloo menu boards

Three 16:9 menu boards (1920×1080 canvas, exported as 3840×2160 PNG) for the in-store Menu Board.
The owner edits them by prompting Claude Code from a phone. The deployed site then renders each board to a PNG,
and the phone shares it to the Menu Board app.

## Where things live
- **All text and prices: `src/data/menu.ts`.** Most requests ("Loco Moco is $20 now", "rename X",
  "mark Y as chef's pick", "remove tree nut from Z") are one-line edits here. Use `\n` for forced line breaks.
- Types: `src/data/types.ts`. Allergen keys: `gluten dairy egg treeNut vegan`.
  Nutrition keys: `protein wholeGrain antioxidant goodFats probiotic`.
- Layout per board: `src/boards/BrunchMains.tsx`, `BuildABowl.tsx`, `SidesSips.tsx`. Shared pieces are in `src/components/`.
- Art: `public/assets/*.svg`, sliced from the design PDF by `tools/slice.py`; sizes are in `src/lib/art.json`.
  Use `<Art name="..." />`.
- Dish/side/drink photos: `public/photos/<name>.jpg`, referenced by `photo:` in `menu.ts` and shown as circles
  (`<Photo />`). They are the Shopify product images: URLs in `scripts/photos.json`, regenerated (downloaded, cropped,
  resized) with `npm run photos`. To add one, put the product's image URL in `photos.json` and re-run.
- Bowl photos: `public/assets/bowl-{mika,pilu,remi,ollie}.png`. These are the canonical Shopify variant images of the
  "Build Your Own Bowl" product; if a bowl photo changes, re-download it from Shopify.
- Launcher icon: `public/icons/icon.svg` (TV + Mimloo emblem, from `../social/brand/logos`); `npm run icons` renders the
  PNGs listed in `public/manifest.webmanifest`.
- Fonts: `public/fonts/MimlooNeulis-{Regular,Medium}.woff2`, built by `tools/build-font.py`.

## Rules
- **Never invent menu items, prices, or allergen info.** If asked for something that isn't specified, ask.
- The canvas is fixed at 1920×1080 with absolute positions. **Never make boards responsive.** Text boxes are trimmed
  to cap height (`.t` class), so a `top` value means the cap top of the first line.
- Adding items can overflow a section. After a change, check the rendered PNG to confirm nothing collides or runs
  off the board. If it doesn't fit, say so and suggest what to cut or shrink; don't silently shrink fonts.
- Keep brand colors to the tokens in `src/styles/tokens.css`. Small/body text is `--teal` (7:1 contrast on cream);
  `--green` is for big type only (4.3:1). Text on mint pills must be teal.
- **Legibility floor** (the boards are read from across the counter): item names ≥ 36px, prices ≥ 28px,
  descriptions and list items ≥ 21px (combo cards: 19.5px, the most they fit), smallest labels ≥ 17px.
  Don't go below these to make something fit; cut instead.
- Prices render without `$` and without `.00` (`money()` in `src/lib/format.ts`; `CURRENCY` brings the sign back).
  Drink columns use two decimals.

## Verify every change
```
npm run build            # typecheck + bundle
npm run export           # writes exports/<board>.png at 3840×2160 via headless Chromium
```
Look at the relevant `exports/*.png` (Read the image) before committing.
If Chromium is missing, run `npx playwright install chromium`.
`npm run export -- --h2i` also saves the in-app html-to-image output (`*.h2i.png`), which is what phones share.

## Shipping
Commit, then push to your working branch. Vercel builds a preview URL for every branch; `main` is production (the URL
the owner uses on the phone). When the owner says "ship it", or asks to update the live board, merge to `main`
and push. Remind them to open the site and tap **Share image** (or **Share all 3**).

## Dev-only tools (need the design PDF, which is not committed)
- `tools/slice.py`: re-slices SVG art from `Mimloo_Menu_Final.pdf`.
- `tools/build-font.py`: rebuilds the webfonts from the PDF's embedded Neulis Neue glyphs plus NeulisAlt from `../social`.
- `tools/compare.sh`: overlays renders on the PDF (`ref/diff-N.png`).
Run the Python tools with `uv run --with pymupdf --with fonttools --with brotli python tools/<script>.py`.
