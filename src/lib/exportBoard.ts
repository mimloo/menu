import { toBlob } from 'html-to-image';
import { BOARD_H, BOARD_W } from '../components/Board';

const SCALE = 2; // 1920x1080 canvas -> 3840x2160 PNG

async function ready(node: HTMLElement) {
  await document.fonts.ready;
  await Promise.all(
    [...node.querySelectorAll('img')].map((img) => (img.complete ? img.decode().catch(() => {}) : new Promise((r) => (img.onload = img.onerror = r)))),
  );
}

/** Renders a board node to a 3840x2160 PNG. */
export async function exportBoard(node: HTMLElement): Promise<Blob> {
  await ready(node);
  const opts = {
    width: BOARD_W,
    height: BOARD_H,
    pixelRatio: SCALE,
    canvasWidth: BOARD_W,
    canvasHeight: BOARD_H,
    style: { transform: 'none' },
    cacheBust: false,
  };
  // Safari sometimes drops images/fonts on the first pass; render twice and keep the second.
  await toBlob(node, opts);
  const blob = await toBlob(node, opts);
  if (!blob) throw new Error('Export failed');
  return blob;
}

export function fileFor(blob: Blob, id: string) {
  return new File([blob], `mimloo-${id}.png`, { type: 'image/png' });
}

/** Opens the phone share sheet (Save Image / share to an app). Falls back to a download. */
export async function shareFiles(files: File[]) {
  if (navigator.canShare?.({ files })) {
    try {
      await navigator.share({ files });
      return;
    } catch (e) {
      if ((e as Error).name === 'AbortError') return;
    }
  }
  for (const f of files) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(f);
    a.download = f.name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
  }
}
