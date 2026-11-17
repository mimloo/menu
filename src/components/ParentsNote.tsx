import { parentsNote } from '../data/menu';
import art from '../lib/art.json';
import { Art } from './Art';

const PILL_H = 42;
const c = art['parents-character'];
const centerY = c.y + c.h / 2; // pill is vertically centered on the character

/** Board 1 footer: peach cone character ("A note for parents") with one pill to its right. */
export function ParentsNote() {
  return (
    <>
      <div className="pill" style={{ left: 245.7, top: centerY - PILL_H / 2, height: PILL_H, borderRadius: 4, padding: '0 18px 0 46px', display: 'flex', alignItems: 'center', background: 'var(--panel)' }}>
        <div className="t" style={{ fontSize: 22, whiteSpace: 'nowrap' }}>
          {parentsNote.pill}
        </div>
      </div>
      <Art name="parents-character" />
      <div className="t abs tight" style={{ left: 72.2, width: 199.8, top: 964.6, fontSize: 28.3, lineHeight: '24.8px', color: 'var(--on-peach)', textAlign: 'center' }}>
        {parentsNote.title.join('\n')}
      </div>
    </>
  );
}
