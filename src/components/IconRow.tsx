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

/** Icon heights in board px. Allergen glyphs are line art and need to be taller than the filled nutrition glyphs. */
export const ALLERGEN_H = 27;
export const NUTRITION_H = 21;

/** Allergens | nutrition, under every dish. (Portion icons are gone: every dish has a kid version.) */
export function IconRow({ allergens, nutrition }: { allergens: Allergen[]; nutrition: Nutrition[] }) {
  return (
    <div className="icon-row">
      {allergens.length > 0 && (
        <div className="grp">
          {allergens.map((a) => (
            <Icon key={a} name={allergenIcon[a]} h={ALLERGEN_H} />
          ))}
        </div>
      )}
      {allergens.length > 0 && nutrition.length > 0 && <span className="div" />}
      {nutrition.length > 0 && (
        <div className="grp">
          {nutrition.map((n) => (
            <Icon key={n} name={nutritionIcon[n]} h={NUTRITION_H} />
          ))}
        </div>
      )}
    </div>
  );
}
