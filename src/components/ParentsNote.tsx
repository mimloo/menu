import { parentsNote } from '../data/menu';
import { Art } from './Art';

/** Board 1 footer: peach cone character with "A note for parents", plus one short line to its right. */
export function ParentsNote({ y = 930 }: { y?: number }) {
  return (
    <>
      <Art name="parents-character" />
      <div className="t abs tight" style={{ left: 72.2, width: 199.8, top: 964.6, fontSize: 28.3, lineHeight: '24.8px', color: 'var(--on-peach)', textAlign: 'center' }}>
        {parentsNote.title.join('\n')}
      </div>
      <p className="t abs ink" style={{ left: 300, top: y, fontSize: 32, whiteSpace: 'nowrap' }}>
        {parentsNote.lead} <span className="reg">{parentsNote.body}</span>
      </p>
    </>
  );
}
