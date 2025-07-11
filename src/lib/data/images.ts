import type { SvelteHTMLElements } from 'svelte/elements';

export const images = import.meta.glob<SvelteHTMLElements['enhanced:img']>(
  '/content/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
  { eager: true, query: { enhanced: true } },
);
