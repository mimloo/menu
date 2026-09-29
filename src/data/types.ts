export type Allergen = 'gluten' | 'dairy' | 'egg' | 'treeNut' | 'vegan';
export type Nutrition = 'protein' | 'wholeGrain' | 'antioxidant' | 'goodFats' | 'probiotic';

export interface Dish {
  name: string;
  price: number;
  subtitle: string;
  description: string;
  allergens: Allergen[];
  nutrition: Nutrition[];
  chefsPick?: boolean;
}

/** A line in a pick-list. `mark` draws a small icon to the left of the item. */
export interface ListItem {
  name: string;
  mark?: 'chefsPick' | 'vegan';
}

export interface PickGroup {
  title: string;
  rule: string; // "Pick one", "Pick two"...
  items: ListItem[];
}

export interface Combo {
  name: string;
  price: number;
  description: string;
  image: string; // file in public/assets
}

export interface Side {
  name: string; // use \n to force a line break
  price: number;
  note?: string; // small text after the name, e.g. "a perfect\nlittle plate"
  highlight?: boolean;
}

/** Drink row; prices line up with the table's size columns (8oz, 12oz, 16oz). null = not offered. */
export interface Drink {
  name: string;
  prices: (number | null)[];
  chefsPick?: boolean;
  /** Small line under the name, e.g. tea flavors. */
  flavors?: string[];
}

export interface DrinkTable {
  title: string;
  tagline: string;
  sizes: string[];
  drinks: Drink[];
  /** Row under a divider at the bottom of the table, e.g. single espresso shot. */
  footer?: { name: string; price: number };
}
