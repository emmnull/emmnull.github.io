import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod/v4';
import { uniqueItemsSchema } from './src/lib/common/schema';
import { disciplines, tags } from './src/lib/data/meta';
import { locales } from './src/lib/i18n/generated/runtime';
import { extensions } from './svelte.config';

function group(arr: string[] | readonly string[]) {
  if (!arr.length) {
    return '';
  }
  if (arr.length === 1) {
    return arr[0];
  }
  return `{${arr.join(',')}}`;
}

const include = `*/${group(locales)}${group(extensions)}`;

export default defineConfig({
  collections: [
    defineCollection({
      name: 'works',
      directory: 'content/works',
      include,
      schema: z.object({
        year: z.number(),
        title: z.string(),
        shortTitle: z.string().optional(),
        disciplines: uniqueItemsSchema(z.enum(disciplines).array()).optional(),
        tags: uniqueItemsSchema(z.enum(tags).array()).optional(),
        summary: z.string().optional(),
        covers: z.string().optional().array(),
        banner: z.string().optional(),
        link: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
        code: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
      }),
    }),
    defineCollection({
      name: 'posts',
      directory: 'content/posts',
      include,
      schema: z.object({
        createdAt: z.iso.date(),
        updatedAt: z.iso.date(),
        tags: uniqueItemsSchema(z.enum(tags).array()),
        title: z.string(),
        shortTitle: z.string().optional(),
        summary: z.string().optional(),
        cover: z.string().optional(),
        banner: z.string().optional(),
        links: z
          .object({
            url: z.url({
              protocol: /^https?$/,
              hostname: z.regexes.domain,
            }),
            label: z.string(),
            description: z.string().optional(),
          })
          .array()
          .optional(),
      }),
    }),
  ],
});
