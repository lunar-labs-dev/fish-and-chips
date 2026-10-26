import { useLayoutEffect, useRef, useState } from 'react';
import { Fisherman } from '../components/Fisherman';

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const SETTLE = 'cubic-bezier(0.45, 0, 0.55, 1)';
const CLICKS_TO_CATCH = 3;
const MAX_IN_BOAT = 3;
// In the boat box (200 by 160): from the lure in the water, up over his head, down into the boat.
const FLIGHT = "path('M-35 125Q-10-250 112 92')";
const CATCH_MS = 1900;

// One 240px wave tile; the strip is 240px wider than the screen and drifts one tile, so the loop is seamless.
const wave = (crest: number, fill: number, line: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='64'><path d='M0 ${crest}q30-7 60 0t60 0t60 0t60 0V64H0Z' fill='rgb(7 7 7/${fill})'/><path d='M0 ${crest}q30-7 60 0t60 0t60 0t60 0' fill='none' stroke='rgb(7 7 7/${line})' stroke-width='1.5'/></svg>`,
  )}")`;

// A greyscale sea surface pinned above the bottom of the screen. It is sticky, so once the footer scrolls up it rides on
// the footer's top edge and the footer sits underwater. The old boy fishes off the side of his rowboat on it.
export function Sea() {
  const sea = useRef<HTMLDivElement>(null);
  const rod = useRef<SVGGElement>(null);
  const tip = useRef<SVGCircleElement>(null);
  const line = useRef<SVGGElement>(null);
  const taut = useRef<SVGLineElement>(null);
  const nose = useRef<HTMLSpanElement>(null);
  const lure = useRef<SVGGElement>(null);
  const fish = useRef<HTMLDivElement>(null);
  const clicks = useRef(0);
  const busy = useRef(false);
  const [caught, setCaught] = useState(0);

  // The flying fish holds its landing pose until the resting one is drawn in its place, then lets go before paint.
  useLayoutEffect(() => {
    fish.current?.getAnimations().forEach((a) => a.cancel());
    busy.current = false;
  }, [caught]);

  // Each click dips the lure; the third whips a fish into the boat. The whip is layered over the idle sway, so the rod
  // eases back into it without a jump.
  function onLure() {
    if (busy.current) return;
    if (++clicks.current < CLICKS_TO_CATCH) {
      lure.current!.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(5px)' }, { transform: 'translateY(0)' }], { duration: 320, easing: EASE });
      return;
    }
    clicks.current = 0;
    busy.current = true;
    const land = () => setCaught((n) => n + 1);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return land();
    console.assert(!!(sea.current && rod.current && tip.current && line.current && taut.current && nose.current && fish.current), 'Sea: catch refs missing');
    rod.current!.animate(
      [{ transform: 'rotate(0deg)', easing: EASE }, { transform: 'rotate(40deg)', offset: 0.2, easing: SETTLE }, { transform: 'rotate(0deg)' }],
      { duration: CATCH_MS },
    ).onfinish = land;
    // The idle line and lure hand over to a taut line from the rod tip to the fish's mouth, and back once it is landed.
    line.current!.animate([{ opacity: 1 }, { opacity: 0, offset: 0.03 }, { opacity: 0, offset: 0.72 }, { opacity: 1 }], { duration: CATCH_MS });
    taut.current!.animate([{ opacity: 0 }, { opacity: 1, offset: 0.03 }, { opacity: 1, offset: 0.68 }, { opacity: 0, offset: 0.9 }], { duration: CATCH_MS });
    fish.current!.animate([{ opacity: 1, offsetDistance: '0%' }, { opacity: 1, offsetDistance: '100%' }], {
      duration: 1150,
      delay: 60,
      easing: 'cubic-bezier(0.25, 0.1, 0.3, 1)',
      fill: 'forwards',
    });
    const draw = () => {
      if (!busy.current) return;
      const at = (el: Element) => {
        const r = el.getBoundingClientRect();
        return [r.x + r.width / 2 - box.x, r.y + r.height / 2 - box.y];
      };
      const box = sea.current!.getBoundingClientRect();
      const [x1, y1] = at(tip.current!);
      const [x2, y2] = at(nose.current!);
      taut.current!.setAttribute('x1', `${x1}`);
      taut.current!.setAttribute('y1', `${y1}`);
      taut.current!.setAttribute('x2', `${x2}`);
      taut.current!.setAttribute('y2', `${y2}`);
      requestAnimationFrame(draw);
    };
    draw();
  }

  return (
    <div ref={sea} aria-hidden="true" className="pointer-events-none sticky bottom-0 z-40 -mt-40 h-40 overflow-x-clip">
      <div className="absolute bottom-2 left-0 h-16 w-[calc(100%+240px)] animate-wave-back" style={{ backgroundImage: wave(18, 0.05, 0.22) }} />

      <div className="absolute right-2 bottom-0 h-full w-[200px] origin-bottom-right scale-75 md:right-[6%] md:scale-100">
        <div className="size-full origin-bottom animate-rock">
          {Array.from({ length: Math.min(caught, MAX_IN_BOAT) }, (_, i) => (
            <Fish key={i} className="absolute top-[86px] w-8" style={{ left: 96 + i * 24, rotate: `${-28 + i * 14}deg` }} />
          ))}
        <svg viewBox="0 0 200 70" className="absolute -bottom-1 left-0 w-[200px] overflow-visible">
          <g filter="url(#nib)" className="stroke-fc-ink" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4q96 14 192-2l-16 52q-80 12-154 0Z" className="fill-fc-red" />
            <path d="M5 8q95 14 190-2" className="fill-none stroke-fc-white" strokeWidth="4" />
            <path d="M4 4q96 14 192-2" className="fill-none" />
            <path d="M14 26q86 12 174-2M20 42q80 10 162-2" className="fill-none" strokeWidth="1" />
            <path d="M150 10l-6 22M40 12l4 22" className="fill-none" strokeWidth="1" />
          </g>
          <text x="96" y="36" fontSize="9" className="fill-fc-white font-mono font-bold" textAnchor="middle">
            EST. 2018
          </text>
        </svg>
        <Fisherman className="absolute bottom-1 -left-12 w-[120px]" rod={rod} tip={tip} line={line} lure={lure} onLure={onLure} />
          <div ref={fish} className="absolute top-0 left-0 opacity-0 [offset-rotate:auto]" style={{ offsetPath: FLIGHT }}>
            <Fish className="block w-8" />
            <span ref={nose} className="absolute top-1/2 right-0 size-px" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-16 w-[calc(100%+240px)] animate-wave" style={{ backgroundImage: wave(22, 0.2, 0.55) }} />
      <svg className="absolute inset-0 size-full overflow-visible">
        <line ref={taut} className="stroke-fc-ink opacity-0" strokeWidth="0.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// A small pen and ink fish, nose to the right.
function Fish({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 14" className={`overflow-visible ${className}`} style={style}>
      <g className="stroke-fc-ink" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M1 1.5 8 7 1 12.5Z" className="fill-fc-red" />
        <path d="M7 7c4-6 15-7 23 0-8 7-19 6-23 0Z" className="fill-fc-white" />
        <path d="M12 4.5q2 2.5 0 5" className="fill-none" />
        <circle cx="25" cy="6" r="1" className="fill-fc-ink" />
      </g>
    </svg>
  );
}

// Bubbles drifting up through the underwater footer.
export function Bubbles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {[8, 23, 41, 57, 72, 88].map((x, i) => (
        <span
          key={x}
          className="absolute bottom-6 block animate-bubble rounded-full border border-fc-white/40"
          style={{ left: `${x}%`, width: 6 + (i % 3) * 4, height: 6 + (i % 3) * 4, animationDelay: `${i * 0.9}s` }}
        />
      ))}
    </div>
  );
}
