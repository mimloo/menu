import { Art } from '../components/Art';
import { DishCard } from '../components/DishCard';
import { Legend } from '../components/Legend';
import { ParentsNote } from '../components/ParentsNote';
import { SectionHeader } from '../components/SectionHeader';
import { brunch, mains } from '../data/menu';

const ROWS = [255.5, 452.6, 656.8]; // cap top of each dish name
const COLS = [
  { x: 89, priceX: 445.6 },
  { x: 621, priceX: 1041.2 },
  { x: 1254, priceX: 1635.3 },
];

export function BrunchMains() {
  const brunchCols = [brunch.dishes.slice(0, 3), brunch.dishes.slice(3, 6)];
  return (
    <>
      <Art name="blob-top-right" />
      <Art name="wave-1" />

      <SectionHeader title={brunch.title} tagline={brunch.tagline} x={88.7} y={62.4} ruleGap={27.2} taglineGap={16.3} taglineSize={21.2} />
      <SectionHeader title={mains.title} tagline={mains.tagline} x={1262.5} y={62.4} ruleGap={27.2} taglineGap={16.3} taglineSize={21.2} />

      {brunchCols.map((dishes, c) =>
        dishes.map((d, r) => <DishCard key={d.name} dish={d} x={COLS[c].x} y={ROWS[r]} priceX={COLS[c].priceX} />),
      )}
      {mains.dishes.map((d, r) => (
        <DishCard key={d.name} dish={d} x={COLS[2].x} y={ROWS[r]} priceX={COLS[2].priceX} />
      ))}

      <Legend />
      <ParentsNote />
    </>
  );
}
