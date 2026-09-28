import type { Dish } from '../data/types';
import { money } from '../lib/format';
import { Icon } from './Art';
import { IconRow } from './IconRow';

/** `x`/`y` = left edge and cap top of the dish name. `priceX` = left edge of the price column. */
export function DishCard({ dish, x, y, priceX }: { dish: Dish; x: number; y: number; priceX: number }) {
  return (
    <div className="dish" style={{ left: x, top: y }}>
      <div className="t dish-name">
        {dish.name}
        {dish.chefsPick && <Icon name="chef-star" w={27} style={{ display: 'inline-block', marginLeft: 13, verticalAlign: -2 }} />}
      </div>
      <div className="t dish-price" style={{ left: priceX - x }}>
        {money(dish.price)}
      </div>
      <div className="t dish-sub">{dish.subtitle}</div>
      <div className="t dish-desc">{dish.description}</div>
      <IconRow allergens={dish.allergens} nutrition={dish.nutrition} style={{ left: 0, top: 129 }} />
    </div>
  );
}
