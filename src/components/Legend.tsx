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

const FONT = 22;
const item = (icon: React.ReactNode, text: string) => (
  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
    {icon}
    <span className="t reg ink" style={{ fontSize: FONT, whiteSpace: 'nowrap' }}>
      {text}
    </span>
  </div>
);
const divider = <span style={{ width: 2, height: 30, background: 'var(--mint)', flex: 'none' }} />;

/** "Decode your plate" key: one row, allergens | nutrition | chef's pick. `x`/`y` = top-left of the box. */
export function Legend({ x = 300, y = 990, w = 1548, h = 64 }: { x?: number; y?: number; w?: number; h?: number }) {
  return (
    <div className="abs" style={{ left: x, top: y, width: w, height: h, border: '2.5px solid var(--mint)', borderRadius: 14, background: 'var(--cream)' }}>
      <div className="abs" style={{ left: 0, right: 0, top: -11, display: 'flex', justifyContent: 'center' }}>
        <div className="t" style={{ fontSize: 24, padding: '0 16px', background: 'var(--cream)', borderRadius: 6 }}>
          DECODE YOUR PLATE
        </div>
      </div>
      <div className="abs" style={{ inset: 0, padding: '4px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {allergens.map(([k, t]) => item(<Icon name={allergenIcon[k]} h={27} />, t))}
        {divider}
        {nutrition.map(([k, t]) => item(<Icon name={nutritionIcon[k]} h={21} />, t))}
        {divider}
        {item(<Icon name="chef-star" w={30} />, 'chef’s pick')}
      </div>
    </div>
  );
}
