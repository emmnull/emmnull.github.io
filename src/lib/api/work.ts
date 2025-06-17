import { localized, unbase } from '$lib/common/content';
import {
  localizedModules,
  markdownModule,
  workSchema,
} from '$lib/common/schemas';
import { getLocale } from '$lib/i18n/generated/runtime';
import { error } from '@sveltejs/kit';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { z } from 'zod/v4';

const base = '/content/work/';

const data = unbase(
  import.meta.glob('/content/work/*/*.md', {
    eager: true,
  }),
  base,
);

const media = unbase(
  import.meta.glob<{
    default: Exclude<SvelteHTMLElements['enhanced:img']['src'], string>;
  }>('/content/work/**/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}', {
    eager: true,
    query: {
      enhanced: true,
    },
  }),
  base,
);

export function images<T extends z.infer<typeof workSchema>>(
  slug: string,
  metadata: T,
) {
  return {
    cover: 'cover' in metadata ? media[`${slug}/${metadata.cover}`] : undefined,
    banner:
      'banner' in metadata ? media[`${slug}/${metadata.banner}`] : undefined,
  };
}

export async function all() {
  return localizedModules(workSchema).parse(localized(data));
}

export async function one(slug: string) {
  const locale = getLocale();
  const k = `${slug}/${locale}.md`;
  if (!(k in data)) {
    error(404, { message: `No content found for slug ${slug}` });
  }
  const datum = data[k];
  return markdownModule(workSchema).parse(datum);
}
