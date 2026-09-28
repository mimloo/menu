import { parentsNote } from '../data/menu';
import { Art } from './Art';

/** Shared bottom-left footer: pill, peach cone character, "A note for parents". */
export function ParentsNote() {
  return (
    <>
      <div className="pill" style={{ left: 245.7, top: 1004.4, width: 318.4, background: 'var(--panel)' }} />
      <div className="t abs" style={{ left: 292.4, top: 1017.4, fontSize: 18 }}>
        {parentsNote.pill}
      </div>
      <Art name="parents-character" />
      <div className="t abs tight" style={{ left: 72.2, width: 199.8, top: 964.6, fontSize: 28.3, lineHeight: '24.8px', color: 'var(--on-peach)', textAlign: 'center' }}>
        {parentsNote.title.join('\n')}
      </div>
      <p className="t abs reg" style={{ left: 290.7, top: 955.4, fontSize: 18.6, lineHeight: '22.4px', letterSpacing: '-0.006em' }}>
        <span style={{ fontWeight: 500 }}>{parentsNote.lead}</span> {parentsNote.body}
      </p>
    </>
  );
}
