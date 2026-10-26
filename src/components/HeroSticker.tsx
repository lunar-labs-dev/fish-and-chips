import { lazy, Suspense, useEffect, useRef, useState } from 'react';

// WebGL sticker code only downloads once the badge is ready to become a sticker.
const StickerPeel = lazy(() => import('./StickerPeel'));

const FONT = "'Victor Mono Variable', monospace";

// Paints the lemon badge in the brand font, as the image StickerPeel turns into a WebGL sticker.
function drawBadge(year: number) {
  const size = 480;
  const r = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d')!;
  const css = getComputedStyle(document.documentElement);
  const color = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;

  g.fillStyle = '#ffffff';
  g.beginPath();
  g.arc(r, r, r - 4, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = color('--color-fc-lemon', '#F4C443');
  g.beginPath();
  g.arc(r, r, r - 26, 0, Math.PI * 2);
  g.fill();

  g.fillStyle = color('--color-fc-ink', '#231F20');
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `600 46px ${FONT}`;
  g.fillText('Fried fresh', r, r - 86);
  g.font = `700 124px ${FONT}`;
  g.fillText(String(year), r, r + 4);
  g.font = `italic 600 46px ${FONT}`;
  g.fillText('to now', r, r + 94);
  return canvas.toDataURL('image/png');
}

type Sticker = { src: string; width: number; x: number; y: number };

// The static badge renders first (and stays for no JS or no WebGL); once fonts load it becomes a peelable sticker.
export function HeroSticker({ year }: { year: number }) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [sticker, setSticker] = useState<Sticker | null>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    const parent = badge?.parentElement;
    if (!badge || !parent || !document.createElement('canvas').getContext('webgl2')) return;
    let alive = true;
    Promise.all([`600 46px ${FONT}`, `700 124px ${FONT}`, `italic 600 46px ${FONT}`].map((f) => document.fonts.load(f))).then(() => {
      if (!alive) return;
      const b = badge.getBoundingClientRect();
      const p = parent.getBoundingClientRect();
      setSticker({
        src: drawBadge(year),
        width: badge.offsetWidth,
        x: b.left + b.width / 2 - (p.left + p.width / 2),
        y: b.top + b.height / 2 - (p.top + p.height / 2),
      });
    });
    return () => {
      alive = false;
    };
  }, [year]);

  return (
    <>
      <div
        ref={badgeRef}
        aria-hidden="true"
        className={`absolute -top-6 -left-2 grid size-28 -rotate-12 place-items-center rounded-full bg-fc-lemon text-center font-ns-victor text-fc-ink shadow-lg md:-left-8 md:size-36 ${
          sticker ? 'invisible' : ''
        }`}
      >
        <span className="text-xs leading-tight font-semibold md:text-sm">
          Fried fresh
          <br />
          <span className="text-2xl font-bold md:text-3xl">{year}</span>
          <br />
          <span className="italic">to now</span>
        </span>
      </div>
      {sticker && (
        <Suspense fallback={null}>
          <StickerPeel
            imageSrc={sticker.src}
            width={sticker.width}
            rotate={-12}
            initialPosition={{ x: sticker.x, y: sticker.y }}
            peelDirection={30}
            backColor="#ffffff"
            shadowIntensity={0.5}
            className="z-20"
          />
        </Suspense>
      )}
    </>
  );
}
