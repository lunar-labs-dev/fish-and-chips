import { useEffect, useState } from 'react';
import { brand, navLinks, stores, telHref } from '../data/site';
import { url } from '../lib/url';
import type { PageId } from '../pages';

// A wax paper pill floating off the top edge: logo and links on desktop, a full height panel on mobile.
export function Navbar({ page }: { page: PageId }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const current = (href: string) => (page === 'invest' && href === '/invest/' ? 'page' : undefined);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Main"
        className="flex w-full items-center justify-between gap-6 rounded-full border border-fc-ink/15 bg-fc-paper/70 py-2 pr-2 pl-4 shadow-[0_8px_24px_-16px_rgb(7_7_7/0.4)] backdrop-blur-md lg:w-auto"
      >
        <a href={url('/')} aria-label={`${brand.name}, home`} className="block shrink-0">
          <img src={url('/images/logo-360.webp')} alt="" width={360} height={243} className="w-12" />
        </a>

        <ul className="m-0 hidden list-none items-center gap-1 p-0 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={url(l.href)}
                aria-current={current(l.href)}
                className="block rounded-full px-3 py-2 text-sm font-semibold text-fc-ink transition-colors duration-300 ease-fc-out hover:bg-fc-ink/5 hover:text-fc-red aria-[current=page]:bg-fc-ink aria-[current=page]:text-fc-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="relative z-10 grid size-10 place-items-center rounded-full bg-fc-ink text-fc-white transition-transform duration-300 ease-fc-out active:scale-[0.98] lg:hidden"
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-500 ease-fc-out top-0 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-full bg-current transition-transform duration-500 ease-fc-out top-2.5 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 -z-10 flex flex-col bg-fc-paper/95 pt-24 backdrop-blur-xl transition-opacity duration-300 ease-fc-out lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="m-0 flex flex-1 list-none flex-col justify-center gap-2 px-6 py-0">
          {navLinks.map((l, i) => (
            <li
              key={l.href}
              className={`transition-[opacity,transform] duration-500 ease-fc-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
              style={{ transitionDelay: open ? `${Math.min(i * 60, 400)}ms` : '0ms' }}
            >
              <a
                href={url(l.href)}
                aria-current={current(l.href)}
                onClick={() => setOpen(false)}
                className="block py-2 text-5xl font-bold tracking-tight text-fc-ink hover:text-fc-red aria-[current=page]:text-fc-red"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-fc-ink/15 px-6 py-6">
          <p className="kicker m-0 mb-3">Call your nearest shop</p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {stores.map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-4 text-base">
                <span>{s.name}</span>
                <a href={telHref(s.phone)} className="link-underline font-mono text-sm">
                  {s.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
