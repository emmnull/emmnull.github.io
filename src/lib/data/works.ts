import { createCollection, createOne } from '$lib/common/content';
import { workSchema } from '$lib/common/schema';
import type { SvelteHTMLElements } from 'svelte/elements';

export const images = import.meta.glob(
  './**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
  {
    eager: true,
    base: '/content/works/',
    query: {
      enhanced: true,
    },
    import: 'default',
  },
) as Partial<
  Record<string, Exclude<SvelteHTMLElements['enhanced:img']['src'], string>>
>;

export const all = createCollection(
  workSchema,
  import.meta.glob('./*/*.md', {
    base: '/content/works/',
    eager: true,
  }),
);

export const one = createOne(workSchema, '/content/works/');
