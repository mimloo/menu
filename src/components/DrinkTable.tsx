import type { DrinkTable as Table } from '../data/types';
import { money } from '../lib/format';
import { Icon } from './Art';

const SIZE = 24; // row text
const ROW = 37;
const FLAVOR_ROW = 26; // extra height for a flavors line
const PRICE_W = 100;
const FLAVOR_LINE = 22; // each extra flavors line
const FLAVORS_PER_LINE = 4; // longer lists wrap into evenly split lines
const flavorLines = (f: string[]) => {
  const n = Math.ceil(f.length / FLAVORS_PER_LINE);
  const per = Math.ceil(f.length / n);
  return Array.from({ length: n }, (_, i) => f.slice(i * per, (i + 1) * per).join(' · '));
};
const GROUP_H = 42; // group heading cap top -> first row cap top
const GROUP_GAP = 16; // extra space above every group after the first

interface Props {
  table: Table;
  x: number;
  ruleWidth: number;
  /** Right edge of each size column (prices are right-aligned; size labels are centered over the price). */
  colRights: number[];
}

export function DrinkTable({ table, x, ruleWidth, colRights }: Props) {
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
    y += ROW + (d.flavors?.length ? FLAVOR_ROW + (flavorLines(d.flavors).length - 1) * FLAVOR_LINE : 0);
  });
  const footerRule = y - 4;
  // Only the first block of rows (up to the second group) uses the size columns. Later groups and the footer
  // print their price right after the name, so a single-size drink never looks like it sits under a column.
  const split = table.drinks.findIndex((d, r) => r > 0 && d.group);
  const colCount = split < 0 ? table.drinks.length : split;
  const usedSizes = table.sizes.map((_, i) => table.drinks.slice(0, colCount).some((d) => d.prices[i] != null));
  const inline = (prices: (number | null)[], sized: boolean) => (
    <span className="reg" style={{ marginLeft: 18 }}>
      {prices.map((p, i) =>
        p == null ? null : (
          <span key={i} style={{ marginRight: 16 }}>
            {sized && <span className="ink" style={{ fontSize: 17, marginRight: 7 }}>{table.sizes[i]}</span>}
            {money(p, true)}
          </span>
        ),
      )}
    </span>
  );
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
      {table.sizes.map((s, i) => !usedSizes[i] ? null : (
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
              {r >= colCount && inline(d.prices, true)}
            </div>
            {d.flavors?.length ? (
              <div className="t abs reg ink" style={{ left: x, top: top + 29, fontSize: 17, lineHeight: `${FLAVOR_LINE}px`, whiteSpace: 'pre' }}>
                {flavorLines(d.flavors).join('\n')}
              </div>
            ) : null}
            {r < colCount && d.prices.map((p, i) => (p == null ? null : price(p, colRights[i], top, i)))}
          </div>
        );
      })}

      {table.footer?.length ? (
        <>
          <div className="abs" style={{ left: x, top: footerRule, width: ruleWidth, height: 2, background: 'var(--rule)' }} />
          {table.footer.map((f, i) => (
            <div key={f.name}>
              <div className="t abs" style={{ left: x, top: footerRule + 20 + i * ROW, fontSize: SIZE, whiteSpace: 'nowrap' }}>
                {f.name}
                {inline([f.price], false)}
              </div>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
}
