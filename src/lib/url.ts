// Prefixes a root path with Vite's base, so one build works at / and under a GitHub Pages subpath.
export const url = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');
