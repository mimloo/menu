import { Art } from '../components/Art';
import { DrinkTable } from '../components/DrinkTable';
import { Photo } from '../components/Photo';
import { SectionHeader } from '../components/SectionHeader';
import { addOns, coffee, freshlyBaked, lilSides, sips, tea } from '../data/menu';
import { money } from '../lib/format';

// Sips & pours on the left, Lil' sides + Freshly-baked on the right (pastries and plants decorate the bottom right).
const SIPS = 72; // left edge of the Sips & pours column
const SIDES = 1000; // left edge of the Lil' sides column
// Lil' sides: 2 columns x 3 rows of tiles, each with a round photo on the left.
const TILE = { x: [SIDES, SIDES + 432], y: [206, 356, 506], w: 416, h: 136, photo: 108 };
const FRESH_Y = 708; // cap top of the Freshly-baked title
// Freshly-baked: cut-out pastry photos (generated, public/assets/pastry-*.png) sitting on the wave at the bottom right.
// Drawn back to front; w is the board width, height follows the image.
const PASTRIES = [
  { name: 'muffin', x: 1634, y: 770, w: 172 },
  { name: 'scone', x: 1492, y: 872, w: 200 },
  { name: 'cookie', x: 1730, y: 828, w: 162 },
];
const ADD = { x: SIPS - 16, y: 912, w: 876, h: 120 }; // Add-ons box, sitting on the wave
const header = { y: 50, size: 60, ruleGap: 20, taglineGap: 16, taglineSize: 24 };

export function SidesSips() {
  return (
    <>
      <Art name="wave-3" />
      <Art name="plant-blades" x={1158.7} y={892} />
      <Art name="plant-sprout" x={1350.3} y={876.4} />

      {/* Lil' sides */}
      <SectionHeader title={lilSides.title} tagline={lilSides.tagline} x={SIDES} {...header} />
      <Art name="cloud-little-size" x={SIDES + 468} y={22} w={360} />
      <div className="t abs" style={{ left: SIDES + 595, top: 98, fontSize: 23 }}>
        {lilSides.badge.title}
      </div>
      <div className="t abs reg ink" style={{ left: SIDES + 593, top: 131, fontSize: 17 }}>
        {lilSides.badge.subtitle}
      </div>
      {lilSides.items.map((s, i) => {
        const left = TILE.x[i % 2];
        const top = TILE.y[Math.floor(i / 2)];
        const pad = (TILE.h - TILE.photo) / 2;
        const textX = pad + TILE.photo + 20;
        return (
          <div
            key={s.name}
            className="card"
            style={{
              left,
              top,
              width: TILE.w,
              height: TILE.h,
              background: s.highlight ? 'var(--mint)' : 'transparent',
              borderColor: s.highlight ? 'var(--mint)' : undefined,
            }}
          >
            {s.photo && <Photo name={s.photo} x={pad - 2.5} y={pad - 2.5} d={TILE.photo} style={s.highlight ? { boxShadow: 'none' } : undefined} />}
            <div className="t abs tight" style={{ left: textX, top: 20, fontSize: 27, lineHeight: '31px', color: s.highlight ? 'var(--teal)' : undefined }}>
              {s.name}
            </div>
            <div className="t abs reg tight" style={{ left: textX, top: 92, fontSize: 28, color: s.highlight ? 'var(--teal)' : undefined }}>
              {money(s.price)}
              {s.note && (
                <span style={{ fontSize: 19, marginLeft: 14, letterSpacing: 0 }}>{s.note}</span>
              )}
            </div>
          </div>
        );
      })}
      <Art name="little-face" x={TILE.x[1] + TILE.w - 34} y={TILE.y[2] + TILE.h - 26} />

      {/* Freshly-baked */}
      <SectionHeader title={freshlyBaked.title} tagline={freshlyBaked.tagline} x={SIDES} y={FRESH_Y} size={60} ruleGap={20} taglineGap={16} taglineSize={24} />
      {freshlyBaked.soldOut && (
        <div className="pill" style={{ left: SIDES + 488, top: FRESH_Y + 72, padding: '0 14px', display: 'flex', alignItems: 'center' }}>
          <div className="t reg ink" style={{ fontSize: 21 }}>
            {freshlyBaked.soldOut}
          </div>
        </div>
      )}
      {PASTRIES.map((p) => (
        <img
          key={p.name}
          src={`/assets/pastry-${p.name}.png`}
          alt=""
          className="abs"
          style={{ left: p.x, top: p.y, width: p.w, filter: 'drop-shadow(0 10px 14px rgba(52, 90, 95, 0.28))' }}
        />
      ))}
      {/* Up to 3 bakery photos to the right of the title, clear of the plants below. */}
      {freshlyBaked.photos.slice(0, 3).map((p, i) => {
        const d = 104;
        const x = SIDES + 500 + i * 116;
        return (
          <div key={p.photo}>
            <Photo name={p.photo} x={x} y={FRESH_Y - 14} d={d} />
            <div className="t abs ink" style={{ left: x - 20, width: d + 40, top: FRESH_Y - 14 + d + 16, fontSize: 17, textAlign: 'center' }}>
              {p.label}
            </div>
          </div>
        );
      })}

      {/* Sips & pours */}
      <SectionHeader title={sips.title} tagline={sips.tagline} x={SIPS} {...header} ruleX={0} />
      {sips.photos.map((p, i) => {
        const d = 104;
        const x = SIPS + 522 + i * 116;
        return (
          <div key={p.photo}>
            <Photo name={p.photo} x={x} y={26} d={d} />
            <div className="t abs ink" style={{ left: x - 20, width: d + 40, top: 146, fontSize: 17, textAlign: 'center' }}>
              {p.label}
            </div>
          </div>
        );
      })}
      <DrinkTable table={coffee} x={SIPS} ruleWidth={400} colRights={[SIPS + 236, SIPS + 316, SIPS + 396]} />
      <DrinkTable table={tea} x={SIPS + 450} ruleWidth={408} colRights={[SIPS + 698, SIPS + 778, SIPS + 858]} />

      {/* Add-ons: a compact key on the green field, styled like board 1's "Decode your plate". */}
      <div className="abs" style={{ left: ADD.x, top: ADD.y, width: ADD.w, height: ADD.h, border: '2.5px solid var(--mint)', borderRadius: 16, background: 'var(--cream)' }}>
        <div className="abs" style={{ left: 0, right: 0, top: -12, display: 'flex', justifyContent: 'center' }}>
          <div className="t" style={{ fontSize: 28, padding: '0 18px', background: 'var(--cream)', textTransform: 'uppercase' }}>
            {addOns.title}
          </div>
        </div>
        <div className="t abs ink" style={{ left: 24, top: 32, fontSize: 21 }}>
          {addOns.tagline}
        </div>
        <div className="t abs reg tight" style={{ left: 24, top: 70, fontSize: 28 }}>
          {addOns.price.map((p) => money(p, true)).join(' – ')}
        </div>
        {addOns.items.map((a, i) => (
          <div key={a} className="t abs" style={{ left: i < 2 ? 292 : 584, top: 32 + (i % 2) * 40, fontSize: 23 }}>
            {a}
          </div>
        ))}
      </div>
    </>
  );
}
