// GSAP setup shared by every section: plugins, plus the spec's reduced motion aware context hook.
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'motion/react';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Runs GSAP setup inside a context that reverts on unmount; skipped entirely under reduced motion. */
export function useGsapContext(setup: () => void | (() => void), deps: ReadonlyArray<unknown> = []) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(setup);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}
