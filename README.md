# The Fish & Chip Shop

Redesign of <https://www.thefishandchipshop.co.za>, a family run fish and chip takeaway in Johannesburg.
The review of the old site and the redesign goals are in [docs/site-review.md](docs/site-review.md).

## Stack

- Vite 8, React 19, TypeScript, Tailwind CSS 4, Lenis smooth scroll
- Two pages: the one page home (`index.html`) and the investor page (`invest/index.html`)
- Both pages are prerendered at build time (`scripts/prerender.mjs`), so crawlers get full HTML
- `Restaurant` JSON-LD for every store is generated from `src/data/site.ts` in `vite.config.ts`

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck, client build, SSR build, prerender into ./dist
npm run preview  # serve ./dist
npm run images   # rebuild public/images from the originals in assets-src/
```

## Preview deploy

Every push to `main` runs [.github/workflows/pages.yml](.github/workflows/pages.yml), which builds with
`BASE_PATH=/fish-and-chips/` and publishes to https://lunar-labs-dev.github.io/fish-and-chips/. Builds with a
`BASE_PATH` also get a `noindex` tag, so the preview stays out of search results. A normal `npm run build`
targets the domain root and is indexable.

## Editing content

All copy, stores, press quotes and menu items live in [src/data/site.ts](src/data/site.ts). The
investor requirements and terms live in [src/data/invest.ts](src/data/invest.ts).

## Waiting on the client

- Menu prices. [src/data/menu.ts](src/data/menu.ts) is transcribed from the December 2025 PDF
  (also served at `/menu/the-fish-and-chip-shop-menu.pdf`). Five prices were blank in the PDF and
  show "Ask in store", and chip sauces read "From R50c". Swap in the new menu when it is final.
- Trading hours per store.
- Whether Waterfall Ridge has opened.
- The logo as a vector file, and higher resolution photography.
- A form backend for the investor application. Until then it opens a prefilled email to head office.
