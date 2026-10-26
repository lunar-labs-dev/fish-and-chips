import type { Ref } from 'react';

type Props = {
  className?: string;
  /** Whips the rod for a catch, on top of the idle sway. Rotates about his hands. */
  rod?: Ref<SVGGElement>;
  /** The rod tip, where a line to a hooked fish starts. */
  tip?: Ref<SVGCircleElement>;
  /** The line and lure, hidden while a catch is on its own line. */
  line?: Ref<SVGGElement>;
  /** The lure, twitched on each click. */
  lure?: Ref<SVGGElement>;
  onLure?: () => void;
};

// A small old fisherman in pen and ink, sat on the edge of whatever holds him, fishing off it. The seat line is y=150 in
// the viewBox, so the parent lines that up with its top edge. A displacement filter wobbles every stroke like a nib.
export function Fisherman({ className = '', rod, tip, line, lure, onLure }: Props) {
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" className={`overflow-visible ${className}`}>
      <defs>
        <filter id="nib" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="2.4" />
        </filter>
      </defs>
      <g filter="url(#nib)" className="stroke-fc-ink" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {/* Rod, line and float sway together from his hands; the float also bobs. */}
        <g ref={rod} className="[transform-box:view-box]" style={{ transformOrigin: '112px 124px' }}>
          <g className="animate-sway [transform-box:view-box]" style={{ transformOrigin: '112px 124px' }}>
            <path d="M146 140 112 124Q66 92 20 40" className="fill-none" strokeWidth="2.2" />
            <path d="M146 140 136 135" className="fill-none" strokeWidth="4" />
            <circle ref={tip} cx="20" cy="40" r="0.5" className="fill-none stroke-none" />
            <g ref={line}>
              <path d="M20 40 21 196" className="fill-none" strokeWidth="0.8" />
              <g ref={lure} onClick={onLure} className={onLure ? 'pointer-events-auto cursor-pointer' : ''}>
                <g className="animate-bob [transform-box:fill-box]" style={{ transformOrigin: '50% 0%' }}>
                  <circle cx="21" cy="212" r="18" fill="transparent" stroke="none" />
                  <path d="M21 196v6" className="fill-none" strokeWidth="0.8" />
                  <ellipse cx="21" cy="209" rx="5.5" ry="7.5" className="fill-fc-white" />
                  <path d="M15.5 207.5a5.5 7.5 0 0 1 11 0Z" className="fill-fc-red" />
                  <path d="M21 216.5v10q0 5-4 5t-3.5-4" className="fill-none" strokeWidth="1.1" />
                </g>
              </g>
            </g>
          </g>
        </g>

        {/* Trousers over the edge, boots dangling. */}
        <path d="M134 146h-22q-6 0-7 6l-3 24M138 148q-10 4-16 4l-1 22" className="fill-none" strokeWidth="9" />
        <path d="M134 146h-22q-6 0-7 6l-3 24M138 148q-10 4-16 4l-1 22" className="fill-none stroke-fc-ink-soft" strokeWidth="6" />
        <path d="M96 175h12l1 10c-6 2-17 2-22 0 0-5 3-9 9-10Z" className="fill-fc-ink" />
        <path d="M116 173h11l1 10c-5 2-15 2-20 0 0-5 3-9 8-10Z" className="fill-fc-ink" />

        {/* Oilskin coat, hunched, with hatched shading down the back. */}
        <path d="M118 96c-8 6-10 26-8 40 2 10 10 16 26 15 10-1 16-8 16-20 0-16-6-30-16-36Z" className="fill-fc-peach" />
        <path d="M142 104l6 6M141 112l9 8M140 121l11 9M139 130l11 10M138 139l9 8" className="fill-none" strokeWidth="1" />
        <path d="M126 102v42" className="fill-none" strokeWidth="1" />
        <circle cx="123" cy="112" r="1.3" className="fill-fc-ink" />
        <circle cx="123" cy="124" r="1.3" className="fill-fc-ink" />

        {/* Arms reaching forward to the rod. */}
        <path d="M128 106q-12 10-18 18" className="fill-none" strokeWidth="8" />
        <path d="M128 106q-12 10-18 18" className="fill-none stroke-fc-peach" strokeWidth="5" />
        <circle cx="110" cy="124" r="4.5" className="fill-fc-white" />

        {/* Head: bulb nose, squinting eye, big white beard, pipe. */}
        <circle cx="128" cy="82" r="13" className="fill-fc-white" />
        <path d="M113 86c-2 10 2 22 12 24 6 1 12-2 14-8 1-6 0-12-2-16-6 4-16 4-24 0Z" className="fill-fc-white" />
        <path d="M116 93q3 4 6 2M119 101q3 3 6 1M127 103q3 2 6-1" className="fill-none" strokeWidth="1" />
        <path d="M123 79q-3-2-6 0" className="fill-none" strokeWidth="1.4" />
        <circle cx="120" cy="83" r="1.4" className="fill-fc-ink" />
        <ellipse cx="114" cy="85" rx="4.5" ry="4" className="fill-fc-peach" />
        <path d="M113 92h-10" className="fill-none" strokeWidth="2" />
        <path d="M100 87h6v6c0 2-6 2-6 0Z" className="fill-fc-ink-soft" />
        <path d="M137 78q4 2 4 7" className="fill-none" strokeWidth="1.2" />

        {/* Sou'wester: dome crown and a brim that drops low at the back. */}
        <path d="M116 72c0-12 8-18 15-18s14 6 14 16" className="fill-fc-peach" />
        <path d="M106 72c8-4 30-6 42-2 6 2 10 8 12 16-10-4-18-6-26-6-10 0-20 0-28-8Z" className="fill-fc-peach" />
        <path d="M140 74l4 6M146 75l4 7M151 78l3 5" className="fill-none" strokeWidth="0.9" />

        {/* Pipe smoke. */}
        <g className="fill-none stroke-fc-ink-soft" strokeWidth="1">
          <path d="M103 83q-4-5 0-9t0-9" className="animate-smoke" />
          <path d="M101 70q-3-4 0-7" className="animate-smoke [animation-delay:1.4s]" />
        </g>
      </g>
    </svg>
  );
}
