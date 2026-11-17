import type { DrinkTable as Table } from '../data/types';
import { money } from '../lib/format';
import { Icon } from './Art';

const SIZE = 24; // row text
const ROW = 37;
const FLAVOR_ROW = 26; // extra height for a flavors line
const PRICE_W = 100;
const GROUP_H = 42; // group heading cap top -> first row cap top
const GROUP_GAP = 16; // extra space above every group after the first

interface Props {
  table: Table;
  x: number;
  ruleWidth: number;
  /** Right edge of each size column (prices are right-aligned; size labels are centered over the price). */
  colRights: number[];
  footerRight?: number;
}

export function DrinkTable({ table, x, ruleWidth, colRights, footerRight }: Props) {
  const rowsTop = 326;
  const tops: number[] = [];
  let y = rowsTop;
  const groupTops: number[] = [];
  table.drinks.forEach((d, r) => {
    if (d.group) {
      if (r > 0) y += GROUP_GAP;
      groupTops[r] = y;
      y += GROUP_H;
    }
    tops.push(y);
    y += ROW + (d.flavors?.length ? FLAVOR_ROW : 0);
  });
  const footerRule = y - 4;
  const price = (p: number, right: number, top: number, key?: number) => (
    <div key={key} className="t abs reg" style={{ left: right - PRICE_W, width: PRICE_W, top, fontSize: SIZE, textAlign: 'right' }}>
      {money(p, true)}
    </div>
  );
  return (
    <>
      <div className="t abs tight" style={{ left: x, top: 206, fontSize: 36 }}>
        {table.title}
      </div>
      <div className="t abs ink" style={{ left: x, top: 248, fontSize: 20 }}>
        {table.tagline}
      </div>
      {table.sizes.map((s, i) => (
        <div key={s} className="t abs ink" style={{ left: colRights[i] - 60, width: 70, top: 282, fontSize: 20, textAlign: 'center' }}>
          {s}
        </div>
      ))}
      <div className="abs" style={{ left: x, top: 306, width: ruleWidth, height: 2, background: 'var(--rule)' }} />

      {table.drinks.map((d, r) => {
        const top = tops[r];
        return (
          <div key={d.name}>
            {d.group && (
              <div className="t abs" style={{ left: x, top: groupTops[r], display: 'flex', alignItems: 'baseline', gap: 14, whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: 19, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{d.group.title}</span>
                {d.group.note && <span className="reg ink" style={{ fontSize: 17 }}>{d.group.note}</span>}
              </div>
            )}
            {d.chefsPick && <Icon name="chef-star" w={26} style={{ position: 'absolute', left: x - 33, top: top - 4 }} />}
            <div className="t abs" style={{ left: x, top, fontSize: SIZE, whiteSpace: 'nowrap' }}>
              {d.name}
            </div>
            {d.flavors?.length ? (
              <div className="t abs reg ink" style={{ left: x, top: top + 29, fontSize: 17, whiteSpace: 'nowrap' }}>
                {d.flavors.join(' · ')}
              </div>
            ) : null}
            {d.prices.map((p, i) => (p == null ? null : price(p, colRights[i], top, i)))}
          </div>
        );
      })}

      {table.footer?.length ? (
        <>
          <div className="abs" style={{ left: x, top: footerRule, width: ruleWidth, height: 2, background: 'var(--rule)' }} />
          {table.footer.map((f, i) => (
            <div key={f.name}>
              <div className="t abs" style={{ left: x, top: footerRule + 20 + i * ROW, fontSize: SIZE }}>
                {f.name}
              </div>
              {price(f.price, footerRight ?? colRights.at(-1)!, footerRule + 20 + i * ROW)}
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}
