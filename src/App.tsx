import { useCallback, useEffect, useRef, useState } from 'react';
import { Board } from './components/Board';
import { boards, type BoardId } from './boards';
import { exportBoard, fileFor, shareFiles } from './lib/exportBoard';

type Status = 'rendering' | 'ready' | 'error';

export function App() {
  const single = new URLSearchParams(location.search).get('board');
  if (single) {
    // Bare, unscaled board for scripts/export.mjs.
    const b = boards.find((b) => b.id === single);
    return b ? (
      <Board id={b.id}>
        <b.Component />
      </Board>
    ) : null;
  }
  return <Gallery />;
}

function Gallery() {
  const nodes = useRef<Partial<Record<BoardId, HTMLDivElement | null>>>({});
  const [files, setFiles] = useState<Partial<Record<BoardId, File>>>({});
  const [status, setStatus] = useState<Status>('rendering');
  const [error, setError] = useState('');

  // Pre-render every PNG up front: iOS only allows the share sheet right after a tap,
  // so the image must already exist when the button is pressed.
  const render = useCallback(async () => {
    setStatus('rendering');
    try {
      const out: Partial<Record<BoardId, File>> = {};
      for (const b of boards) {
        const node = nodes.current[b.id];
        if (node) out[b.id] = fileFor(await exportBoard(node), b.id);
      }
      setFiles(out);
      setStatus('ready');
    } catch (e) {
      setError(String(e));
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    render();
  }, [render]);

  const all = boards.map((b) => files[b.id]).filter((f): f is File => !!f);

  return (
    <main className="app">
      <header className="app-head">
        <div>
          <h1>Mimloo menu boards</h1>
          <p>{status === 'rendering' ? 'Preparing images…' : status === 'error' ? `Export failed: ${error}` : '3840 × 2160 PNG · tap to share or save'}</p>
        </div>
        <button className="btn primary" disabled={status !== 'ready'} onClick={() => shareFiles(all)}>
          Share all 3
        </button>
      </header>

      {boards.map((b) => {
        const file = files[b.id];
        return (
          <section key={b.id} className="board-card">
            <div className="board-card-head">
              <h2>{b.title}</h2>
              <div className="actions">
                {file && (
                  <a className="btn" href={URL.createObjectURL(file)} target="_blank" rel="noreferrer">
                    Open PNG
                  </a>
                )}
                <button className="btn primary" disabled={!file} onClick={() => file && shareFiles([file])}>
                  Share image
                </button>
              </div>
            </div>
            <Board fit id={b.id} ref={(el) => void (nodes.current[b.id] = el)}>
              <b.Component />
            </Board>
          </section>
        );
      })}

      <footer className="app-foot">
        <button className="btn" onClick={render} disabled={status === 'rendering'}>
          Re-render images
        </button>
      </footer>
    </main>
  );
}
