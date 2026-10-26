import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { menuCategories, menuPdf, menuSmallPrint, type MenuCategory, type MenuItem } from '../data/menu';
import { url } from '../lib/url';

// The full menu as tabbed categories. A pill slides between tabs and panels crossfade; inactive panels stay in the HTML, hidden, so the whole menu prerenders.
export function Menu() {
  const [active, setActive] = useState(menuCategories[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = menuCategories.find((c) => c.id === active)!;

  function onKeyDown(e: KeyboardEvent, index: number) {
    const last = menuCategories.length - 1;
    const next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + menuCategories.length) % menuCategories.length;
    setActive(menuCategories[i].id);
    tabs.current[i]?.focus();
  }

  return (
    <section id="menu" className="scroll-mt-20 bg-fc-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="m-0 font-ns-victor text-5xl leading-none font-bold tracking-[-0.04em] md:text-7xl">
            The <span className="font-semibold text-fc-red italic">menu</span>
          </h2>
          <div className="flex flex-col gap-4 lg:max-w-md lg:items-end lg:text-right">
            <p className="m-0 text-xl leading-snug text-fc-ink-soft">Fresh hake, hand cut chips and a few local legends. Pick a section to browse.</p>
            <a href={url(menuPdf)} target="_blank" rel="noopener" className="btn-ink self-start lg:self-end">
              Open the printable menu<span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="-mx-4 mt-12 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Menu sections" className="flex w-max gap-2 border-b-2 border-fc-ink pb-4 md:w-auto md:flex-wrap">
            {menuCategories.map((c, i) => {
              const selected = c.id === active;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={selected ? `panel-${c.id}` : undefined}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative shrink-0 rounded-full border-2 px-5 py-2.5 font-ns-victor text-sm font-semibold transition-colors duration-300 ${
                    selected ? 'border-fc-ink text-fc-white' : 'border-fc-grout bg-fc-white text-fc-ink hover:border-fc-ink'
                  }`}
                >
                  {selected && (
                    <m.span
                      layoutId="menu-tab-pill"
                      className="absolute -inset-0.5 rounded-full bg-fc-ink"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active}
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' } }}
            className="pt-10 focus-visible:outline-offset-8"
          >
            <MenuPanel category={current} />
          </m.div>
        </AnimatePresence>
        {menuCategories
          .filter((c) => c.id !== active)
          .map((c) => (
            <div key={c.id} hidden>
              <MenuPanel category={c} />
            </div>
          ))}

        <div className="mt-12 flex flex-col gap-4 border-t border-fc-grout pt-6 text-base text-fc-ink-soft md:flex-row md:justify-between md:gap-10">
          <p className="m-0 flex items-center gap-2">
            <GreenvalleyPin />
            <span>Only at our Greenvalley store.</span>
          </p>
          <p className="m-0 md:max-w-xl md:text-right">{menuSmallPrint.join(' ')}</p>
        </div>
      </div>
    </section>
  );
}

function MenuPanel({ category: c }: { category: MenuCategory }) {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-5">
        <h3 className="m-0 font-ns-victor text-4xl font-bold tracking-tight md:text-5xl">{c.name}</h3>
        <p className="m-0 text-xl text-fc-red italic">{c.tagline}</p>
      </div>
      {c.intro && <p className="mt-3 mb-0 max-w-2xl text-lg text-fc-ink-soft">{c.intro}</p>}
      <ul className="mt-8 grid list-none gap-x-16 p-0 md:grid-cols-2">
        {c.items.map((item) => (
          <MenuRow key={item.name} item={item} />
        ))}
      </ul>
    </>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="border-b border-dashed border-fc-ink/20 py-5">
      <div className="flex items-baseline gap-3">
        <h4 className="m-0 flex items-baseline gap-2 font-ns-victor text-xl font-bold tracking-tight md:text-2xl">
          {item.name}
          {item.greenvalleyOnly && (
            <span className="translate-y-0.5 self-center">
              <GreenvalleyPin />
              <span className="sr-only">(Greenvalley only)</span>
            </span>
          )}
        </h4>
        {item.price && (
          <>
            <span className="min-w-4 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-fc-ink/30" aria-hidden="true" />
            <span className="shrink-0 font-ns-victor text-lg font-bold whitespace-nowrap text-fc-red">{item.price}</span>
          </>
        )}
      </div>
      {item.description && <p className="mt-1.5 mb-0 max-w-md text-lg leading-snug text-fc-ink-soft">{item.description}</p>}
      {item.options && (
        <dl className="mt-3 mb-0 grid max-w-sm gap-1">
          {item.options.map((o) => (
            <div key={o.label} className="flex items-baseline gap-3">
              <dt className="text-lg">{o.label}</dt>
              <span className="flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-fc-ink/20" aria-hidden="true" />
              <dd className="m-0 font-ns-victor font-bold text-fc-red">{o.price}</dd>
            </div>
          ))}
        </dl>
      )}
      {item.note && <p className="mt-2 mb-0 text-base text-fc-ink-soft italic">{item.note}</p>}
    </li>
  );
}

function GreenvalleyPin() {
  return (
    <svg viewBox="0 0 24 24" className="inline-block size-5 shrink-0 text-fc-red" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}
