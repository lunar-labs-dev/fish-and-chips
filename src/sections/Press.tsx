import { brand, interview702, press, type PressQuote } from '../data/site';
import { url } from '../lib/url';

const sidebar = ['Sowetan Live', 'Daily Maverick'];
const sidebarQuotes = press.filter((q) => sidebar.includes(q.outlet));
const bottomQuotes = press.filter((q) => !sidebar.includes(q.outlet));

// Press coverage printed as an old broadsheet: ears, rules, a stuck on photo, justified columns and classifieds.
export function Press() {
  return (
    <section id="press" className="scroll-mt-20 overflow-hidden bg-fc-tile py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-3 md:px-8">
        <div className="reveal relative isolate">
          <div aria-hidden="true" className="paper-aged absolute inset-0 -z-10 translate-y-2 rotate-[1.2deg] shadow-[0_20px_40px_-24px_rgb(35_31_32/0.4)]" />
          <article className="paper-aged relative px-4 py-6 text-fc-ink shadow-[0_30px_60px_-30px_rgb(35_31_32/0.45),0_2px_6px_rgb(35_31_32/0.12)] md:px-12 md:py-12">
            <header className="grid grid-cols-2 items-center gap-3 border-t border-fc-ink pt-5 pb-5 md:gap-6 lg:grid-cols-[11rem_1fr_11rem] lg:pt-7 lg:pb-7">
              <Ear label="Weather">Golden and crisp, with a light drizzle of vinegar.</Ear>
              <h2 className="order-first col-span-2 m-0 text-center font-ns-victor text-[clamp(2.4rem,10vw,6.75rem)] leading-[0.95] font-bold tracking-[-0.05em] text-balance italic lg:order-none lg:col-span-1">
                The Daily Catch
              </h2>
              <Ear label="Motto">
                All the news that’s fried to print.
              </Ear>
            </header>

            <p className="m-0 flex flex-wrap justify-center gap-x-6 gap-y-1 border-y-[5px] border-double border-fc-ink py-2 text-center text-xs tracking-[0.2em] uppercase md:justify-between md:text-sm">
              <span>Vol. VIII</span>
              <span>Johannesburg</span>
              <span>Est. {brand.founded}</span>
              <span>Price: one portion</span>
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-0 lg:divide-x lg:divide-fc-ink/40">
              <section className="lg:pr-10">
                <a href={interview702.href} target="_blank" rel="noopener noreferrer" className="group block text-fc-ink no-underline">
                  <h3 className="m-0 font-ns-victor text-[clamp(1.9rem,5vw,3.25rem)] leading-[0.95] font-bold tracking-[-0.03em] uppercase group-hover:text-fc-red">
                    {interview702.title}
                  </h3>
                </a>
                <p className="mt-3 mb-0 border-b border-fc-ink/40 pb-4 text-lg leading-snug italic md:text-xl">
                  The family behind the counter goes live on air with Azania Mosaka.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,15rem)_1fr]">
                  <figure className="m-0 mx-auto w-full max-w-60 md:max-w-none">
                    <img
                      src={url('/images/interview-702-400.webp')}
                      alt="The Fish and Chip Shop team in the 702 radio studio"
                      width={400}
                      height={451}
                      loading="lazy"
                      className="block w-full -rotate-2 drop-shadow-[0_10px_14px_rgb(35_31_32/0.3)] transition-transform duration-500 ease-fc-out hover:rotate-0"
                    />
                    <figcaption className="mt-3 text-sm leading-snug italic">Pictured: the team in the 702 studio.</figcaption>
                  </figure>
                  <div className="text-lg leading-relaxed hyphens-auto md:text-justify">
                    <p className="m-0 first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:font-ns-victor first-letter:text-6xl first-letter:leading-[0.8] first-letter:font-bold">
                      {interview702.description}
                    </p>
                    <p className="mt-4 mb-0">
                      They talked about two families, two shops on one Johannesburg street, and the smell of fish and chips that brought everyone back together.
                    </p>
                    <a href={interview702.href} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block font-ns-victor text-sm font-semibold">
                      Listen to the interview<span className="sr-only">, opens 702 in a new tab</span>
                    </a>
                  </div>
                </div>
              </section>

              <div className="flex flex-col divide-y divide-fc-ink/40 border-t border-fc-ink/40 lg:border-t-0 lg:pl-10">
                {sidebarQuotes.map((q) => (
                  <Clipping key={q.outlet} quote={q} />
                ))}
              </div>
            </div>

            <div className="mt-8 grid border-t-[5px] border-double border-fc-ink sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-fc-ink/40">
              {bottomQuotes.map((q) => (
                <div key={q.outlet} className="border-b border-fc-ink/40 sm:odd:pr-4 sm:even:pl-4 lg:border-b-0 lg:px-4 lg:first:pl-0 lg:last:pr-0">
                  <Clipping quote={q} />
                </div>
              ))}
            </div>

            <section className="mt-8 border-4 border-double border-fc-ink p-4 md:p-6">
              <h3 className="m-0 border-b border-fc-ink pb-2 text-center font-ns-victor text-xl font-bold tracking-[0.15em] uppercase">Classifieds</h3>
              <div className="mt-4 grid gap-5 text-base leading-snug md:grid-cols-2 md:divide-x md:divide-fc-ink/40">
                <p className="m-0 md:pr-6 md:text-justify">
                  <strong className="font-ns-victor uppercase">Wanted.</strong> Hungry people with a taste for proper hake and chips. Apply in person at any of our stores.{' '}
                  <a href="#stores" className="link-underline font-ns-victor text-sm font-semibold">
                    Find a store
                  </a>
                </p>
                <p className="m-0 md:pl-6 md:text-justify">
                  <strong className="font-ns-victor uppercase">Opportunity.</strong> Bring the chippie to your corner. Franchise partners wanted across Gauteng and beyond.{' '}
                  <a href={url('/invest/')} className="link-underline font-ns-victor text-sm font-semibold">
                    Invest with us
                  </a>
                </p>
              </div>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
}

// A boxed "ear" beside the masthead, as on old front pages.
function Ear({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`m-0 border border-fc-ink p-2.5 text-center text-sm leading-snug italic md:p-3 ${className}`}>
      <strong className="font-ns-victor not-italic">{label}:</strong> {children}
    </p>
  );
}

// One press quote set as a short newspaper clipping.
function Clipping({ quote: q }: { quote: PressQuote }) {
  return (
    <article className="py-5">
      <h3 className="m-0 font-ns-victor text-base leading-tight font-bold tracking-wide uppercase">{q.outlet}</h3>
      <blockquote className="mt-3 mb-0 text-lg leading-snug hyphens-auto md:text-justify">“{q.quote}”</blockquote>
      {(q.year || q.href) && (
        <p className="mt-3 mb-0 flex flex-wrap items-baseline gap-x-3 text-sm">
          {q.year && <span className="italic">Printed {q.year}</span>}
          {q.href && (
            <a href={q.href} target="_blank" rel="noopener noreferrer" className="link-underline font-ns-victor font-semibold">
              Read the article<span className="sr-only"> on {q.outlet}, opens in a new tab</span>
            </a>
          )}
        </p>
      )}
    </article>
  );
}
