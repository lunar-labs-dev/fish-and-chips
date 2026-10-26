// A printed till slip in type, with a torn zigzag foot. Every size is in em, so the parent's font size scales the whole slip.
export function TillSlip({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`drop-shadow-[0_1em_1.2em_rgb(35_31_32/0.28)] ${className}`}>
      <div className="w-[18em] bg-[linear-gradient(#fff,#f6f4ef)] px-[1.5em] pt-[1.6em] pb-[2.2em] font-ns-victor leading-snug text-fc-ink [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/1.1em_100%]">
        <p className="m-0 text-center text-[1.15em] font-bold">The Fish &amp; Chip Shop</p>
        <p className="m-0 text-center italic">Battered with love</p>
        <Rule />
        <Line left="1  Hake and chips" right="R125" />
        <Line left="1  Onion rings" right="R29" />
        <Rule />
        <Line left="Total" right="R154" bold />
        <Rule />
        <p className="m-0 text-center text-[2.7em] leading-none font-bold">10% off</p>
        <p className="mt-[0.3em] mb-0 text-center italic">your next order</p>
        <p className="mt-[0.8em] mb-0 text-center text-[0.8em] text-fc-ink-soft">Bring this slip back next time.</p>
        <div className="mx-auto mt-[1em] h-[2.2em] w-4/5 bg-[repeating-linear-gradient(90deg,var(--color-fc-ink)_0_2px,transparent_2px_4px,var(--color-fc-ink)_4px_7px,transparent_7px_9px,var(--color-fc-ink)_9px_10px,transparent_10px_13px)]" />
      </div>
    </div>
  );
}

function Rule() {
  return <div className="my-[0.7em] border-t-2 border-dashed border-fc-ink/45" />;
}

function Line({ left, right, bold = false }: { left: string; right: string; bold?: boolean }) {
  return (
    <p className={`m-0 flex justify-between gap-[1em] whitespace-pre ${bold ? 'font-bold' : ''}`}>
      <span>{left}</span>
      <span>{right}</span>
    </p>
  );
}
