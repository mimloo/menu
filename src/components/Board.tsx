import { forwardRef, useLayoutEffect, useRef, useState } from 'react';

export const BOARD_W = 1920;
export const BOARD_H = 1080;

/** The fixed 1920x1080 canvas. With `fit`, it is scaled down to the width of its container. */
export const Board = forwardRef<HTMLDivElement, { children: React.ReactNode; fit?: boolean; id?: string }>(function Board(
  { children, fit, id },
  ref,
) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (!fit || !wrap.current) return;
    const el = wrap.current;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / BOARD_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  const canvas = (
    <div ref={ref} className="board" data-board={id} style={fit ? { transform: `scale(${scale})`, transformOrigin: '0 0' } : undefined}>
      {children}
    </div>
  );
  if (!fit) return canvas;
  return (
    <div ref={wrap} className="board-fit" style={{ height: BOARD_H * scale }}>
      {canvas}
    </div>
  );
});
