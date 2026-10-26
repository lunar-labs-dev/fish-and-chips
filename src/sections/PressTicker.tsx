import { press } from '../data/site';

const outlets = [...press.map((p) => p.outlet), '702'];

// Navy strip of press outlet names scrolling like a news ticker.
export function PressTicker() {
  const row = (hidden: boolean) => (
    <ul className="m-0 flex shrink-0 list-none items-center gap-10 p-0 pr-10" aria-hidden={hidden || undefined}>
      {outlets.map((o) => (
        <li key={o} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-fc-serif text-2xl font-semibold italic md:text-3xl">{o}</span>
          <span className="text-fc-lemon" aria-hidden="true">✶</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="As written about in" className="overflow-hidden bg-fc-ink py-5 text-fc-white">
      <div className="ticker flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
