import { Art } from '../components/Art';
import { PickList } from '../components/PickList';
import { SectionHeader } from '../components/SectionHeader';
import { buildABowl, combos, sensory } from '../data/menu';
import { money } from '../lib/format';

const PICK_X = [72, 302, 560, 858];
const CARD = { x: 72, y: 700, w: 260, h: 356, gap: 14 };
const PANEL = { x: 1196, y: 50, w: 656, h: 770 };

/** Mint pill sized to its text. `x`/`y` = top-left. */
function Pill({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <div className="pill" style={{ left: x, top: y, padding: '0 14px', display: 'flex', alignItems: 'center' }}>
      <div className="t reg ink" style={{ fontSize: 21, whiteSpace: 'nowrap' }}>
        {text}
      </div>
    </div>
  );
}

export function BuildABowl() {
  return (
    <>
      <Art name="wave-2" />
      <Art name="plant-blades" x={1208.6} y={892.3} />
      <Art name="plant-sprout" x={1400.3} y={876.7} />
      <Art name="plant-blades" x={1641} y={962.5} />
      <Art name="plant-sprout" x={1740.7} y={882.2} style={{ transform: 'scaleX(-1)' }} />

      {/* Build your own */}
      <SectionHeader title={buildABowl.title} tagline={buildABowl.tagline} x={72} y={50} size={60} ruleGap={20} taglineGap={16} taglineSize={24} />
      <div className="t abs reg" style={{ left: 816, top: 54, fontSize: 52 }}>
        {money(buildABowl.price)}
      </div>
      <Pill text={buildABowl.extra} x={728} y={116} />
      {buildABowl.groups.map((g, i) => (
        <PickList key={g.title} group={g} x={PICK_X[i]} y={200} />
      ))}

      {/* Combos */}
      <SectionHeader title={combos.title} tagline={combos.tagline} x={72} y={590} size={52} ruleGap={16} taglineGap={14} taglineSize={22} />
      {combos.items.map((c, i) => (
        <div key={c.name} className="card" style={{ left: CARD.x + i * (CARD.w + CARD.gap), top: CARD.y, width: CARD.w, height: CARD.h }}>
          <div className="t abs tight" style={{ left: 16, top: 18, fontSize: 30, whiteSpace: 'nowrap' }}>
            {c.name}
            <span className="reg" style={{ marginLeft: 14 }}>
              {money(c.price)}
            </span>
          </div>
          <p className="t abs reg ink" style={{ left: 16, top: 62, width: CARD.w - 28, fontSize: 19.5, lineHeight: '24px' }}>
            {c.description}
          </p>
          <img src={`/assets/${c.image}`} alt="" className="art" style={{ left: (CARD.w - 5 - 150) / 2, top: CARD.h - 5 - 152, width: 150, height: 150 }} />
        </div>
      ))}

      {/* Sensory friendly */}
      <div className="abs" style={{ left: PANEL.x, top: PANEL.y, width: PANEL.w, height: PANEL.h, background: 'var(--panel)', borderRadius: 16 }} />
      <SectionHeader title={sensory.title} tagline={sensory.tagline} x={1250} y={110} size={66} titleLineHeight={64} ruleGap={28} taglineGap={16} taglineSize={24} />
      <div className="t abs reg" style={{ left: 1712, top: 116, fontSize: 52 }}>
        {money(sensory.price)}
      </div>
      <Art name="sensory-character" x={1700} y={206} />
      <PickList group={sensory.groups[0]} x={1250} y={366} />
      <PickList group={sensory.groups[1]} x={1474} y={366} />
      <Pill text={sensory.extra} x={1246} y={712} />
      <Art name="house-cloud" x={1560} y={636} />
    </>
  );
}
