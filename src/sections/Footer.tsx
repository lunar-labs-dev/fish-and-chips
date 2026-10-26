import { brand, builtByLunarLabs, navLinks, stores, telHref } from '../data/site';
import { url } from '../lib/url';

// Navy footer: every store's contacts, sitemap, socials, then the LUNARLABS credit.
export function Footer() {
  return (
    <footer className="bg-fc-ink text-fc-white">
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-10 md:px-8">
        <div className="grid gap-12 border-b border-fc-white/15 pb-14 md:grid-cols-[1fr_0.6fr] lg:grid-cols-[1fr_2fr_0.7fr]">
          <div>
            <a href={url('/')} aria-label={`${brand.name}, home`} className="inline-block">
              <img src={url('/images/logo-360.webp')} alt="" width={360} height={243} loading="lazy" className="w-36" />
            </a>
            <p className="mt-6 mb-0 max-w-xs text-lg leading-snug text-fc-white/75">
              Family run and battered with love in Johannesburg since {brand.founded}.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:order-last md:col-span-2 lg:order-none lg:col-span-1">
            {stores.map((s) => (
              <div key={s.id}>
                <h2 className="m-0 font-ns-victor text-base font-bold text-fc-lemon">{s.name}</h2>
                <address className="mt-3 text-base leading-snug text-fc-white/75 not-italic">
                  {s.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">{s.city}</span>
                </address>
                <a href={telHref(s.phone)} className="mt-3 inline-block font-ns-victor text-sm whitespace-nowrap hover:text-fc-lemon">
                  {s.phone}
                </a>
              </div>
            ))}
          </div>

          <nav aria-label="Footer">
            <h2 className="m-0 font-ns-victor text-base font-bold text-fc-lemon">Explore</h2>
            <ul className="mt-3 grid list-none gap-2 p-0">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={url(l.href)} className="text-base text-fc-white/75 hover:text-fc-white">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${brand.hqEmail}`} className="text-base text-fc-white/75 hover:text-fc-white">
                  Email head office
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm text-fc-white/60 md:flex-row md:items-center md:justify-between">
          <p suppressHydrationWarning className="m-0">
            © {new Date().getFullYear()} {brand.name}. Photography by {brand.name}.
          </p>
          <ul className="m-0 flex list-none gap-6 p-0">
            <li>
              <a href={brand.instagram.href} target="_blank" rel="noopener noreferrer" className="hover:text-fc-white">
                Instagram<span className="sr-only">, opens in a new tab</span>
              </a>
            </li>
            <li>
              <a href={brand.facebook.href} target="_blank" rel="noopener noreferrer" className="hover:text-fc-white">
                Facebook<span className="sr-only">, opens in a new tab</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 border-t border-fc-white/15 pt-8 text-center">
          <a
            href={builtByLunarLabs.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by LUNARLABS, opens lunarlabs.tech in a new tab"
            className="font-ns-victor text-xs tracking-[0.18em] text-fc-lemon uppercase hover:text-fc-white"
          >
            {builtByLunarLabs.label}
          </a>
        </div>
      </div>
    </footer>
  );
}
