import { Art } from '../components/Art';
import { DishCard } from '../components/DishCard';
import { Legend } from '../components/Legend';
import { ParentsNote } from '../components/ParentsNote';
import { SectionHeader } from '../components/SectionHeader';
import { brunch, mains } from '../data/menu';

const ROWS = [196, 418, 640]; // cap top of each dish name
const COLS = [72, 680, 1288]; // left edge of each column (photo)
const COL_W = 568;
const oneLine = (s: string) => s.replace(/\n/g, ' ');

export function BrunchMains() {
  const brunchCols = [brunch.dishes.slice(0, 3), brunch.dishes.slice(3, 6)];
  const header = { y: 50, size: 60, ruleGap: 20, taglineGap: 16, taglineSize: 24 };
  return (
    <>
      {/* Scaled down so the Mains tagline clears the leaves. */}
      <Art name="blob-top-right" x={1600} y={0} w={320} />
      <Art name="wave-1" />

      <SectionHeader title={brunch.title} tagline={oneLine(brunch.tagline)} x={COLS[0]} {...header} />
      <SectionHeader title={mains.title} tagline={oneLine(mains.tagline)} x={COLS[2]} {...header} />

      {brunchCols.map((dishes, c) => dishes.map((d, r) => <DishCard key={d.name} dish={d} x={COLS[c]} y={ROWS[r]} w={COL_W} />))}
      {mains.dishes.map((d, r) => (
        <DishCard key={d.name} dish={d} x={COLS[2]} y={ROWS[r]} w={COL_W} />
      ))}

      <Legend />
      <ParentsNote />
    </>
  );
}
