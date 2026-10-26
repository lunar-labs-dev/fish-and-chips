import { SpecialsDeck } from '../components/SpecialsDeck';
import { brand, press } from '../data/site';

const maverick = press.find((p) => p.outlet === 'Daily Maverick')!;

// Front page hero on newsprint: one headline, one action, one quote, and the specials deck.
export function Hero() {
  return (
    <section id="top" className="relative overflow-x-clip pt-24 pb-16 md:pt-24 lg:flex lg:min-h-svh lg:items-center lg:pb-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10">
          <p className="reveal kicker m-0">Johannesburg · Fried fresh since {brand.founded}</p>
          <h1 className="rise mt-4 mb-0 max-w-[680px] bg-linear-to-r from-[#000000] to-[#666666] bg-clip-text pb-2 text-6xl text-transparent md:text-7xl">
            <span style={{ '--i': 0 } as React.CSSProperties}>Battered with</span>
            <br />
            <span style={{ '--i': 1 } as React.CSSProperties} className="text-fc-red">
              love.
            </span>
          </h1>

          <p className="reveal mt-6 mb-0 max-w-[680px] text-xl text-fc-ink-soft" style={{ '--delay': '350ms' } as React.CSSProperties}>
            Fresh hake and hand cut chips, fried to order by a family who grew up on them. Three shops across Joburg and the East Rand.
          </p>

          <a href="#stores" className="btn-red reveal mt-8" style={{ '--delay': '450ms' } as React.CSSProperties}>
            Find your nearest shop
          </a>

          <figure className="reveal mt-12 mb-0 max-w-md" style={{ '--delay': '550ms' } as React.CSSProperties}>
            <blockquote className="m-0 text-lg">
              <span className="mr-1 text-3xl leading-none font-bold text-fc-red">“</span>
              {maverick.quote}”
            </blockquote>
            <figcaption className="kicker mt-2 text-fc-ink-soft">{maverick.outlet}</figcaption>
          </figure>
        </div>

        <div className="reveal relative mx-auto w-full max-w-md lg:max-w-[480px]" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <SpecialsDeck />
        </div>
      </div>
    </section>
  );
}
