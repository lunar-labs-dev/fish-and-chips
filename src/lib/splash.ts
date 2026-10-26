// Resolves as the fish splash starts fading (1.85s into the page, or on click), or straight away when it isn't playing.
export const splashDone: Promise<void> = new Promise((resolve) => {
  const el = typeof document === 'undefined' ? null : document.getElementById('splash');
  if (!el || !document.documentElement.classList.contains('splash')) return resolve();
  // Page time, not an event, so a slow script load can't miss the moment; matches --animate-splash-out's delay.
  setTimeout(resolve, Math.max(0, 1850 - performance.now()));
  el.addEventListener('click', () => resolve());
});
