// ALL menu content lives here. Edit text and prices in this file; layout lives in src/boards.
// Source of truth: Mimloo_Menu_Final.pdf. Never invent items or prices.
import type { Combo, Dish, DrinkTable, PickGroup, Side } from './types';

export const parentsNote = {
  title: ['A note', 'for parents'],
  lead: 'Every dish has a kid version:',
  body: 'smaller portion, components served separated,\nmilder seasoning, easier-to-eat shapes. Just order, and we’ll plate it for the littles.',
  pill: 'HALF PORTION, HALF COST!',
};

/* ---------- Board 1: All Day Brunch + Mains ---------- */

export const brunch = {
  title: 'ALL DAY BRUNCH',
  tagline: 'Served all day, every day.\nBreakfast on your time.',
  // Two columns, filled top to bottom: first 3 dishes = left column.
  dishes: [
    {
      name: 'Dippy Eggs',
      price: 18,
      subtitle: 'Jammy turkish slow-cooked eggs',
      description: 'Jammy Turkish slow-cooked eggs with whipped garlic skyr,\nconfit tomato, herb oil, grilled country bread.',
      allergens: ['gluten', 'dairy', 'egg'],
      nutrition: ['protein', 'wholeGrain', 'goodFats'],
    },
    {
      name: 'Ube Frittata',
      price: 17,
      subtitle: 'Heirloom ube and purple sweet potato',
      description: 'Heirloom ube and purple sweet potato frittata with caramelized\nonion, herb oil, fresh parsley, served with lemony dressed greens.',
      allergens: ['dairy', 'egg'],
      nutrition: ['antioxidant', 'protein'],
      chefsPick: true,
    },
    {
      name: 'Cacao Cloud',
      price: 18,
      subtitle: 'Two light and fluffy waffles',
      description: 'Two light and fluffy waffles with whipped coconut\ncream, raw cacao, toasted muesli, fresh seasonal fruit, agave.',
      allergens: ['gluten', 'treeNut'],
      nutrition: ['antioxidant', 'goodFats'],
    },
    {
      name: 'Migas Breakfast',
      price: 17,
      subtitle: 'Traditional migas con huevos',
      description: 'Toasted tortilla chips and egg scramble with tomato\nand onion sofrito with a goddess crema base.',
      allergens: ['dairy', 'egg'],
      nutrition: ['antioxidant', 'protein'],
    },
    {
      name: 'Loco Moco',
      price: 19,
      subtitle: 'Hawaiian breakfast bowl, mimloo style',
      description: 'Hawaiian breakfast with jasmine rice, herb turkey patty, mushroom\ngravy, caramelized onion, whipped sweet potato, scrambled egg, scallion.',
      allergens: ['egg'],
      nutrition: ['antioxidant', 'goodFats'],
    },
    {
      name: 'Sunbutter Toastie',
      price: 15,
      subtitle: 'Thick-cut toast, slow-caramelized banana',
      description: 'Thick-cut toast with sunbutter, slow-caramelized banana,\nhouse berry jam, flaky sea salt, hemp seed.',
      allergens: ['gluten'],
      nutrition: ['antioxidant', 'goodFats'],
    },
  ] satisfies Dish[],
};

export const mains = {
  title: 'MAINS',
  tagline: 'Heartier plates\nfor the bigger appetite.',
  dishes: [
    {
      name: 'Pibil Sandwich',
      price: 19,
      subtitle: 'Slow-braised achiote pork pibil sandwich',
      description: 'Slow-braised achiote pork pibil sandwich on ciabatta with pickled\nred onion, avocado, fresh cilantro.',
      allergens: ['gluten', 'dairy'],
      nutrition: ['protein', 'goodFats'],
      chefsPick: true,
    },
    {
      name: 'Jackfruit Pillows',
      price: 18,
      subtitle: 'Coconut-turmeric mojo jackfruit bao buns',
      description: 'Coconut-turmeric mojo jackfruit bao buns with shredded purple cabbage,\nsmoked beet hummus, caramelized onion, toasted hemp seed.',
      allergens: ['treeNut'],
      nutrition: ['wholeGrain', 'antioxidant', 'goodFats'],
    },
    {
      name: 'Sunday Meatballs',
      price: 19,
      subtitle: 'Turkey meatballs in creamy gravy',
      description: 'Turkey meatballs, creamy gravy, house berry jam, cauliflower mash,\npickled cucumber, fresh dill.',
      allergens: ['dairy', 'egg'],
      nutrition: ['protein', 'goodFats'],
    },
  ] satisfies Dish[],
};

