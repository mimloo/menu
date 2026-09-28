import { Art } from '../components/Art';
import { PickList } from '../components/PickList';
import { SectionHeader } from '../components/SectionHeader';
import { buildABowl, combos, sensory } from '../data/menu';
import { money } from '../lib/format';

const PICK_X = [73.7, 313.9, 582.9, 854.2];
const CARD_X = [70.9, 321.6, 572.4, 823.1];

function Pill({ text, x, y, w, pad }: { text: string; x: number; y: number; w: number; pad: number }) {
  return (
    <>
      <div className="pill" style={{ left: x, top: y, width: w }} />
      <div className="t abs reg" style={{ left: x + pad, top: y + 9.9, fontSize: 21.6 }}>
        {text}
      </div>
    </>
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
      <SectionHeader title={buildABowl.title} tagline={buildABowl.tagline} x={74.3} y={62.5} size={64.8} ruleGap={27.7} taglineGap={16.7} />
      <div className="t abs reg" style={{ left: 894.7, top: 68, fontSize: 52.2 }}>
        {money(buildABowl.price)}
      </div>
      <Pill text={buildABowl.extra} x={728.3} y={140} w={324} pad={11} />
      {buildABowl.groups.map((g, i) => (
        <PickList key={g.title} group={g} x={PICK_X[i]} y={215.2} indent={i === 3 ? 4 : 0} />
      ))}

      {/* Combos */}
      <SectionHeader title={combos.title} tagline={combos.tagline} x={64.1} y={528.2} size={64.8} ruleGap={26.3} taglineGap={16.6} ruleX={8.9} taglineX={7.9} />
      {combos.items.map((c, i) => (
        <div key={c.name} className="card" style={{ left: CARD_X[i], top: 666.2, width: 240.7, height: 344.4 }}>
          <div className="t abs tight" style={{ left: 15.3, top: 16.3, fontSize: 25 }}>
            {c.name}
          </div>
          <div className="t abs reg" style={{ left: 155, top: 18.5, fontSize: 22.5 }}>
            {money(c.price)}
          </div>
          <p className="t abs reg" style={{ left: 15.7, top: 61.6, fontSize: 13.5, lineHeight: '16.2px' }}>
            {c.description}
          </p>
          <img src={`/assets/${c.image}`} alt="" className="art" style={{ left: 19, top: 142.5, width: 198, height: 198 }} />
        </div>
      ))}

      {/* Sensory friendly */}
      <div className="abs" style={{ left: 1167.8, top: 53.5, width: 637.4, height: 757, background: 'var(--panel)', borderRadius: 16 }} />
      <SectionHeader
        title={sensory.title}
        tagline={sensory.tagline}
        x={1236.2}
        y={120}
        size={70.2}
        titleLineHeight={67.5}
        ruleGap={37}
        taglineGap={16.6}
      />
      <div className="t abs reg" style={{ left: 1625.9, top: 129.1, fontSize: 52.2 }}>
        {money(sensory.price)}
      </div>
      <Art name="sensory-character" />
      <PickList group={sensory.groups[0]} x={1239.2} y={377.8} />
      <PickList group={sensory.groups[1]} x={1419.9} y={377.8} />
      <Pill text={sensory.extra} x={1234.3} y={667.7} w={318.4} pad={7.4} />
      <Art name="house-cloud" />
    </>
  );
}
