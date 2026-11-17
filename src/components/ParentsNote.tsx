import { parentsNote } from '../data/menu';
import { Art } from './Art';

/** Shared bottom-left footer: peach cone character, "A note for parents", text, pill. `w` = width of the text. */
export function ParentsNote({ w = 800 }: { w?: number }) {
  return (
    <>
      <Art name="parents-character" />
      <div className="t abs tight" style={{ left: 72.2, width: 199.8, top: 964.6, fontSize: 28.3, lineHeight: '24.8px', color: 'var(--on-peach)', textAlign: 'center' }}>
        {parentsNote.title.join('\n')}
      </div>
      <p className="t abs reg ink" style={{ left: 292, top: 930, width: w, fontSize: 21, lineHeight: '27px', textWrap: 'pretty' }}>
        <span style={{ fontWeight: 500 }}>{parentsNote.lead}</span> {parentsNote.body}
      </p>
      <div className="abs" style={{ left: 292, top: 1006, height: 40, padding: '0 16px', display: 'flex', alignItems: 'center', borderRadius: 6, background: 'var(--panel)' }}>
        <div className="t ink" style={{ fontSize: 20, letterSpacing: '0.02em' }}>
          {parentsNote.pill}
        </div>
      </div>
    </>
  );
}
