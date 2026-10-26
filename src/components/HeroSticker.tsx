// The lemon year badge, stuck fast to the corner of the specials deck.
export function HeroSticker({ year }: { year: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute -top-6 -left-2 z-20 grid size-28 -rotate-12 place-items-center rounded-full border-[5px] border-fc-white bg-fc-lemon text-center font-ns-victor text-fc-ink shadow-[0_12px_24px_-10px_rgb(35_31_32/0.45)] md:-left-8 md:size-36 md:border-[6px]"
    >
      <span className="text-xs leading-tight font-semibold md:text-sm">
        Fried fresh
        <br />
        <span className="text-2xl font-bold md:text-3xl">{year}</span>
        <br />
        <span className="italic">to now</span>
      </span>
    </div>
  );
}
