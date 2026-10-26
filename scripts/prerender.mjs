// Injects server rendered HTML into the built pages so crawlers get full content without JavaScript.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const ssrDir = resolve('dist-ssr');
const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const pages = [
  ['dist/index.html', 'home'],
  ['dist/invest/index.html', 'invest'],
];

for (const [file, id] of pages) {
  const html = readFileSync(file, 'utf8');
  const empty = `<div id="root" data-page="${id}"></div>`;
  if (!html.includes(empty)) throw new Error(`${file}: empty #root not found`);
  writeFileSync(file, html.replace(empty, `<div id="root" data-page="${id}">${render(id)}</div>`));
  console.log(`prerendered ${file}`);
}

rmSync(ssrDir, { recursive: true, force: true });
