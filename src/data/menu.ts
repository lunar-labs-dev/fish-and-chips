// The full menu, transcribed from the client's December 2025 PDF (Website-Mobile-Menu-V2.pdf).

export type MenuOption = { label: string; price: string };

export type MenuItem = {
  name: string;
  description?: string;
  /** Shown beside the name. Omitted when the item lists sized options instead. */
  price?: string;
  options?: MenuOption[];
  note?: string;
  greenvalleyOnly?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  tagline: string;
  intro?: string;
  items: MenuItem[];
};

// TODO(client): the PDF shows "R..." or "From R" with no amount for these. Confirm prices.
const ASK = 'Ask in store';

export const menuPdf = '/menu/the-fish-and-chip-shop-menu.pdf';

export const menuCategories: MenuCategory[] = [
  {
    id: 'fish',
    name: 'Fish',
    tagline: '#BatteredWithLove',
    items: [
      {
        name: 'Hake',
        description:
          'Responsibly sourced fresh hake, filleted and deep fried or grilled in our homemade recipe. Just add a squeeze of lemon and a side of our signature tartare sauce.',
        options: [
          { label: 'Regular', price: 'R65' },
          { label: 'Medium', price: 'R95' },
          { label: 'Large', price: 'R112' },
        ],
        note: 'Grilled hake is subject to an extra charge.',
      },
      {
        name: 'Pickled fish',
        description: 'A traditional favourite made with our homemade recipe. Offered with rice, fat cakes, a salad, or perfect on its own.',
        price: ASK,
      },
      {
        name: 'Calamari',
        description: 'Grilled Falklands calamari tubes or deep fried calamari strips, with homemade tartare or lemon butter sauce.',
        price: 'From R64',
      },
      {
        name: 'Mussel pot',
        description: '8 or 12 fresh mussels in our creamy lemon, garlic and herb sauce, with freshly made crostini bread sticks.',
        price: ASK,
      },
      {
        name: 'Prawns',
        description: '8 or 16 deep fried prawns smothered in the captain’s signature sauce.',
        price: 'From R85',
      },
    ],
  },
  {
    id: 'favourites',
    name: 'Favourites',
    tagline: 'Famous for more than just delish fish and chips',
    items: [
      {
        name: 'Hake and chips parcel',
        description: 'Hake of choice served with regular 600g chips and tartare sauce.',
        options: [
          { label: 'Regular', price: 'R125' },
          { label: 'Medium', price: 'R149' },
          { label: 'Large', price: 'R155' },
        ],
        note: 'Grilled hake is subject to an extra charge.',
      },
      {
        name: 'Russian and chips parcel',
        description: 'Mild, chilli or cheese, served with regular 600g chips.',
        price: 'From R99',
        greenvalleyOnly: true,
      },
      {
        name: 'Hake, calamari and a side',
        description: 'Regular hake, calamari, tartare sauce, and chips or rice.',
        price: 'From R160',
        note: 'Grilled is subject to an extra charge.',
      },
      {
        name: 'Strips, chips and dips',
        description: 'Calamari strips, prawns (optional), small 310g chips and 2 sauces.',
        price: 'From R119',
      },
      {
        name: 'Calamari and rice',
        description: 'Falklands calamari tubes freshly grilled with herbs and spices, basted in our signature lemon butter sauce.',
        price: 'R109',
      },
      {
        name: 'Seafood paella',
        description: 'Prawns, mussels and calamari with herbs and spices, in our signature mild, traditional or extra spicy rice.',
        price: 'From R159',
      },
    ],
  },
  {
    id: 'chips',
    name: 'Chips',
    tagline: 'Freshly hand cut and prepared unpeeled',
    intro: 'Slap or crispy, served with salt, vinegar and spice.',
    items: [
      { name: 'Snacker (250g)', price: 'R29' },
      { name: 'Small (310g)', price: 'R36' },
      { name: 'Regular (600g)', price: 'R49' },
      { name: 'Medium (1.2kg)', price: 'R92' },
      { name: 'Large (2kg)', price: 'R149' },
      // TODO(client): the PDF reads "From R50c". Confirm whether that is 50c or R5.
      { name: 'Chip sauces', description: 'Tomato, mustard, 1000 Island or peri mayo.', price: 'From 50c' },
    ],
  },
  {
    id: 'sausages',
    name: 'Sausages',
    tagline: 'Just delicious',
    intro: '165g of the most delicious recipe in the world.',
    items: [
      { name: 'Russians', description: 'Mild or chilli.', price: 'From R58', greenvalleyOnly: true },
      { name: 'Cheese griller', price: 'R69' },
      {
        name: 'Battered Russians',
        description: 'Mild, chilli or cheese.',
        price: 'From R60',
        note: 'Sausages are prepared separately.',
        greenvalleyOnly: true,
      },
    ],
  },
  {
    id: 'buns',
    name: 'Buns',
    tagline: 'Save our oceans, use your hands',
    items: [
      { name: 'Hake burger', description: 'Served with small 300g chips.', price: 'R119' },
      { name: 'Calamari burger', description: 'Served with small 300g chips.', price: 'R129' },
      { name: 'Tuna roll', description: 'Tuna in tartare mayo, capers, pickles and lettuce on a fresh 150g artisanal roll.', price: ASK },
      { name: 'Russian roll', description: 'Mild, chilli or cheese. It’s the vibe.', price: 'From R79', greenvalleyOnly: true },
      { name: 'Chip roll', price: 'R46' },
    ],
  },
  {
    id: 'wraps',
    name: 'Wraps',
    tagline: 'Hugs made of food',
    items: [
      { name: 'Seafood burrito', description: 'Our paella was that delicious, we decided to make it mobile.', price: 'R119' },
      { name: 'Hake wrap', description: 'Freshly wrapped up in flavour.', price: 'R95' },
      { name: 'Tuna wrap', description: 'Did we just make healthy delicious?', price: ASK },
      { name: 'Calamari wrap', description: 'The perfect reason not to share.', price: 'R109' },
    ],
  },
  {
    id: 'kotas',
    name: 'Kotas',
    tagline: '1.2kg of deliciousness',
    intro: 'A fresh farm loaf loaded with 600g chips, sauces, double cheese and topped with your pick.',
    items: [{ name: 'Hake or Russian kota', price: 'From R110', note: 'The Russian kota is only at Greenvalley.' }],
  },
  {
    id: 'sides',
    name: 'Sides',
    tagline: 'We all need a side dish',
    items: [
      { name: 'Onion rings', price: 'R29' },
      { name: 'Amagwinya (fat cakes)', price: 'R12' },
      { name: 'Savoury rice', price: 'From R19' },
      { name: 'Fresh rolls', price: 'R14' },
      { name: 'Fresh salads', description: 'Coleslaw, green salad, Mediterranean, or chakalaka bean salad.', price: ASK },
      {
        name: 'Homemade sauces',
        description: 'Tartare, lemon butter, mango or plain atchar, chilli sauce, peri mayo.',
        price: 'From R10',
      },
    ],
  },
  {
    id: 'kids',
    name: 'Kids',
    tagline: 'Dive in',
    intro: 'Each served with snacker 250g chips or small rice, and tartare sauce.',
    items: [
      { name: 'Small hake', price: 'From R89' },
      { name: 'Hake goujons', price: 'From R89' },
      { name: 'Hake nuggets', price: 'From R89' },
      { name: 'Battered Russian', price: 'From R80', greenvalleyOnly: true },
    ],
  },
];

export const menuSmallPrint = [
  'Menu items are based on raw weight, and weight may vary once cooked.',
  'Fresh fish may contain bones.',
  'Prices and promotions are subject to change without notice.',
];
