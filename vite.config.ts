import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { z } from 'zod/v4';
import markdown, { defineCollections } from './plugins/markdown';
import { uniqueItemsSchema } from './src/lib/common/schema';
import { disciplines, tags } from './src/lib/data/meta';
import { locales } from './src/lib/i18n/generated/runtime';
import { extensions } from './svelte.config';

const collections = defineCollections({
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
});

declare module 'virtual:works' {
  interface Collection {
    schema: (typeof collections)['works']['schema'];
  }
}

export default defineConfig({
  plugins: [
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/i18n/generated',
      strategy: ['url', 'cookie', 'baseLocale'],
    }),
    markdown({
      extensions,
      collections,
    }),
    tailwindcss(),
    enhancedImages(),
    sveltekit(),
  ],
  server: {
    port: 9000,
    fs: {
      // allow importing from ../content
      allow: ['..'],
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