/* ---------- Board 2: Build Your Own Bowl + Combos + Sensory Friendly ---------- */

export const buildABowl = {
  title: 'BUILD YOUR OWN BOWL',
  price: 16,
  tagline: 'A hearty, full-size bowl made the way you like it.',
  extra: '$0.50 for each extra topping',
  groups: [
    {
      title: 'Base',
      rule: 'Pick one',
      items: [{ name: 'Jasmine rice' }, { name: 'Tri-color quinoa', mark: 'chefsPick' }, { name: 'Brown rice' }],
    },
    {
      title: 'Protein',
      rule: 'Pick one',
      items: [
        { name: 'Turkey meatball' },
        { name: 'Pork pibil' },
        { name: 'Jackfruit carnitas', mark: 'vegan' },
        { name: 'Grilled chicken' },
        { name: 'Scrambled egg' },
        { name: 'Soft egg' },
        { name: 'Avocado', mark: 'vegan' },
      ],
    },
    {
      title: 'Sauce',
      rule: 'Pick one',
      items: [
        { name: 'Goddess crema' },
        { name: 'Garlic skyr' },
        { name: 'Coconut-turmeric mojo', mark: 'vegan' },
        { name: 'Sunny lemon vinaigrette' },
      ],
    },
    {
      title: 'Toppings',
      rule: 'Pick two',
      items: [
        { name: 'Spinach' },
        { name: 'Caramelized onion' },
        { name: 'Pickled red onion' },
        { name: 'Pickled cucumber' },
        { name: 'Shredded purple cabbage' },
        { name: 'Hemp seed' },
        { name: 'Sweet potato puree' },
        { name: 'Cauliflower mash' },
        { name: 'Russet potato hash' },
        { name: 'Smoked beet hummus' },
      ],
    },
  ] satisfies PickGroup[],
};

export const combos = {
  title: 'OR GRAB A COMBO',
  tagline: 'A delicious bowl already put together for you. Same portions, none of the decisions.',
  // Bowl photos come from Shopify ("Build Your Own Bowl" variants) - they are canonical.
  items: [
    {
      name: 'Mika',
      price: 18,
      description: 'Jasmine rice, grilled chicken,\ncoconut turmeric mojo, pickled\ncucumber, purple cabbage,\nhemp seed, scallion.',
      image: 'bowl-mika.png',
    },
    {
      name: 'Pilü',
      price: 18,
      description: 'Tri-color quinoa, soft boiled\negg, smoked beet hummus,\nspinach, pickled red onion,\ngarlic skyr, herb oil, flaky salt.',
      image: 'bowl-pilu.png',
    },
    {
      name: 'Remi',
      price: 18,
      description: 'Brown rice, slow-braised pork\npibil, caramelized onion,\nspiced tomato, goddess\ncrema, pickled red onion,\ncilantro, lime',
      image: 'bowl-remi.png',
    },
    {
      name: 'Ollie',
      price: 18,
      description: 'Tri-color quinoa, jackfruit\ncarnitas, cauliflower mash,\nspinach, sunny lemon\nvinaigrette, avocado,\nhemp seed',
      image: 'bowl-ollie.png',
    },
  ] satisfies Combo[],
};

