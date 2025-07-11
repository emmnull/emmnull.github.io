import { z } from 'zod/v4';
import { defineConfig } from './plugins/markdown/index.ts';
import { uniqueItemsSchema } from './src/lib/common/schema.ts';
import { disciplines, tags } from './src/lib/data/meta.ts';
import { locales } from './src/lib/i18n/generated/runtime.js';
import { extensions } from './svelte.config.js';

export default defineConfig({
  extensions,
  collections: {
    works: {
      directory: 'content/works/',
      pattern: `*/{${locales.join(',')},}{${extensions.join(',')},}`,
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
    },
  },
});
