import type { Allergen, Nutrition } from '../data/types';
import { Icon } from './Art';
import { ALLERGEN_H, NUTRITION_H, allergenIcon, nutritionIcon } from './IconRow';

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

const heading: React.CSSProperties = { fontSize: 18, letterSpacing: '0.04em' };
const row: React.CSSProperties = { position: 'absolute', left: 22, display: 'flex', alignItems: 'center', gap: 22, height: 26, whiteSpace: 'nowrap' };
const item = (icon: React.ReactNode, text: string) => (
  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {icon}
    <span className="t reg ink" style={{ fontSize: 19, whiteSpace: 'nowrap' }}>
      {text}
    </span>
  </div>
);

/** "Decode your plate" key, bottom right of board 1. `x`/`y` = top-left of the box. */
export function Legend({ x = 1124, y = 872, w = 724, h = 180 }: { x?: number; y?: number; w?: number; h?: number }) {
  return (
    <div className="abs" style={{ left: x, top: y, width: w, height: h, border: '2.5px solid var(--mint)', borderRadius: 16, background: 'var(--cream)' }}>
      <div className="abs" style={{ left: 0, right: 0, top: -11, display: 'flex', justifyContent: 'center' }}>
        <div className="t" style={{ fontSize: 26, padding: '0 16px', background: 'var(--cream)' }}>
          DECODE YOUR PLATE
        </div>
      </div>

      <div className="t abs ink" style={{ ...heading, left: 22, top: 34 }}>
        ALLERGENS
      </div>
      <div style={{ ...row, top: 58 }}>{allergens.map(([k, t]) => item(<Icon name={allergenIcon[k]} h={ALLERGEN_H} />, t))}</div>

      <div className="t abs ink" style={{ ...heading, left: 22, top: 106 }}>
        NUTRITION
      </div>
      <div style={{ ...row, top: 130 }}>{nutrition.map(([k, t]) => item(<Icon name={nutritionIcon[k]} h={NUTRITION_H} />, t))}</div>

      <div className="abs" style={{ right: 22, top: 26, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="chef-star" w={30} />
        <span className="t ink" style={heading}>
          CHEF’S PICK
        </span>
      </div>
    </div>
  );
}
