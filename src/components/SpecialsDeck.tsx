import { useEffect, useRef, useState, type ReactNode } from 'react';
import { m, useMotionValue, type TargetAndTransition } from 'motion/react';
import { specials, type Special } from '../data/specials';
import { splashDone } from '../lib/splash';
import { url } from '../lib/url';
import { TillSlip } from './TillSlip';

type Dir = 1 | -1;
type Pause = 'splash' | 'hover' | 'focus' | 'drag' | 'offscreen';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Resting places: the front card, then two peeking out behind it. Any further cards wait unseen at the back.
const SLOTS = [
  { x: '0%', y: '0%', rotate: 2, scale: 1, opacity: 1 },
  { x: '-4%', y: '-3%', rotate: -5, scale: 0.95, opacity: 1 },
  { x: '5%', y: '-5%', rotate: 7, scale: 0.9, opacity: 1 },
];
const BURIED = { x: '0%', y: '-6%', rotate: 0, scale: 0.86, opacity: 0 };
// Next flicks the front card off to the left and slides it back in under the deck; previous runs that path in reverse.
const FLICK = { x: '-70%', y: '10%', rotate: -14 };
const FLICK_OUT = 0.44; // seconds until a flicked card is out of sight
const FLICK_TOTAL = 1.1;
const TURN = 6000; // ms each special stays up front while the deck deals itself

function cardTarget(pos: number, n: number, dir: Dir | 0): TargetAndTransition {
  const slot = SLOTS[pos] ?? BURIED;
  const toBack = dir === 1 && pos === n - 1;
  const toFront = dir === -1 && pos === 0;
  if (!toBack && !toFront) return { ...slot, transition: { duration: 0.75, ease: EASE_OUT } };
  return {
    x: [null, FLICK.x, slot.x],
    y: [null, FLICK.y, slot.y],
    rotate: [null, FLICK.rotate, slot.rotate],
    scale: [null, 1, slot.scale],
    opacity: [null, 0, slot.opacity],
    transition: { duration: FLICK_TOTAL, times: [0, FLICK_OUT / FLICK_TOTAL, 1], ease: ['easeOut', EASE_OUT] },
  };
}

