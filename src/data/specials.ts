// The hero's specials deck, front card first.
// TODO(client): swap in the real specials, prices and photos (square, 1200px or larger). These stand in with menu items.

export type SpecialArt =
  /** A photo from scripts/prepare-images.mjs, served as /images/{photo}-{width}.webp. */
  | { photo: string; widths: number[]; alt: string }
  /** The till slip artwork, for the bring back your slip deal. */
  | 'till-slip';

export type Special = {
  name: string;
  blurb: string;
  /** The price sticker: a big value with an optional small word under it. */
  price: { value: string; label?: string };
  art: SpecialArt;
};

export const specials: Special[] = [
  {
    name: 'Hake and chips parcel',
    blurb: 'Hake of choice with regular 600g chips and tartare sauce.',
    price: { value: 'R125' },
    art: {
      photo: 'hero-hake',
      widths: [640, 1100],
      alt: 'Golden grilled hake on a basket of skin on chips with a lemon wedge, coleslaw and savoury rice on the side',
    },
  },
  {
    name: 'Fresh hake',
    blurb: 'Deep fried or grilled in our homemade recipe, with lemon and our signature tartare.',
    price: { value: 'R65', label: 'regular' },
    art: {
      photo: 'special-hake-basket',
      widths: [640, 860],
      alt: 'Battered hake and chips in a paper lined basket with a lemon wedge and a pot of tartare sauce',
    },
  },
  {
    // TODO(client): confirm the voucher terms (how long a slip stays valid, which stores, any exclusions).
    name: 'Bring back your till slip',
    blurb: 'Keep today’s slip and get 10% off your next order.',
    price: { value: '10%', label: 'off' },
    art: 'till-slip',
  },
];