export const sensory = {
  title: 'SENSORY\nFRIENDLY',
  price: 8,
  tagline: 'A calm plate for the littles.\nPlain, separated, and just right.',
  extra: '$0.50 for each extra topping',
  groups: [
    {
      title: 'Protein',
      rule: 'Pick one',
      items: [{ name: 'Scrambled egg' }, { name: 'Grilled chicken' }, { name: 'Turkey patty' }, { name: 'Avocado' }],
    },
    {
      title: 'Sides',
      rule: 'Pick two',
      items: [
        { name: 'Jasmine rice' },
        { name: 'Soft bread' },
        { name: 'Brown rice' },
        { name: 'Gluten free bread' },
        { name: 'Corn tortilla' },
        { name: 'Skyr (yogurt)' },
        { name: 'Sweet potato puree' },
        { name: 'Cauliflower mash' },
      ],
    },
  ] satisfies PickGroup[],
};

/* ---------- Board 3: Lil' Sides + Freshly-Baked + Sips & Pours ---------- */

export const lilSides = {
  title: 'LIL’ SIDES',
  tagline: 'Served à la carte.',
  badge: { title: 'Little size!', subtitle: 'tapas-style for tiny hands' },
  // 3 per row.
  items: [
    { name: 'Beet hummus\n& veggies', price: 8 },
    { name: 'Russet potato\nhash', price: 7 },
    { name: 'Toasted muesli\n& milk', price: 7 },
    { name: 'Seasonal\nFruit', price: 7 },
    { name: 'Bread &\nhouse jam', price: 6 },
    { name: 'Pick any three\nsides for', note: 'a perfect\nlittle plate', price: 17, highlight: true },
  ] satisfies Side[],
};

export const freshlyBaked = {
  title: 'FRESHLY-BAKED',
  tagline: 'Small-batch, made the same morning',
};

export const sips = {
  title: 'SIPS & POURS',
  tagline: 'Small-batch coffee, tea, and a few extras',
};

export const coffee: DrinkTable = {
  title: 'Coffee',
  tagline: 'Roasted with care',
  sizes: ['8oz', '12oz', '16oz'],
  drinks: [
    { name: 'Drip coffee', prices: [null, 4.15, 5.5] },
    { name: 'Cold brew', prices: [null, 5.8, 7.15] },
    { name: 'Americano', prices: [null, 5.0, 6.35] },
    { name: 'Cortado', prices: [5.6, null, null] },
    { name: 'Macchiato', prices: [4.8, null, null] },
    { name: 'Cappuccino', prices: [6.4, 7.75, null] },
    { name: 'Flat white', prices: [6.6, 7.95, null] },
    { name: 'Latte', prices: [6.4, 7.75, null] },
  ],
  footer: { name: 'Single espresso shot', price: 4.4 },
};

export const tea: DrinkTable = {
  title: 'Tea & more',
  tagline: 'Something soothing',
  sizes: ['8oz', '12oz', '16oz'],
  drinks: [
    { name: 'Matcha latte', prices: [null, 7.45, 8.8] },
    { name: 'Houjicha', prices: [null, 7.1, 8.45], chefsPick: true },
    { name: 'Masala chai', prices: [null, 7.1, 8.45] },
    { name: 'London fog', prices: [null, 7.1, 8.45] },
    { name: 'Hot chocolate', prices: [5.95, 7.25, null] },
    { name: 'Hot tea', prices: [null, 4.75, null], flavors: ['Peppermint', 'Chamomile', 'Earl Grey', 'Jade Green'] },
    { name: 'Iced tea', prices: [null, 4.75, null], flavors: ['Black', 'Peach', 'Hibiscus'] },
    { name: 'Hibiscus limeade', prices: [null, 7.1, 8.45] },
    { name: 'Thai tea', prices: [null, 7.1, 8.45] },
  ],
};

export const addOns = {
  title: 'Add-ons',
  tagline: 'Make it yours',
  price: 1,
  items: ['Extra espresso shot', 'Flavored syrup', 'Make it decaf', 'Whipped cream'],
};
