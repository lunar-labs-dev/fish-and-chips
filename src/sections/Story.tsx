import { story } from '../data/site';
import { url } from '../lib/url';

// The founding story as readable text, beside the family's polaroids with the closing line pinned under them.
export function Story() {
  return (
    <section id="story" className="scroll-mt-20 overflow-hidden py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="order-2 lg:order-1">
          <img
            src={url('/images/story-polaroids-684.webp')}
            alt="Three polaroids: hanging the first Fish and Chip Shop sign, the family behind the counter, and a hand squeezing lemon over hake and chips"
            width={684}
            height={816}
            loading="lazy"
            className="reveal mx-auto block w-full max-w-md lg:max-w-lg"
          />
          <figure className="reveal mx-auto mt-10 mb-0 max-w-md lg:max-w-lg rounded-sm bg-fc-ink p-8 text-fc-white md:p-10">
            <blockquote className="m-0 text-2xl leading-snug md:text-3xl">
              And so The Fish &amp; Chip Shop was born. A restaurant battered with love, sprinkled with passion and{' '}
              <span className="text-fc-peach">wrapped up in fate.</span>
            </blockquote>
          </figure>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="reveal m-0 text-5xl leading-none md:text-7xl">
            Wrapped up in <span className="text-fc-red">fate</span>
          </h2>
          <div className="mt-10 flex flex-col gap-6 text-xl leading-relaxed text-fc-ink-soft">
            {story.map((p, i) => (
              <p
                key={i}
                className={`reveal m-0 ${i === 0 ? 'text-fc-ink first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter: first-letter:text-7xl first-letter:font-bold first-letter:leading-none first-letter:text-fc-red' : ''}`}
              >
                {p}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
