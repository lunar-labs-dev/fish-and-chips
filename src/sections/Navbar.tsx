import { useEffect, useState } from 'react';
import { brand, navLinks, stores, telHref } from '../data/site';
import { url } from '../lib/url';

// Hanging shield logo, inline links on desktop, full screen drawer on mobile.
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`absolute inset-0 border-b transition-[background-color,border-color] duration-500 ${
          scrolled ? 'border-fc-grout bg-fc-white/92 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
        aria-hidden="true"
      />
      <nav aria-label="Main" className="relative mx-auto flex h-16 max-w-7xl items-start justify-between px-4 md:h-20 md:px-8">
        <a href={url('/')} aria-label={`${brand.name}, home`} className="relative z-10 block">
          <img
            src={url('/images/logo-360.webp')}
            alt=""
            width={360}
            height={243}
            className={`w-24 drop-shadow-[0_8px_16px_rgb(35_31_32/0.12)] transition-[width] duration-500 ease-fc-out md:w-32 ${scrolled ? 'md:w-24' : ''}`}
          />
        </a>

        <ul className="hidden items-center gap-1 self-center lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={url(l.href)}
                className="rounded-full px-4 py-2 font-ns-victor text-sm font-medium text-fc-ink transition-colors hover:bg-fc-tile hover:text-fc-red"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a href={url('/#stores')} className="btn-red px-5! py-2.5!">
              Find a store
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Open menu"
          className="relative z-10 mt-3 grid size-11 place-items-center rounded-full border-2 border-fc-ink bg-fc-white md:mt-4 lg:hidden"
        >
          <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
            <span className="h-0.5 w-full bg-fc-ink" />
            <span className="h-0.5 w-full bg-fc-ink" />
            <span className="h-0.5 w-3/4 bg-fc-ink" />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-tiles transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex h-16 items-start justify-between px-4">
          <img src={url('/images/logo-360.webp')} alt="" width={360} height={243} className="w-24" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="mt-3 grid size-11 place-items-center rounded-full border-2 border-fc-ink bg-fc-white"
          >
            <span className="relative block size-5" aria-hidden="true">
              <span className="absolute top-1/2 left-0 h-0.5 w-full rotate-45 bg-fc-ink" />
              <span className="absolute top-1/2 left-0 h-0.5 w-full -rotate-45 bg-fc-ink" />
            </span>
          </button>
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
          {navLinks.map((l, i) => (
            <li
              key={l.href}
              className={`transition-[opacity,transform] duration-500 ease-fc-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              <a
                href={url(l.href)}
                onClick={() => setOpen(false)}
                className="block py-2 font-fc-logo text-4xl tracking-[-0.01em] text-fc-ink hover:text-fc-red"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="border-t border-fc-grout bg-fc-white px-6 py-6">
          <p className="m-0 mb-3 font-ns-victor text-sm font-semibold">Call your nearest shop</p>
          <ul className="grid gap-2">
            {stores.map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-4 text-base">
                <span>{s.name}</span>
                <a href={telHref(s.phone)} className="link-underline font-ns-victor text-sm">
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
