import { useEffect, useRef } from 'react';

const LINES = ['Two families.', 'One Joburg street.', 'Battered with love,', 'wrapped up in fate.'];

// The big type moment: each word inks in from a faded print as it crosses a line 60% down the screen.
export function Tagline() {
  const root = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const words = root.current!.querySelectorAll('[data-word]');
    console.assert(words.length > 0, 'Tagline has no words to ink in');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-inked', '');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -40% 0px' },
    );
    words.forEach((w) => io.observe(w));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-label="Our promise" className="border-y-4 border-double border-fc-ink/80 py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p ref={root} className="m-0 max-w-[680px] text-4xl font-bold tracking-tight md:text-6xl">
          {LINES.map((line, l) => (
            <span key={l} className="contents">
              {line.split(' ').map((w, i) => (
                <span key={i} data-word className="transition-colors duration-500 ease-fc-out [.js_&]:text-fc-ink/30 [.js_&]:data-inked:text-fc-ink">
                  {w}{' '}
                </span>
              ))}
              {l < LINES.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
