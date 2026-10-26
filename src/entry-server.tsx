// Server render entry used at build time by scripts/prerender.mjs to bake HTML into dist/.
import { renderToString } from 'react-dom/server';
import { Page, type PageId } from './pages';

export const render = (id: PageId) => renderToString(<Page id={id} />);
