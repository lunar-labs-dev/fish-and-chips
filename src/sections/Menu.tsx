import { MapPinIcon } from '@phosphor-icons/react/dist/ssr';
import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { menuCategories, menuPdf, menuSmallPrint, type MenuCategory, type MenuItem, type SizeIcon } from '../data/menu';
import { url } from '../lib/url';
import { TillSlip } from '../components/TillSlip';

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
    <section id="menu" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="m-0 text-5xl leading-none md:text-7xl">
            The <span className="text-fc-red">menu</span>
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
                  className={`relative shrink-0 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                    selected ? 'border-fc-ink text-fc-white' : 'border-fc-ink/20 text-fc-ink hover:border-fc-ink'
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

        <TillSlipDeal />

        <div className="mt-12 flex flex-col gap-4 border-t border-fc-rule pt-6 text-base text-fc-ink-soft md:flex-row md:justify-between md:gap-10">
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

// The bring back your slip deal: the slip pokes out of a lemon band, as if left on the counter.
// TODO(client): confirm the voucher terms (how long a slip stays valid, which stores, any exclusions).
function TillSlipDeal() {
  return (
    <div className="reveal mt-24 grid items-center gap-8 rounded-sm bg-fc-peach px-6 pb-10 md:grid-cols-[auto_1fr] md:gap-12 md:px-12 md:py-10">
      <TillSlip className="mx-auto -mt-12 -rotate-3 text-xs md:-my-24 md:text-sm" />
      <div className="max-md:text-center">
        <h3 className="m-0 text-3xl leading-tight md:text-5xl">Bring back your till slip</h3>
        <p className="mt-4 mb-0 max-w-xl text-xl leading-snug max-md:mx-auto md:text-2xl">
          Keep the slip from today’s order and bring it along next time. We’ll take 10% off your next order.
        </p>
        <p className="mt-3 mb-0 text-base text-fc-ink/70">Ts&amp;Cs apply. Ask in store for the details.</p>
      </div>
    </div>
  );
}

function MenuPanel({ category: c }: { category: MenuCategory }) {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
        <h3 className="m-0 text-4xl md:text-5xl">{c.name}</h3>
        <p className="m-0 text-xl text-fc-red">{c.tagline}</p>
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
  const hasDetail = item.options?.some((o) => o.detail) ?? false;
  // Option rows share one set of columns (icon, size, weight, dots, price), so every row lines up.
  const columns = [item.sizes && 'auto', 'auto', hasDetail && 'auto', 'minmax(1rem,1fr)', 'auto'].filter(Boolean).join(' ');
  return (
    <li className="border-b border-dashed border-fc-ink/20 py-4">
      <div className="flex items-baseline gap-3">
        <h4 className="m-0 flex items-baseline gap-2 text-xl md:text-2xl">
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
            <span className="shrink-0 font-mono text-lg font-bold whitespace-nowrap text-fc-red">{item.price}</span>
          </>
        )}
      </div>
      {item.description && <p className="mt-2 mb-0 max-w-md text-lg leading-snug text-fc-ink-soft">{item.description}</p>}
      {item.options && (
        <dl className={`mt-3 mb-0 grid max-w-sm gap-x-3 ${item.sizes ? 'gap-y-2' : 'gap-y-1'}`} style={{ gridTemplateColumns: columns }}>
          {item.options.map((o, i, all) => (
            <div key={o.label} className="col-span-full grid grid-cols-subgrid items-baseline">
              {item.sizes && <SizeMark kind={item.sizes} step={i} of={all.length} />}
              <dt className={`text-lg ${hasDetail ? 'col-span-2 grid grid-cols-subgrid items-baseline' : ''}`}>
                <span>{o.label}</span>
                {o.detail && <span className="text-base text-fc-ink-soft">{o.detail}</span>}
              </dt>
              <span className="translate-y-[-0.3em] border-b-2 border-dotted border-fc-ink/20" aria-hidden="true" />
              <dd className="m-0 text-right font-mono font-bold text-fc-red">{o.price}</dd>
            </div>
          ))}
        </dl>
      )}
      {item.note && <p className="mt-2 mb-0 text-base text-fc-ink-soft">{item.note}</p>}
    </li>
  );
}

// Sizes at a glance: the icon grows from half size on the smallest option to full size on the largest,
// centred on its row. Each viewBox hugs its drawing, so the centre is the drawing's centre.
function SizeMark({ kind, step, of }: { kind: SizeIcon; step: number; of: number }) {
  const width = `${(of > 1 ? 0.5 + (0.5 * step) / (of - 1) : 1) * 100}%`;
  return (
    <span aria-hidden="true" className={`flex h-6 items-center justify-center self-center ${kind === 'fish' ? 'w-12' : 'w-10'}`}>
      {kind === 'fish' ? (
        <svg viewBox="2 2 42 19" style={{ width }} className="text-fc-ink">
          <path fill="currentColor" d="M2 12C8 3.5 23 2 33.5 9.5L44 3.5 40.5 12l3.5 8.5-10.5-6C23 22 8 20.5 2 12Z" />
          <path fill="currentColor" d="M17 5.2c2-2.6 6-3.6 9.5-2.7l-1.2 3.6c-2.6-.6-5.4-.9-8.3-.9Z" />
          <circle cx="9" cy="10.6" r="1.7" className="fill-fc-white" />
          <path d="M14 7.5c1.6 2.9 1.6 6.1 0 9" className="fill-none stroke-fc-white" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="3 9 34 19" style={{ width }}>
          <path d="M7 14c2.6-6.2 23.4-6.2 26 0Z" className="fill-fc-peach" />
          <path d="M3 14h34c0 7-7 12-17 12S3 21 3 14Z" className="fill-fc-ink" />
          <rect x="14" y="25" width="12" height="3" rx="1.5" className="fill-fc-ink" />
        </svg>
      )}
    </span>
  );
}

function GreenvalleyPin() {
  return <MapPinIcon weight="fill" aria-hidden="true" className="inline-block size-5 shrink-0 text-fc-red" />;
}
