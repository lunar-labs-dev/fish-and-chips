import { Fragment } from 'react';
import { press } from '../data/site';

const outlets = [...press.map((p) => p.outlet), '702'];
// Two identical halves of 3 runs each (one run is about 1,900px), so the loop stays seamless on screens up to about 5,700px wide.
const RUNS = 6;

// Ink strip of press outlet names scrolling like a news ticker.
export function PressTicker() {
  const row = (hidden: boolean) => (
    <ul className="m-0 flex shrink-0 list-none items-center gap-10 p-0 pr-10" aria-hidden={hidden || undefined}>
      {outlets.map((o) => (
        <li key={o} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-2xl font-bold tracking-tight uppercase md:text-3xl">{o}</span>
          <span className="text-fc-peach" aria-hidden="true">✶</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="As written about in" className="overflow-hidden bg-fc-ink py-4 text-fc-white">
      <div className="ticker flex w-max">
        {Array.from({ length: RUNS }, (_, i) => (
          <Fragment key={i}>{row(i > 0)}</Fragment>
        ))}
      </div>
    </section>
  );
}
