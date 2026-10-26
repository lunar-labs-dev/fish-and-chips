// Single source of truth for every piece of client content on the site.

export type Store = {
  id: string;
  name: string;
  area: string;
  /** Extra words the store finder matches on (suburbs, regions, nearby landmarks). */
  keywords: string[];
  address: string[];
  postcode: string;
  city: string;
  phone: string;
  email: string;
};

export type PressQuote = {
  outlet: string;
  quote: string;
  href?: string;
  year?: number;
};

export const brand = {
  name: 'The Fish & Chip Shop',
  legalName: 'FCS Group Pty Ltd',
  founded: 2018,
  url: 'https://www.thefishandchipshop.co.za',
  hqEmail: 'hq@thefishandchipshop.co.za',
  instagram: { handle: '@thefishandchipshop_sa', href: 'https://www.instagram.com/thefishandchipshop_sa/' },
  facebook: { handle: 'TheFishandChipShopSA', href: 'https://www.facebook.com/TheFishandChipShopSA' },
};

export const stores: Store[] = [
  {
    id: 'victoria-yards',
    name: 'Victoria Yards',
    area: 'Lorentzville, Johannesburg',
    keywords: ['lorentzville', 'bertrams', 'troyeville', 'kensington', 'jeppestown', 'joburg', 'johannesburg', 'cbd', 'east'],
    address: ['Shop 6C, Victoria Yards', '16 Viljoen Street', 'Lorentzville'],
    postcode: '2094',
    city: 'Johannesburg',
    phone: '078 538 6436',
    email: 'vy@thefishandchipshop.co.za',
  },
  {
    id: 'greenvalley',
    name: 'Greenvalley',
    area: 'Greenstone Hill, Johannesburg',
    keywords: ['greenstone', 'edenvale', 'modderfontein', 'linksfield', 'bedfordview', 'east rand'],
    address: ['Shop 9A, Greenvalley Shopping Centre', '88 Stoneridge Drive', 'Greenstone Hill'],
    postcode: '1609',
    city: 'Johannesburg',
    phone: '063 254 2348',
    email: 'gv@thefishandchipshop.co.za',
  },
  {
    id: 'parkrand',
    name: 'Parkrand',
    area: 'Boksburg',
    keywords: ['boksburg', 'benoni', 'brakpan', 'east rand', 'ekurhuleni'],
    address: ['Shop 2', '44 Van Wyk Louw Drive', 'Parkrand'],
    postcode: '1459',
    city: 'Boksburg',
    phone: '063 435 9248',
    email: 'parkrand@thefishandchipshop.co.za',
  },
];

// TODO(client): confirm whether Waterfall Ridge has opened (the old site said September 2026).
export const comingSoon = ['Waterfall Ridge, Midrand', 'Northern Suburbs', 'East Rand', 'Pretoria'];

export const press: PressQuote[] = [
  {
    outlet: 'Daily Maverick',
    quote: 'The Fish and Chip Shop serves hake and chips so authentic you could be in a London chippie.',
    href: 'https://www.dailymaverick.co.za/article/2019-06-07-victoria-yards-joburgs-hidden-gem/',
    year: 2019,
  },
  {
    outlet: 'Johannesburg In Your Pocket',
    quote: 'Joburg’s most authentic fish and chip takeaway.',
    href: 'https://www.inyourpocket.com/johannesburg/where-to-eat-and-drink-at-victoria-yards_75272f',
  },
  {
    outlet: 'Sowetan Live',
    quote:
      'Good old fashioned fried fish and chips is hard to find in Jozi. A large portion of hake and chips fried with the potato skin still intact is enough for two. The battered calamari is even better.',
    href: 'https://www.sowetanlive.co.za/sundayworld/lifestyle/2019-04-17-the-ol-pits-turned-into-a-hip-place/',
    year: 2019,
  },
  {
    outlet: 'Times Live',
    quote: 'There’s a fantastic fish and chip shop.',
    href: 'https://www.timeslive.co.za/sunday-times/lifestyle/home-and-gardening/2018-09-29-7-great-reasons-to-visit-victoria-yards-a-creative-oasis-in-inner-city-joburg/',
    year: 2018,
  },
  {
    outlet: '2 Summers',
    quote: 'These fish and chips are really, really good.',
  },
  {
    outlet: 'Find Glocal',
    quote: 'A restaurant battered with love, sprinkled with passion and wrapped up in fate.',
    href: 'http://www.findglocal.com/ZA/Johannesburg/220451041879815/The-Fish-%26-Chip-Shop',
  },
];

export const interview702 = {
  title: 'We told our story on 702',
  description: 'Azania Mosaka invited us onto her show to talk about the shop and why this passion project means so much to everyone involved.',
  href: 'https://www.702.co.za/podcasts/128/the-best-of-azania-mosaka-show/270439/food-feature-the-fish-and-chip-shop-and-sobae',
};

export const story = [
  'Unlike most fish tales, ours is baited with love and anchored in truth. It starts nearly two decades ago on a busy street in Johannesburg, where two shops opened next door to each other: a fish and chip takeaway and a green grocer.',
  'Both families had young children who grew up in those shops, Nic and Daniela. They became friends and played in the street together, always with the smell of fish and chips in the air.',
  'Like the ocean currents, their paths drifted apart over the years. But the memories stayed, and so did that aroma, always taking them back to the same street.',
  'Some say there are plenty of fish in the sea, but fate decided otherwise. The two found each other again, fell hook, line and sinker, married, and welcomed their first child, Catalina.',
  'Inspired by their story, they decided to honour their families’ legacy. Together with Nelson (Nic’s brother and all round nice guy) and Eddie (Daniela’s father, and the owner of that green grocer all those years ago), the four of them built a brand that celebrates those times, when all you need is a little love and a lot of fish.',
];

export const navLinks = [
  { label: 'Menu', href: '/#menu' },
  { label: 'Stores', href: '/#stores' },
  { label: 'Our story', href: '/#story' },
  { label: 'Press', href: '/#press' },
  { label: 'Invest', href: '/invest/' },
];

export const builtByLunarLabs = { label: 'Built by LUNARLABS', href: 'https://www.lunarlabs.tech' };

/** Builds a Google Maps search link for a store's street address. */
export function mapsHref(store: Store) {
  const q = [brand.name, ...store.address, store.city, store.postcode].join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Turns a local SA number like "078 538 6436" into a tel: link in international format. */
export function telHref(phone: string) {
  return `tel:+27${phone.replace(/\s/g, '').replace(/^0/, '')}`;
}
