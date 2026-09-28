import { Art } from '../components/Art';
import { DrinkTable } from '../components/DrinkTable';
import { ParentsNote } from '../components/ParentsNote';
import { SectionHeader } from '../components/SectionHeader';
import { addOns, coffee, freshlyBaked, lilSides, sips, tea } from '../data/menu';
import { money } from '../lib/format';

const TILE_X = [72.2, 345.7, 619.2];
const TILE_Y = [236.1, 404.8];

export function SidesSips() {
  return (
    <>
      <Art name="wave-3" />
      <Art name="plant-blades" x={1158.7} y={892} />
      <Art name="plant-sprout" x={1350.3} y={876.4} />
      <Art name="plant-blades" x={1590.9} y={962.2} />
      <Art name="plant-sprout" x={1690.6} y={881.9} style={{ transform: 'scaleX(-1)' }} />

      {/* Lil' sides */}
      <SectionHeader title={lilSides.title} tagline={lilSides.tagline} x={73.1} y={63.4} size={70.2} ruleGap={29.1} taglineGap={22.7} ruleX={5.4} taglineX={3.8} />
      <Art name="cloud-little-size" />
      <div className="t abs" style={{ left: 671.2, top: 105.1, fontSize: 21.6 }}>
        {lilSides.badge.title}
      </div>
      <div className="t abs reg" style={{ left: 669.4, top: 135.4, fontSize: 14.4 }}>
        {lilSides.badge.subtitle}
      </div>
      {lilSides.items.map((s, i) => (
        <div
          key={s.name}
          className="card"
          style={{
            left: TILE_X[i % 3],
            top: TILE_Y[Math.floor(i / 3)],
            width: 261.6,
            height: 157.3,
            background: s.highlight ? 'var(--mint)' : 'transparent',
            borderColor: s.highlight ? 'var(--mint)' : undefined,
          }}
        >
          <div className="t abs tight" style={{ left: 19.6, top: 18, fontSize: 30, lineHeight: '33.3px' }}>
            {s.name}
          </div>
          {s.note && (
            <div className="t abs tight" style={{ left: 142, top: 60.4, fontSize: 17, lineHeight: '21.3px' }}>
              {s.note}
            </div>
          )}
          <div className="t abs reg tight" style={{ left: 18.5, top: 116.7, fontSize: 22.7 }}>
            {money(s.price)}
          </div>
        </div>
      ))}
      <Art name="little-face" />

      {/* Freshly-baked */}
      <SectionHeader title={freshlyBaked.title} tagline={freshlyBaked.tagline} x={68.8} y={683.8} size={70.2} ruleGap={25} taglineGap={23.4} ruleX={5.5} taglineX={3.9} />

      {/* Sips & pours */}
      <SectionHeader title={sips.title} tagline={sips.tagline} x={992} y={62.2} size={70.2} ruleGap={28} taglineGap={19.2} ruleX={0} />
      <DrinkTable table={coffee} x={992} ruleWidth={371.6} colRights={[1221.8, 1291.5, 1360.9]} footerRight={1355.6} />
      <DrinkTable table={tea} x={1446.6} ruleWidth={405} colRights={[1708.9, 1777.8, 1851.8]} />

      {/* Add-ons */}
      <div className="card" style={{ left: 976.5, top: 660.2, width: 876.9, height: 186.3, background: 'transparent' }} />
      <div className="t abs tight" style={{ left: 992, top: 679.7, fontSize: 42.9 }}>
        {addOns.title}
      </div>
      <div className="t abs" style={{ left: 992, top: 727.8, fontSize: 21.4 }}>
        {addOns.tagline}
      </div>
      <div className="t abs reg tight" style={{ left: 992, top: 792.9, fontSize: 30.6 }}>
        {money(addOns.price)}
      </div>
      {addOns.items.map((a, i) => (
        <div key={a} className="t abs" style={{ left: 1446.6, top: 679.9 + i * 30.6, fontSize: 20 }}>
          {a}
        </div>
      ))}

      <ParentsNote />
    </>
  );
}
