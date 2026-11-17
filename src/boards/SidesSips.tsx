import { Art } from '../components/Art';
import { DrinkTable } from '../components/DrinkTable';
import { ParentsNote } from '../components/ParentsNote';
import { Photo } from '../components/Photo';
import { SectionHeader } from '../components/SectionHeader';
import { addOns, coffee, freshlyBaked, lilSides, sips, tea } from '../data/menu';
import { money } from '../lib/format';

// Lil' sides: 2 columns x 3 rows of tiles, each with a round photo on the left.
const TILE = { x: [72, 504], y: [206, 356, 506], w: 416, h: 136, photo: 108 };
const header = { y: 50, size: 60, ruleGap: 20, taglineGap: 16, taglineSize: 24 };

export function SidesSips() {
  return (
    <>
      <Art name="wave-3" />
      <Art name="plant-blades" x={1158.7} y={892} />
      <Art name="plant-sprout" x={1350.3} y={876.4} />
      <Art name="plant-blades" x={1590.9} y={962.2} />
      <Art name="plant-sprout" x={1690.6} y={881.9} style={{ transform: 'scaleX(-1)' }} />

      {/* Lil' sides */}
      <SectionHeader title={lilSides.title} tagline={lilSides.tagline} x={72} {...header} />
      <Art name="cloud-little-size" x={540} y={22} w={360} />
      <div className="t abs" style={{ left: 667, top: 98, fontSize: 23 }}>
        {lilSides.badge.title}
      </div>
      <div className="t abs reg ink" style={{ left: 665, top: 131, fontSize: 17 }}>
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
      <SectionHeader title={freshlyBaked.title} tagline={freshlyBaked.tagline} x={72} y={696} size={60} ruleGap={20} taglineGap={16} taglineSize={24} />
      {freshlyBaked.soldOut && (
        <div className="pill" style={{ left: 560, top: 768, padding: '0 14px', display: 'flex', alignItems: 'center' }}>
          <div className="t reg ink" style={{ fontSize: 21 }}>
            {freshlyBaked.soldOut}
          </div>
        </div>
      )}

      {/* Sips & pours */}
      <SectionHeader title={sips.title} tagline={sips.tagline} x={992} {...header} ruleX={0} />
      {sips.photos.map((p, i) => {
        const d = 104;
        const x = 1514 + i * 116;
        return (
          <div key={p.photo}>
            <Photo name={p.photo} x={x} y={26} d={d} />
            <div className="t abs ink" style={{ left: x - 20, width: d + 40, top: 146, fontSize: 17, textAlign: 'center' }}>
              {p.label}
            </div>
          </div>
        );
      })}
      <DrinkTable table={coffee} x={992} ruleWidth={400} colRights={[1228, 1308, 1388]} />
      <DrinkTable table={tea} x={1442} ruleWidth={408} colRights={[1690, 1770, 1850]} />

      {/* Add-ons */}
      <div className="card" style={{ left: 976, top: 712, width: 876, height: 150, background: 'transparent' }} />
      <div className="t abs tight" style={{ left: 1000, top: 736, fontSize: 40 }}>
        {addOns.title}
      </div>
      <div className="t abs ink" style={{ left: 1000, top: 786, fontSize: 21 }}>
        {addOns.tagline}
      </div>
      <div className="t abs reg tight" style={{ left: 1000, top: 822, fontSize: 28 }}>
        {addOns.price.map((p) => money(p, true)).join(' – ')}
      </div>
      {addOns.items.map((a, i) => (
        <div key={a} className="t abs" style={{ left: i < 2 ? 1300 : 1580, top: 762 + (i % 2) * 44, fontSize: 23 }}>
          {a}
        </div>
      ))}

      <ParentsNote />
    </>
  );
}
