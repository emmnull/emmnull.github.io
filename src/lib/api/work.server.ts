import { meta, unext } from '$lib/common/markdown';
import { workSchema } from '$lib/common/schemas';
import { getLocale } from '$lib/i18n/generated/runtime';
import { basename, dirname } from 'path';
import type { z } from 'zod/v4';

const files = unext(
  import.meta.glob('/content/work/**/*.(md|json)', {
    eager: true,
  }),
  '/content/work/',
);

export async function all() {
  const locale = getLocale();
  const entries: Record<string, z.infer<typeof workSchema>> = {};
  for (const p in files) {
    const name = basename(p);
    const slug = dirname(p);
    if (slug in entries) {
      continue;
    }
    const index = name === 'index' ? files[p] : files[`${slug}/index`];
    const localized = name === locale ? files[p] : files[`${slug}/${locale}`];
    const merged = meta(index, localized);
    entries[slug] = workSchema.partial().parse(merged);
  }
  return entries;
}

export async function one(slug: string) {
  const locale = getLocale();
  // coalese
  // parse metadata
}
