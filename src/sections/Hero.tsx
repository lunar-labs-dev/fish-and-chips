import SplitText from '../components/SplitText';
import { HeroSticker } from '../components/HeroSticker';
import { SpecialsDeck } from '../components/SpecialsDeck';
import { brand, press } from '../data/site';

const maverick = press.find((p) => p.outlet === 'Daily Maverick')!;

// Type led hero on white tiles: the headline builds letter by letter beside a deck of specials, under a peelable year sticker.
export function Hero() {
  return (
    <section id="top" className="bg-tiles relative overflow-hidden pt-28 pb-16 md:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-28 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="relative z-10">
          <h1 className="m-0 font-ns-victor text-[clamp(3.25rem,13vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.04em] text-fc-ink">
            <SplitText tag="span" text="Battered with" splitType="chars" trigger="load" textAlign="left" delay={35} duration={0.9} />{' '}
            <SplitText
              tag="span"
              text="love."
              splitType="chars"
              trigger="load"
              textAlign="left"
              delay={70}
              duration={0.9}
              ease="back.out(2.2)"
              from={{ opacity: 0, y: '0.6em', rotate: -14 }}
              to={{ opacity: 1, y: 0, rotate: 0, delay: 0.55 }}
              className="pr-[0.08em] pb-[0.06em] font-semibold text-fc-red italic"
            />
          </h1>

          <p className="reveal mt-7 mb-0 max-w-md text-xl leading-snug text-fc-ink-soft md:text-2xl" style={{ '--delay': '350ms' } as React.CSSProperties}>
            Proper fish and chips, fried fresh by a family who grew up on them. Serving Jozi since {brand.founded}.
          </p>

          <div className="reveal mt-9 flex flex-wrap gap-3" style={{ '--delay': '450ms' } as React.CSSProperties}>
            <a href="#menu" className="btn-red">
              See the menu
            </a>
            <a href="#stores" className="btn-ink">
              Find a store
            </a>
          </div>

          <figure className="reveal mt-12 mb-0 max-w-md border-l-4 border-fc-red pl-5" style={{ '--delay': '550ms' } as React.CSSProperties}>
            <blockquote className="m-0 text-lg leading-snug italic">“{maverick.quote}”</blockquote>
            <figcaption className="mt-2 font-ns-victor text-sm font-semibold">{maverick.outlet}</figcaption>
          </figure>
        </div>

        <div className="reveal relative mx-auto w-full max-w-xl lg:max-w-none" style={{ '--delay': '200ms' } as React.CSSProperties}>
          <SpecialsDeck />
          <HeroSticker year={brand.founded} />
        </div>
      </div>
    </section>
  );
}