// The hero's specials as a deck of cards. It deals itself after the splash, pauses on hover, keyboard focus, a drag or
// when scrolled away, and stops for good once the visitor steps or swipes it. Reduced motion keeps it still.
export function SpecialsDeck() {
  const n = specials.length;
  const [{ active, dir }, setDeck] = useState<{ active: number; dir: Dir | 0 }>({ active: 0, dir: 0 });
  // Stacking follows the deal once the flicked card is out of sight, so it leaves over the deck and comes back under it
  // (and a card pulled from the back goes the opposite way). Motion can't delay zIndex, so it lives here.
  const [stacked, setStacked] = useState(0);
  const [pauses, setPauses] = useState<ReadonlySet<Pause>>(() => new Set(['splash']));
  const [stopped, setStopped] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const playing = !stopped && pauses.size === 0;
  const step = (d: Dir) => setDeck((s) => ({ active: (s.active + d + n) % n, dir: d }));
  const take = (d: Dir) => {
    setStopped(true);
    step(d);
  };
  const pause = (why: Pause, on: boolean) =>
    setPauses((p) => {
      if (p.has(why) === on) return p;
      const next = new Set(p);
      if (on) next.add(why);
      else next.delete(why);
      return next;
    });

  useEffect(() => {
    let live = true;
    splashDone.then(() => live && pause('splash', false));
    const io = new IntersectionObserver(([e]) => pause('offscreen', !e.isIntersecting), { threshold: 0.35 });
    if (root.current) io.observe(root.current);
    return () => {
      live = false;
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setStacked(active), FLICK_OUT * 1000);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (!playing || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => step(1), TURN);
    return () => clearTimeout(t);
  }, [playing, active]);

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Specials"
      onPointerEnter={(e) => e.pointerType === 'mouse' && pause('hover', true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && pause('hover', false)}
      onFocus={(e) => e.target.matches(':focus-visible') && pause('focus', true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && pause('focus', false)}
    >
      <div className="relative isolate aspect-square">
        {specials.map((s, i) => (
          <DeckCard
            key={s.name}
            special={s}
            index={i}
            pos={(i - active + n) % n}
            zIndex={n - ((i - stacked + n) % n)}
            dir={dir}
            onStep={take}
            onDrag={(on) => pause('drag', on)}
          />
        ))}
      </div>

      <div className="mt-7 flex items-center gap-3 md:mt-9">
        <RoundButton label="Previous special" onClick={() => take(-1)}>
          <path d="M15 5l-7 7 7 7" />
        </RoundButton>
        <RoundButton label="Next special" onClick={() => take(1)}>
          <path d="M9 5l7 7-7 7" />
        </RoundButton>
        <p aria-hidden="true" className="m-0 ml-1 font-ns-victor text-sm tabular-nums">
          <span className="font-bold">{String(active + 1).padStart(2, '0')}</span>
          <span className="text-fc-ink-soft"> / {String(n).padStart(2, '0')}</span>
        </p>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {playing ? '' : `${specials[active].name}, ${active + 1} of ${n}`}
      </p>
    </div>
  );
}

type CardProps = {
  special: Special;
  index: number;
  pos: number;
  zIndex: number;
  dir: Dir | 0;
  onStep: (d: Dir) => void;
  onDrag: (on: boolean) => void;
};

function DeckCard({ special, index, pos, zIndex, dir, onStep, onDrag }: CardProps) {
  const n = specials.length;
  const front = pos === 0;
  const dragX = useMotionValue(0);
  return (
    <m.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${n}`}
      aria-hidden={!front}
      inert={!front}
      initial={false}
      animate={cardTarget(pos, n, dir)}
      style={{ zIndex }}
      className="absolute inset-0"
    >
      <m.div
        drag={front ? 'x' : false}
        dragSnapToOrigin
        style={{ x: dragX, touchAction: 'pan-y' }}
        onDragStart={() => onDrag(true)}
        onDragEnd={(_, { offset, velocity }) => {
          onDrag(false);
          const swipe = offset.x + velocity.x * 0.2;
          if (swipe < -80) {
            // Ride the flick from where the finger let go, and recentre once the card is out of sight.
            dragX.jump(dragX.get());
            setTimeout(() => dragX.jump(0), FLICK_OUT * 1000);
            onStep(1);
          } else if (swipe > 80) onStep(-1);
        }}
        className={`relative size-full overflow-hidden rounded-[2rem] border-[10px] border-fc-white bg-fc-white shadow-[0_40px_80px_-30px_rgb(35_31_32/0.45)] @container ${
          front ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
      >
        <CardFace special={special} first={index === 0} />
      </m.div>
    </m.div>
  );
}

// Sized by the card's own width (a container), since the card is narrowest on small laptops, not phones.
function CardFace({ special: s, first }: { special: Special; first: boolean }) {
  const art = s.art;
  const slip = art === 'till-slip';
  return (
    <>
      {slip ? (
        <div className="grid size-full place-items-center bg-fc-lemon pb-[44%] text-[1.6cqw] @lg:pb-[28%] @lg:pl-[8%] @lg:text-[1.95cqw]">
          <TillSlip className="-rotate-6" />
        </div>
      ) : (
        <img
          src={url(`/images/${art.photo}-${Math.max(...art.widths)}.webp`)}
          srcSet={art.widths.map((w) => `${url(`/images/${art.photo}-${w}.webp`)} ${w}w`).join(', ')}
          sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 92vw"
          alt={art.alt}
          width={Math.max(...art.widths)}
          height={Math.max(...art.widths)}
          loading={first ? 'eager' : 'lazy'}
          fetchPriority={first ? 'high' : 'auto'}
          decoding="async"
          draggable={false}
          className="size-full object-cover"
        />
      )}
      <div
        className={`absolute inset-x-0 bottom-0 px-5 pb-5 @sm:px-6 @sm:pb-6 @lg:px-8 @lg:pb-7 ${
          slip ? 'text-fc-ink' : 'bg-linear-to-t from-fc-ink/90 via-fc-ink/45 to-transparent pt-28 text-fc-white'
        }`}
      >
        <p className="m-0 font-fc-logo text-xl leading-tight tracking-[-0.01em] @sm:text-2xl @lg:text-[2rem]">{s.name}</p>
        <p className="mt-1.5 mb-0 max-w-sm text-base leading-snug opacity-85 @sm:text-lg">{s.blurb}</p>
        {s.terms && <p className="mt-1 mb-0 text-sm opacity-70">{s.terms}</p>}
      </div>
      <p className="absolute top-5 right-5 m-0 grid size-20 rotate-[8deg] place-content-center rounded-full border-4 border-fc-white bg-fc-red text-center font-ns-victor leading-none text-fc-white shadow-lg @lg:size-24">
        <span className="text-2xl font-bold @lg:text-3xl">{s.price.value}</span>
        {s.price.label && <span className="mt-1 text-sm italic">{s.price.label}</span>}
      </p>
    </>
  );
}

function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-fc-ink bg-fc-white text-fc-ink transition-colors duration-300 hover:bg-fc-ink hover:text-fc-white"
    >
      <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}
