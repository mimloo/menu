import type { Allergen, Nutrition } from '../data/types';
import { Icon } from './Art';
import { allergenIcon, nutritionIcon } from './IconRow';

const allergens: [Allergen, string][] = [
  ['gluten', 'gluten'],
  ['dairy', 'dairy'],
  ['egg', 'egg'],
  ['treeNut', 'tree nut'],
  ['vegan', 'vegan'],
];
const nutrition: [Nutrition, string][] = [
  ['protein', 'protein'],
  ['wholeGrain', 'whole grain'],
  ['antioxidant', 'antioxidant'],
  ['goodFats', 'good fats'],
  ['probiotic', 'probiotic'],
];

const HEAD_W = 128; // width of the ALLERGENS / NUTRITION column
const item = (icon: React.ReactNode, text: string) => (
  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
    {icon}
    <span className="t" style={{ fontSize: 22, whiteSpace: 'nowrap' }}>
      {text}
    </span>
  </div>
);
const row = (heading: string, top: number, items: React.ReactNode[], end?: React.ReactNode) => (
  <div className="abs" style={{ left: 24, right: 24, top, height: 30, display: 'flex', alignItems: 'center', gap: 24 }}>
    <span className="t" style={{ width: HEAD_W, fontSize: 22, letterSpacing: '0.02em', flex: 'none' }}>
      {heading}
    </span>
    {items}
    {end && <div style={{ marginLeft: 'auto' }}>{end}</div>}
  </div>
);

/** "Decode your plate" key, bottom right of board 1: allergens (+ chef's pick) and nutrition, one row each. */
export function Legend({ x = 800, y = 894, w = 1048, h = 128 }: { x?: number; y?: number; w?: number; h?: number }) {
  return (
    <div className="abs" style={{ left: x, top: y, width: w, height: h, color: 'var(--green-legend)', border: '2.5px solid var(--mint)', borderRadius: 16, background: 'var(--cream)' }}>
      <div className="abs" style={{ left: 0, right: 0, top: -12, display: 'flex', justifyContent: 'center' }}>
        <div className="t" style={{ fontSize: 28, padding: '0 18px', background: 'var(--cream)' }}>
          DECODE YOUR PLATE
        </div>
      </div>
      {row(
        'ALLERGENS',
        30,
        allergens.map(([k, t]) => item(<Icon name={allergenIcon[k]} h={27} />, t)),
        // A pill, so it reads as its own thing rather than a sixth allergen.
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 38, padding: '0 5px 0 10px', borderRadius: 8, background: 'var(--mint)', color: 'var(--teal)' }}>
          <Icon name="chef-star" w={28} />
          <span className="t" style={{ fontSize: 22, whiteSpace: 'nowrap' }}>
            chef’s pick
          </span>
        </div>,
      )}
      {row(
        'NUTRITION',
        76,
        nutrition.map(([k, t]) => item(<Icon name={nutritionIcon[k]} h={21} />, t)),
      )}
    </div>
  );
}
