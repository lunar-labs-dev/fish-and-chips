import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';
import { splashDone } from './lib/splash';
import { Page, type PageId } from './pages';
import './styles/global.css';

// Hold the hero's GSAP intro (SplitText) until the fish splash starts fading, so it plays where it can be seen.
gsap.globalTimeline.pause();
splashDone.then(() => gsap.globalTimeline.resume());

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; dev starts empty.
const root = document.getElementById('root')!;
const page = (
  <StrictMode>
    <Page id={(root.dataset.page as PageId) ?? 'home'} />
  </StrictMode>
);
if (root.hasChildNodes()) hydrateRoot(root, page);
else createRoot(root).render(page);

// Lenis smooth scroll; off for reduced motion.
const lenis = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? null : new Lenis({ lerp: 0.09, smoothWheel: true });
if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

// Links to this same page scroll instead of reloading: #section links ease to it, and links home (the logo) ease to the top.
// From any other page they navigate as normal, and modified clicks still open new tabs.
document.addEventListener('click', (e) => {
  const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
  if (!anchor || anchor.origin !== location.origin || anchor.pathname !== location.pathname || anchor.target) return;
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const el = anchor.hash ? document.getElementById(anchor.hash.slice(1)) : null;
  if (anchor.hash && (!el || !lenis)) return; // the browser jumps to the section itself
  e.preventDefault();
  if (lenis) lenis.scrollTo(el ?? 0, { offset: el ? -72 : 0, duration: 1.4 });
  else window.scrollTo(0, 0);
  history.replaceState(null, '', anchor.hash || location.pathname);
});
