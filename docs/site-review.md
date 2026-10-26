# The Fish and Chip Shop: current site review

Reviewed 2026-10-26 against <https://www.thefishandchipshop.co.za> (WordPress 7.0.4 with Elementor).

## What the business is

A family run fish and chip takeaway in Johannesburg, trading since 2018. The founding story is two
neighbouring shops (a chippie and a green grocer), two kids who grew up between them (Nic and
Daniela), who later married and built the brand with Nelson and Eddie. Press calls it "Joburg's
most authentic fish and chip takeaway" (JHB In Your Pocket).

## Content inventory

| Page | What is on it |
|---|---|
| Home | Hero photo of hake and chips on a newspaper, three pill buttons (Menu, Stores, Invest), "Who we are" blurb, press quote carousel, Instagram feed, news link |
| Stores (`/contact/`) | Victoria Yards, Greenvalley, Parkrand. Phone, email and address for each. "Coming soon" list: Waterfall Ridge Midrand (Sept 2026), Northern Suburbs, East Rand, Pretoria |
| Origin story (`/about/`) | The founding story, set as text inside a newspaper image |
| News (`/news/`) | 702 radio interview, Find Glocal, Times Live, Daily Maverick, Sowetan Live, 2 Summers, JHB In Your Pocket |
| Invest (`/invest-query/`) | Three yes/no qualifier questions (R400k+ capital, existing site, silent or active operator) plus T&Cs for FCS Group Pty Ltd |
| Menu | The Menu button opens a "New menu coming soon" JPG. The footer links a PDF menu from Dec 2025 |

Store contacts:

| Store | Phone | Email | Address |
|---|---|---|---|
| Victoria Yards | 078 538 6436 | vy@ | Shop 6C, 16 Viljoen St, Lorentzville, 2094 |
| Greenvalley | 063 254 2348 | gv@ | Shop 9A, Greenvalley Shopping Centre, 88 Stoneridge Dr, Greenstone Hill, 1609 |
| Parkrand | 063 435 9248 | parkrand@ | Shop 2, 44 Van Wyk Louw Dr, Parkrand, Boksburg, 1459 |

HQ email: hq@thefishandchipshop.co.za. Instagram `@thefishandchipshop_sa`, Facebook `TheFishandChipShopSA`.

## What works

- Strong, ownable brand world. The shield logo, wood table, newspaper wrap, white subway tiles and
  rope all say "proper British chippie" without explanation.
- Real press. Seven named outlets is better social proof than most restaurants have.
- A genuine origin story with names in it.
- Light page weight (about 260 KB transferred on mobile, load event under 1 s on a fast line).

## Problems

1. **No menu.** The main Menu button shows a "coming soon" poster. The real menu is a PDF that
   downloads instead of opening. A hungry visitor cannot see what is sold or what it costs.
2. **No way to order.** No order link, no delivery partner links, no trading hours anywhere.
3. **Key content is locked in images.** The whole origin story is text inside a newspaper JPG, so
   Google and screen readers get nothing, and it does not reflow on phones.
4. **Navigation is hidden.** Desktop and mobile both hide nav behind one hamburger. "Stores" lives at
   `/contact/`, which is confusing.
5. **Repetitive home page.** The press carousel renders every quote three times in the DOM.
6. **Stale social.** The Instagram feed shows posts from early 2024 ("2024 Resolutions").
7. **SEO gaps.** The only `<h1>` is "WHO WE ARE". No `og:image`, so shared links have no preview.
   No `Restaurant` or `LocalBusiness` schema, no opening hours, no map links. Five images have no
   alt text.
8. **Horizontal scroll** on the About page at 800 px wide (the newspaper overflows).
9. **Invest form is thin.** Three radio buttons and no context about what a franchise involves.
10. **Broken link.** The footer's Invest link points at `/application/`, which is a 404.
11. **Footer copyright says 2025.**

## Redesign goals

1. Menu first. A real, readable, searchable menu in HTML, one tap from anywhere.
2. Find a store in one tap: hours, call, directions, per store.
3. Keep the chippie soul (newspaper, tiles, salt and vinegar) but make it feel 2026: big type,
   confident colour, real photography, smooth motion.
4. Story and press as real text, so it ranks and reads on phones.
5. A proper franchise section that sells the opportunity before asking qualifier questions.
6. `Restaurant` schema per store, OG images, one clear `<h1>`.

## Open questions for the client

- The current menu with prices (the Dec 2025 PDF, or the new one that is "coming soon").
- Trading hours per store.
- Online ordering: Uber Eats, Mr D, own system, or call ahead only?
- Original photography and the logo as vector (SVG or AI).
- Is the Waterfall Ridge opening still September 2026, or has it opened?
