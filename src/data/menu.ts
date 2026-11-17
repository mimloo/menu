// ALL menu content lives here. Edit text and prices in this file; layout lives in src/boards.
// Source of truth: Mimloo_Menu_Final.pdf. Never invent items or prices.
import type { Combo, Dish, DrinkTable, PickGroup, Side } from './types';

// Board 1 footer, next to the peach character. Keep it short; baristas explain the details.
export const parentsNote = {
  title: ['A note', 'for parents'],
  lead: 'Kid version:',
  body: 'half portion, half cost!',
};

/* ---------- Board 1: All Day Brunch + Mains ---------- */

export const brunch = {
  title: 'ALL DAY BRUNCH',
  tagline: 'Served all day, every day.\nBreakfast on your time.',
  // Two columns, filled top to bottom: first 3 dishes = left column.
  dishes: [
    {
      name: 'Dippy Eggs',
      photo: 'dippy-eggs',
      price: 18,
      description: 'Jammy Turkish slow-cooked eggs with whipped garlic skyr, confit tomato, herb oil, grilled country bread.',
      allergens: ['gluten', 'dairy', 'egg'],
      nutrition: ['protein', 'goodFats'],
    },
    {
      name: 'Ube Frittata',
      photo: 'ube-frittata',
      price: 17,
      description: 'Heirloom ube and purple sweet potato frittata with caramelized onion, herb oil, fresh parsley, served with lemony dressed greens.',
      allergens: ['dairy', 'egg'],
      nutrition: ['antioxidant', 'protein'],
      chefsPick: true,
    },
    {
      name: 'Cacao Cloud',
      photo: 'cacao-cloud',
      price: 18,
      description: 'Two light and fluffy waffles with whipped coconut cream, raw cacao, toasted muesli, fresh seasonal fruit, agave.',
      allergens: ['gluten', 'treeNut'],
      nutrition: ['antioxidant', 'goodFats'],
    },
    {
      name: 'Migas Breakfast',
      photo: 'migas-breakfast',
      price: 17,
      description: 'Toasted tortilla chips and egg scramble with tomato and onion sofrito with a goddess crema base.',
      allergens: ['egg'],
      nutrition: ['antioxidant', 'protein'],
    },
    {
      name: 'Loco Moco',
      photo: 'loco-moco',
      price: 19,
      description: 'Hawaiian breakfast with jasmine rice, herb turkey patty, mushroom gravy, caramelized onion, whipped sweet potato, scrambled egg, scallion.',
      allergens: ['dairy', 'egg', 'treeNut'],
      nutrition: ['protein', 'antioxidant', 'goodFats'],
    },
    {
      name: 'Sunbutter Toastie',
      photo: 'sunbutter-toastie',
      price: 15,
      description: 'Thick-cut toast with sunbutter, slow-caramelized banana, house berry jam, flaky sea salt.',
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
      photo: 'pibil-sandwich',
      price: 19,
      description: 'Slow-braised achiote pork pibil sandwich on ciabatta with pickled red onion, avocado, fresh cilantro.',
      allergens: ['gluten'],
      nutrition: ['protein', 'goodFats'],
      chefsPick: true,
    },
    {
      name: 'Jackfruit Pillows',
      photo: 'jackfruit-pillows',
      price: 18,
      description: 'Coconut-turmeric mojo jackfruit bao buns with shredded purple cabbage, smoked beet hummus, caramelized onion.',
      allergens: ['gluten', 'treeNut', 'vegan'],
      nutrition: ['antioxidant', 'goodFats'],
    },
    {
      name: 'Sunday Meatballs',
      photo: 'sunday-meatballs',
      price: 19,
      description: 'Turkey meatballs, creamy gravy, house berry jam, cauliflower mash, pickled cucumber, fresh dill.',
      allergens: ['dairy', 'egg'],
      nutrition: ['protein', 'goodFats'],
    },
  ] satisfies Dish[],
};

/* ---------- Board 2: Build Your Own Bowl + Combos + Sensory Friendly ---------- */

