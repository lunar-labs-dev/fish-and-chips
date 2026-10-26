import { brand } from '../data/site';
import { url } from '../lib/url';

// Two closing panels: follow on Instagram, and the franchise invitation.
export function FollowAndInvest() {
  return (
    <section aria-label="Follow us and invest" className="py-24">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:px-8 lg:grid-cols-2">
        <div className="wax reveal flex flex-col rounded-sm p-8 md:p-12">
          <h2 className="m-0 text-4xl leading-none md:text-5xl">
            Follow the <span className="text-fc-red">frying</span>
          </h2>
          <p className="mt-4 mb-0 max-w-md text-xl leading-snug text-fc-ink-soft">
            New dishes, store openings and the odd golden close up. Come say hello.
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-10">
            <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="btn-red">
              {brand.instagram.handle}
              <span className="sr-only">on Instagram, opens in a new tab</span>
            </a>
            <a href={brand.facebook.href} target="_blank" rel="noopener noreferrer" className="btn-ink">
              Facebook<span className="sr-only">, opens in a new tab</span>
            </a>
          </div>
        </div>

        <div className="reveal flex flex-col rounded-sm bg-fc-red p-8 text-fc-white md:p-12" style={{ '--delay': '120ms' } as React.CSSProperties}>
          <h2 className="m-0 text-4xl leading-none md:text-5xl">
            Open a shop <span className="">with us</span>
          </h2>
          <p className="mt-4 mb-0 max-w-md text-xl leading-snug text-fc-white/90">
            We are growing across Gauteng and looking for partners who love good food as much as we do. Silent or active, existing site or not.
          </p>
          <div className="mt-auto pt-10">
            <a href={url('/invest/')} className="btn border border-fc-white bg-fc-white text-fc-red hover:bg-fc-ink hover:text-fc-white hover:border-fc-ink">
              Invest in a store
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
