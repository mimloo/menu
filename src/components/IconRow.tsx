import type { Allergen, Nutrition } from '../data/types';
import { Icon, type ArtName } from './Art';

export const allergenIcon: Record<Allergen, ArtName> = {
  gluten: 'icon-gluten',
  dairy: 'icon-dairy',
  egg: 'icon-egg',
  treeNut: 'icon-tree-nut',
  vegan: 'icon-vegan',
};

export const nutritionIcon: Record<Nutrition, ArtName> = {
  protein: 'icon-protein',
  wholeGrain: 'icon-whole-grain',
  antioxidant: 'icon-antioxidant',
  goodFats: 'icon-good-fats',
  probiotic: 'icon-probiotic',
};

/** Portions | allergens | nutrition, as shown under every dish. */
export function IconRow({ allergens, nutrition, style }: { allergens: Allergen[]; nutrition: Nutrition[]; style?: React.CSSProperties }) {
  return (
    <div className="icon-row" style={style}>
      <div className="grp portions">
        <Icon name="portion-grownup" />
        <Icon name="portion-little" />
      </div>
      {allergens.length > 0 && (
        <>
          <span className="div" />
          <div className="grp">
            {allergens.map((a) => (
              <Icon key={a} name={allergenIcon[a]} />
            ))}
          </div>
        </>
      )}
      {nutrition.length > 0 && (
        <>
          <span className="div" />
          <div className="grp">
            {nutrition.map((n) => (
              // The legend protein star is smaller than the one used under dishes.
              <Icon key={n} name={nutritionIcon[n]} h={n === 'protein' ? 17.9 : undefined} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