export const buildABowl = {
  title: 'BUILD YOUR OWN BOWL',
  price: 17,
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
      description: 'Jasmine rice, grilled chicken, coconut turmeric mojo, pickled cucumber, purple cabbage, scallion.',
      image: 'bowl-mika.png',
    },
    {
      name: 'Pilü',
      price: 18,
      description: 'Tri-color quinoa, soft boiled egg, smoked beet hummus, spinach, pickled red onion, garlic skyr, herb oil, flaky salt.',
      image: 'bowl-pilu.png',
    },
    {
      name: 'Remi',
      price: 18,
      description: 'Brown rice, slow-braised pork pibil, caramelized onion, spiced tomato, goddess crema, pickled red onion, cilantro, lime',
      image: 'bowl-remi.png',
    },
    {
      name: 'Ollie',
      price: 18,
      description: 'Tri-color quinoa, jackfruit carnitas, cauliflower mash, spinach, sunny lemon vinaigrette, avocado',
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
  // 2 per row, 3 rows. Each tile shows a round photo (public/photos/<photo>.jpg).
  items: [
    { name: 'Beet hummus\n& veggies', photo: 'beet-hummus-veggies', price: 8 },
    { name: 'Russet potato\nhash', photo: 'russet-potato-hash', price: 7 },
    { name: 'Toasted muesli\n& milk', photo: 'toasted-muesli-milk', price: 7 },
    { name: 'Seasonal\nFruit', photo: 'seasonal-fruit', price: 7 },
    { name: 'Bread &\nhouse jam', photo: 'bread-house-jam', price: 6 },
    { name: 'Pick any three\nsides for', photo: 'toddler-tapas', note: 'a perfect little plate', price: 17, highlight: true },
  ] satisfies Side[],
};

export const freshlyBaked = {
  title: 'FRESHLY-BAKED',
  tagline: 'Small-batch, made the same morning',
  // Shown as a pill under the tagline; set to '' when pastries are back.
  soldOut: '',
  // Round photos under the tagline (up to 5). Shopify bakery products have no images yet: upload them, add the
  // image URLs to scripts/photos.json, run `npm run photos`, then list them here, e.g.
  // { photo: 'blueberry-crumb-muffin', label: 'Blueberry crumb muffin' }
  photos: [] as { photo: string; label: string }[],
};

export const sips = {
  title: 'SIPS & POURS',
  tagline: 'Small-batch coffee, tea, and a few extras',
  // Round photos next to the title (files in public/photos, from Shopify via `npm run photos`).
  photos: [
    { photo: 'latte', label: 'Latte' },
    { photo: 'houjicha', label: 'Houjicha' },
    { photo: 'iced-tea', label: 'Iced tea' },
  ],
};

export const coffee: DrinkTable = {
  title: 'Coffee',
  tagline: 'Roasted with care',
  sizes: ['8oz', '12oz', '16oz'],
  drinks: [
    { name: 'Cold brew', prices: [null, 5.8, 7.15] },
    { name: 'Americano', prices: [4.8, 5.0, 6.35] },
    { name: 'Cappuccino', prices: [6.4, 7.75, null] },
    { name: 'Flat white', prices: [6.4, 7.75, null] },
    { name: 'Latte', prices: [null, 6.4, 7.75] },
  ],
  footer: [
    { name: 'Espresso shot', price: 4.4 },
    { name: 'Macchiato', price: 4.8 },
    { name: 'Cortado', price: 5.6 },
  ],
};

export const tea: DrinkTable = {
  title: 'Tea & more',
  tagline: 'Something soothing',
  sizes: ['8oz', '12oz', '16oz'],
  drinks: [
    { name: 'Matcha', prices: [null, 7.45, 8.8] },
    { name: 'Houjicha', prices: [null, 7.1, 8.45], chefsPick: true },
    { name: 'Masala chai', prices: [null, 7.1, 8.45] },
    { name: 'Thai tea', prices: [null, 7.1, 8.45] },
    { name: 'Turmeric ginger chai', prices: [null, 7.1, 8.45] },
    { name: 'London fog', prices: [null, 7.1, 8.45] },
    { name: 'Hot chocolate', prices: [5.95, 7.25, null] },
    { name: 'Hot tea', prices: [null, 5.6, null], flavors: ['Peppermint', 'Chamomile', 'Earl Grey', 'Jade Green'] },
    { name: 'Iced tea', prices: [null, 5.6, null], flavors: ['Black', 'Peach', 'Elderberry Hibiscus'] },
  ],
};

export const addOns = {
  title: 'Add-ons',
  tagline: 'Make it yours',
  price: [0.5, 1] as const, // shown as a range: $0.50 – $1.00
  items: ['Extra espresso shot', 'Flavored syrup', 'Make it decaf', 'Whipped cream'],
};
