import type { PickGroup } from '../data/types';
import { Icon } from './Art';

/** Column heading ("Base"), rule ("Pick one"), then items. `x`/`y` = cap top of the heading. */
export function PickList({ group, x, y, indent = 0 }: { group: PickGroup; x: number; y: number; indent?: number }) {
  return (
    <div className="abs" style={{ left: x, top: y }}>
      <div className="t pick-title">{group.title}</div>
      <div className="t pick-rule" style={{ marginLeft: indent }}>
        {group.rule}
      </div>
      <div className="pick-items" style={{ marginLeft: indent }}>
        {group.items.map((item) => (
          <div key={item.name} className="t pick-item">
            {item.mark === 'chefsPick' && <Icon name="chef-star" w={19.7} style={{ position: 'absolute', left: -22.8, top: -4.8 }} />}
            {item.mark === 'vegan' && <Icon name="icon-vegan" h={16.5} style={{ position: 'absolute', left: -16.6, top: -2.5 }} />}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
