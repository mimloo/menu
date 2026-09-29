import type { DrinkTable as Table } from '../data/types';
import { money } from '../lib/format';
import { Icon } from './Art';

const ROW = 30.5;
const FLAVOR_ROW = 19; // extra height for a flavors line
const COL_W = 52;

interface Props {
  table: Table;
  x: number;
  ruleWidth: number;
  /** Right edge of each size column (prices are right-aligned, sizes centered). */
  colRights: number[];
  footerRight?: number;
}

export function DrinkTable({ table, x, ruleWidth, colRights, footerRight }: Props) {
  const rowsTop = 340.8;
  const tops: number[] = [];
  let y = rowsTop;
  for (const d of table.drinks) {
    tops.push(y);
    y += ROW + (d.flavors?.length ? FLAVOR_ROW : 0);
  }
  const footerRule = y;
  return (
    <>
      <div className="t abs tight" style={{ left: x, top: 217.4, fontSize: 37.8 }}>
        {table.title}
      </div>
      <div className="t abs" style={{ left: x, top: 258.5, fontSize: 18.9 }}>
        {table.tagline}
      </div>
      {table.sizes.map((s, i) => (
        <div key={s} className="t abs" style={{ left: colRights[i] - COL_W - 10, width: COL_W + 20, top: 291.4, fontSize: 20, textAlign: 'center' }}>
          {s}
        </div>
      ))}
      <div className="abs" style={{ left: x, top: 320.9, width: ruleWidth, height: 2, background: 'var(--rule)' }} />

      {table.drinks.map((d, r) => {
        const top = tops[r];
        return (
          <div key={d.name}>
            {d.chefsPick && <Icon name="chef-star" w={22.3} style={{ position: 'absolute', left: x - 28.9, top: top - 2.6 }} />}
            <div className="t abs" style={{ left: x, top, fontSize: 20 }}>
              {d.name}
            </div>
            {d.flavors?.length ? (
              <div className="t abs reg" style={{ left: x, top: top + 23, fontSize: 14.4 }}>
                {d.flavors.join(' · ')}
              </div>
            ) : null}
            {d.prices.map((p, i) =>
              p == null ? null : (
                <div key={i} className="t abs reg" style={{ left: colRights[i] - 100, width: 100, top, fontSize: 20, textAlign: 'right' }}>
                  {money(p)}
                </div>
              ),
            )}
          </div>
        );
      })}

      {table.footer && (
        <>
          <div className="abs" style={{ left: x, top: footerRule, width: ruleWidth, height: 2, background: 'var(--rule)' }} />
          <div className="t abs" style={{ left: x, top: footerRule + 18.8, fontSize: 20 }}>
            {table.footer.name}
          </div>
          <div className="t abs reg" style={{ left: (footerRight ?? colRights.at(-1)!) - 100, width: 100, top: footerRule + 18.8, fontSize: 20, textAlign: 'right' }}>
            {money(table.footer.price)}
          </div>
        </>
      )}
    </>
  );
}
