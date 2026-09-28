import art from '../lib/art.json';

export type ArtName = keyof typeof art;

interface Props {
  name: ArtName;
  /** Position on the board. Defaults to where the art sits in the original PDF. */
  x?: number;
  y?: number;
  /** Width in board px; height follows the aspect ratio. Defaults to the PDF size. */
  w?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Positioned illustration sliced from the PDF (public/assets/<name>.svg). */
export function Art({ name, x, y, w, className = 'art', style }: Props) {
  const a = art[name];
  const width = w ?? a.w;
  return (
    <img
      src={`/assets/${name}.svg`}
      alt=""
      className={className}
      style={{ left: x ?? a.x, top: y ?? a.y, width, height: (width * a.h) / a.w, ...style }}
    />
  );
}

/** Inline (non-positioned) icon, sized by width or height. */
export function Icon({ name, w, h, style }: { name: ArtName; w?: number; h?: number; style?: React.CSSProperties }) {
  const a = art[name];
  const width = w ?? (h ? (h * a.w) / a.h : a.w);
  return (
    <img
      src={`/assets/${name}.svg`}
      alt=""
      style={{ display: 'block', flex: 'none', width, height: (width * a.h) / a.w, ...style }}
    />
  );
}
