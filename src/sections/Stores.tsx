import { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { comingSoon, mapsHref, stores, telHref, type Store } from '../data/site';

function matches(store: Store, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [store.name, store.area, store.city, store.postcode, ...store.address, ...store.keywords].join(' ').toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}

// Store finder: type a suburb or store name, get call, email and directions for each match. Cards glide as the list filters.
export function Stores() {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const results = stores.filter((s) => matches(s, query));

  return (
    <section id="stores" className="bg-tiles scroll-mt-20 border-y border-fc-grout py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="m-0 font-ns-victor text-5xl leading-none font-bold tracking-[-0.04em] md:text-7xl">
              Find your <span className="font-semibold text-fc-red italic">chippie</span>
            </h2>
            <p className="mt-6 mb-0 max-w-md text-xl leading-snug text-fc-ink-soft">
              Three shops across Johannesburg and the East Rand, with more on the way.
            </p>
          </div>

          <div className="w-full lg:max-w-sm">
            <label htmlFor={inputId} className="mb-2 block font-ns-victor text-sm font-semibold">
              Search by suburb or store
            </label>
            <div className="relative">
              <svg className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-fc-ink-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id={inputId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try Boksburg or Edenvale"
                autoComplete="off"
                className="w-full rounded-full border-2 border-fc-ink bg-fc-white py-3.5 pr-5 pl-12 font-ns-victor text-base text-fc-ink placeholder:text-fc-ink-soft/80 focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-fc-red"
              />
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {results.length === 1 ? '1 store found' : `${results.length} stores found`}
        </p>

        {results.length > 0 ? (
          <ul className="mt-14 grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((s) => (
                <m.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18 } }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                >
                  <StoreCard store={s} />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="mt-14 rounded-3xl border-2 border-dashed border-fc-ink/30 bg-fc-white p-8 md:p-12">
            <h3 className="m-0 font-ns-victor text-2xl font-bold">No shop near “{query.trim()}” yet.</h3>
            <p className="mt-3 mb-6 text-lg text-fc-ink-soft">We are opening soon in {comingSoon.join(', ')}. Clear the search to see every store.</p>
            <button type="button" onClick={() => setQuery('')} className="btn-ink">
              Show all stores
            </button>
          </div>
        )}

        <div className="mt-16 flex flex-col gap-4 border-t-2 border-fc-ink pt-8 md:flex-row md:items-baseline md:gap-10">
          <h3 className="m-0 shrink-0 font-ns-victor text-xl font-bold">Coming soon</h3>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {comingSoon.map((c) => (
              <li key={c} className="rounded-full border border-fc-ink/20 bg-fc-white px-4 py-2 text-base">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StoreCard({ store }: { store: Store }) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-fc-white p-7 shadow-[0_1px_0_var(--color-fc-grout),0_24px_48px_-28px_rgb(35_31_32/0.3)] ring-1 ring-fc-grout transition-transform duration-500 ease-fc-out hover:-translate-y-1 md:p-8">
      <h3 className="m-0 font-ns-victor text-3xl font-bold tracking-tight">{store.name}</h3>
      <p className="mt-1 mb-0 text-base text-fc-ink-soft italic">{store.area}</p>

      <address className="mt-6 text-lg leading-snug not-italic">
        {store.address.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="block">
          {store.city}, {store.postcode}
        </span>
      </address>

      <p className="mt-6 mb-0 text-base">
        <span className="mr-2 font-ns-victor text-sm font-semibold">Tel</span>
        <a href={telHref(store.phone)} className="link-underline">
          {store.phone}
        </a>
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        <a href={mapsHref(store)} target="_blank" rel="noopener noreferrer" className="btn-red px-5! py-3!">
          Directions<span className="sr-only"> to {store.name}, opens Google Maps in a new tab</span>
        </a>
        <a href={telHref(store.phone)} className="btn-ink px-5! py-3!">
          Call<span className="sr-only"> {store.name}</span>
        </a>
        <a href={`mailto:${store.email}`} className="btn-ink px-5! py-3!">
          Email<span className="sr-only"> {store.name} at {store.email}</span>
        </a>
      </div>
    </article>
  );
}
