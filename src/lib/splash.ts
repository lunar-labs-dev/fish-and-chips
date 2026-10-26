// Resolves as the fish splash starts fading (or on click), or straight away when it isn't playing.
export const splashDone: Promise<void> = new Promise((resolve) => {
  const el = typeof document === 'undefined' ? null : document.getElementById('splash');
  if (!el || !document.documentElement.classList.contains('splash')) return resolve();
  el.addEventListener('click', () => resolve());
  // Read the fade's start from the overlay's own CSS animation, so the timing lives only in global.css.
  // Wait a frame first: in dev, Vite injects the stylesheet from this same module graph.
  requestAnimationFrame(() => {
    const fade = el.getAnimations().find((a) => a instanceof CSSAnimation && a.animationName === 'splash-out');
    const startsIn = Number(fade?.effect?.getTiming().delay ?? 0) - Number(fade?.currentTime ?? 0);
    setTimeout(resolve, Math.max(0, startsIn));
  });
});
