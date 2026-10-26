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

// Lenis smooth scroll with eased in page anchor jumps; off for reduced motion.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  document.addEventListener('click', (e) => {
    const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
    if (!anchor || anchor.pathname !== location.pathname) return;
    const el = document.getElementById(anchor.hash.slice(1));
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el, { offset: -72, duration: 1.4 });
    history.replaceState(null, '', anchor.hash);
  });
}
