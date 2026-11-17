import type { Dish } from '../data/types';
import { money } from '../lib/format';
import { Icon } from './Art';
import { IconRow } from './IconRow';
import { Photo } from './Photo';

/**
 * Photo on the left, text block to its right. `x`/`y` = left edge of the photo and cap top of the dish name.
 * `w` = total column width; the description wraps inside what is left after the photo.
 */
export function DishCard({ dish, x, y, w, photo = 150 }: { dish: Dish; x: number; y: number; w: number; photo?: number }) {
  const gap = 24;
  const textX = dish.photo ? x + photo + gap : x;
  return (
    <>
      {dish.photo && <Photo name={dish.photo} x={x} y={y - 4} d={photo} />}
      <div className="dish" style={{ left: textX, top: y, width: x + w - textX }}>
        <div className="t dish-name">
          {dish.name}
          {dish.chefsPick && <Icon name="chef-star" w={30} style={{ display: 'inline-block', marginLeft: 12, verticalAlign: -2 }} />}
          <span className="dish-price">{money(dish.price)}</span>
        </div>
        <div className="t dish-desc">{dish.description}</div>
        <IconRow allergens={dish.allergens} nutrition={dish.nutrition} />
      </div>
    </>
  );
}
