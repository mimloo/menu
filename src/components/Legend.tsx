import { Art, type ArtName } from './Art';

const allergens: [ArtName, string, number, number][] = [
  // icon, label, icon x, label x
  ['icon-gluten', 'gluten', 1161.2, 1177],
  ['icon-dairy', 'dairy', 1238.1, 1261.7],
  ['icon-egg', 'egg', 1317.2, 1336.7],
  ['icon-tree-nut', 'tree nut', 1381.4, 1404.9],
  ['icon-vegan', 'vegan', 1475.5, 1497.3],
];
const nutrition: [ArtName, string, number, number][] = [
  ['icon-protein', 'protein', 1161.1, 1179.2],
  ['icon-whole-grain', 'whole grain', 1246.2, 1265.2],
  ['icon-antioxidant', 'antioxidant', 1353.7, 1376.5],
  ['icon-good-fats', 'good fats', 1467.9, 1488.3],
  ['icon-probiotic', 'probiotic', 1566.6, 1592.3],
];

const label = (text: string, x: number, y: number, size = 12.4) => (
  <div className="t abs" style={{ left: x, top: y, fontSize: size, letterSpacing: size < 13 ? '-0.015em' : undefined }}>
    {text}
  </div>
);

/** "Decode your plate" key, bottom right of board 1. */
export function Legend() {
  return (
    <div style={{ color: 'var(--green-legend)' }}>
      <div className="card" style={{ left: 1138.8, top: 881.9, width: 689, height: 168, borderRadius: 16, borderColor: 'var(--mint)' }} />
      <div className="abs" style={{ left: 1281.1, top: 859.3, width: 288.9, height: 44.2, background: 'var(--cream)' }} />
      {label('DECODE YOUR PLATE', 1288.7, 872.9, 26.5)}

      {label('ALLERGENS', 1158.5, 909.5, 18.6)}
      {allergens.map(([icon, text, ix, lx]) => (
        <span key={icon}>
          <Art name={icon} x={ix} />
          {label(text, lx, 945.5)}
        </span>
      ))}

      {label('NUTRITION', 1158.5, 978.8, 18.6)}
      {nutrition.map(([icon, text, ix, lx]) => (
        <span key={icon}>
          <Art name={icon} x={ix} />
          {label(text, lx, 1013.2)}
        </span>
      ))}

      {label('PORTIONS', 1587.2, 909.5, 18.6)}
      <Art name="portion-grownup" />
      {label('grown-ups', 1629.5, 945.5)}
      <Art name="portion-little" />
      {label('little ones', 1745.2, 945.5)}

      {label('CHEF’S PICK!', 1692.1, 978.8, 18.6)}
      <Art name="chef-star" />
    </div>
  );
}
