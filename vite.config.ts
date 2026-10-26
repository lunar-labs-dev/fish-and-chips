import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { brand, stores } from './src/data/site.ts';

// Injects Restaurant JSON-LD for every store into the home page, from the same data the store finder renders.
function restaurantJsonLd(): Plugin {
  return {
    name: 'restaurant-json-ld',
    transformIndexHtml(_html, ctx) {
      if (ctx.path !== '/index.html') return;
      const data = {
        '@context': 'https://schema.org',
        '@graph': stores.map((s) => ({
          '@type': 'Restaurant',
          '@id': `${brand.url}/#${s.id}`,
          name: `${brand.name} ${s.name}`,
          servesCuisine: ['Fish and chips', 'Seafood'],
          url: brand.url,
          image: `${brand.url}/og-image.jpg`,
          telephone: `+27${s.phone.replace(/\s/g, '').slice(1)}`,
          email: s.email,
          hasMenu: `${brand.url}/#menu`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: s.address.join(', '),
            addressLocality: s.city,
            postalCode: s.postcode,
            addressRegion: 'Gauteng',
            addressCountry: 'ZA',
          },
          sameAs: [brand.instagram.href, brand.facebook.href],
        })),
      };
      return [{ tag: 'script', attrs: { type: 'application/ld+json' }, children: JSON.stringify(data).replace(/</g, '\u003c'), injectTo: 'head' }];
    },
  };
}

// GitHub Pages preview builds set BASE_PATH (e.g. /fish-and-chips/); those stay out of search so they never compete with the live site.
const base = process.env.BASE_PATH ?? '/';

function noindexPreview(): Plugin {
  return {
    name: 'noindex-preview',
    transformIndexHtml: () => (base === '/' ? [] : [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' }, injectTo: 'head' }]),
  };
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), restaurantJsonLd(), noindexPreview()],
  // Matches the @/ path alias in tsconfig.json, which shadcn uses for React Bits components.
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    target: 'es2020',
    rollupOptions: {
      input: { main: 'index.html', invest: 'invest/index.html' },
    },
  },
});
