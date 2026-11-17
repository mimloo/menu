import type { PickGroup } from '../data/types';
import { Icon } from './Art';

/** Column heading ("Base"), rule ("Pick one"), then items. `x`/`y` = cap top of the heading. */
export function PickList({ group, x, y }: { group: PickGroup; x: number; y: number }) {
  return (
    <div className="abs" style={{ left: x, top: y }}>
      <div className="t pick-title">{group.title}</div>
      <div className="t pick-rule">{group.rule}</div>
      <div className="pick-items">
        {group.items.map((item) => (
          <div key={item.name} className="t pick-item">
            {item.mark === 'chefsPick' && <Icon name="chef-star" w={26} style={{ position: 'absolute', left: -32, top: -6 }} />}
            {item.mark === 'vegan' && <Icon name="icon-vegan" h={22} style={{ position: 'absolute', left: -24, top: -3 }} />}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
