import { useEffect } from 'react';
import { LazyMotion, MotionConfig } from 'motion/react';

const loadMotionFeatures = () => import('./lib/motion-features').then((m) => m.default);
import { initReveal } from './lib/reveal';
import { splashDone } from './lib/splash';
import { requirements } from './data/invest';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { PressTicker } from './sections/PressTicker';
import { Menu } from './sections/Menu';
import { Stores } from './sections/Stores';
import { Story } from './sections/Story';
import { Press } from './sections/Press';
import { FollowAndInvest } from './sections/FollowAndInvest';
import { InvestForm } from './sections/InvestForm';
import { Footer } from './sections/Footer';

export type PageId = 'home' | 'invest';

export function Page({ id }: { id: PageId }) {
  // Scroll reveals start after the fish splash, so the hero copy fades in where it can be seen.
  useEffect(() => {
    let stop: (() => void) | undefined;
    let live = true;
    splashDone.then(() => live && (stop = initReveal()));
    return () => {
      live = false;
      stop?.();
    };
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
      <Navbar />
      <main>{id === 'home' ? <HomeSections /> : <InvestSections />}</main>
      <Footer />
      </LazyMotion>
    </MotionConfig>
  );
}

function HomeSections() {
  return (
    <>
      <Hero />
      <PressTicker />
      <Menu />
      <Stores />
      <Story />
      <Press />
      <FollowAndInvest />
    </>
  );
}

function InvestSections() {
  return (
    <>
      <section className="bg-tiles border-b border-fc-grout pt-32 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h1 className="rise m-0 max-w-4xl font-ns-victor text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.04em]">
            <span style={{ '--i': 0 } as React.CSSProperties}>Bring the chippie&nbsp;</span>
            <span style={{ '--i': 1 } as React.CSSProperties}>to your&nbsp;</span>
            <span style={{ '--i': 2 } as React.CSSProperties} className="font-semibold text-fc-red italic">
              corner.
            </span>
          </h1>
          <p className="reveal mt-8 mb-0 max-w-xl text-xl leading-snug text-fc-ink-soft md:text-2xl" style={{ '--delay': '300ms' } as React.CSSProperties}>
            The Fish &amp; Chip Shop is opening across Gauteng and beyond. Partner with a family brand the press calls Joburg’s most authentic.
          </p>
          <a href="#apply" className="btn-red reveal mt-9" style={{ '--delay': '400ms' } as React.CSSProperties}>
            Start your application
          </a>

          <ul className="mt-16 grid list-none gap-5 p-0 md:grid-cols-3">
            {requirements.map((r, i) => (
              <li
                key={r.title}
                className="reveal rounded-3xl bg-fc-white p-7 ring-1 ring-fc-grout md:p-8"
                style={{ '--delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <h2 className="m-0 font-ns-victor text-2xl font-bold tracking-tight md:text-3xl">{r.title}</h2>
                <p className="mt-3 mb-0 text-lg leading-snug text-fc-ink-soft">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <InvestForm />
    </>
  );
}
