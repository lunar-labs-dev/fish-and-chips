// Adds .is-visible to .reveal elements as they scroll into view.
export function initReveal(): () => void {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  const observe = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el));
  observe();
  // The store finder re-renders cards on search, so pick up any new ones.
  const mo = new MutationObserver(observe);
  mo.observe(document.querySelector('main')!, { childList: true, subtree: true });
  return () => {
    io.disconnect();
    mo.disconnect();
  };
}
