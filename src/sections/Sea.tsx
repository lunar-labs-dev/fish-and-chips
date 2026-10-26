import { Fisherman } from '../components/Fisherman';

// One 240px wave tile; the strip is 240px wider than the screen and drifts one tile, so the loop is seamless.
const wave = (crest: number, fill: number, line: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='64'><path d='M0 ${crest}q30-7 60 0t60 0t60 0t60 0V64H0Z' fill='rgb(7 7 7/${fill})'/><path d='M0 ${crest}q30-7 60 0t60 0t60 0t60 0' fill='none' stroke='rgb(7 7 7/${line})' stroke-width='1.5'/></svg>`,
  )}")`;

// A greyscale sea surface pinned above the bottom of the screen. It is sticky, so once the footer scrolls up it rides on
// the footer's top edge and the footer sits underwater. The old boy fishes off the side of his rowboat on it.
export function Sea() {
  return (
    <div aria-hidden="true" className="pointer-events-none sticky bottom-0 z-40 -mt-40 h-40 overflow-x-clip">
      <div className="absolute bottom-2 left-0 h-16 w-[calc(100%+240px)] animate-wave-back" style={{ backgroundImage: wave(18, 0.05, 0.22) }} />

      <div className="absolute right-2 bottom-0 h-full w-[200px] origin-bottom-right scale-75 md:right-auto md:left-[6%] md:scale-100">
        <div className="size-full origin-bottom animate-rock">
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
        <Fisherman className="absolute bottom-1 -left-12 w-[120px]" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-16 w-[calc(100%+240px)] animate-wave" style={{ backgroundImage: wave(22, 0.2, 0.55) }} />
    </div>
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
