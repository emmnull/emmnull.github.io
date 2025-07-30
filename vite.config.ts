import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { z } from 'zod/v4';
import markdown, { defineCollections } from './plugins/markdown';
import {
  IMAGE_PATH_PATTERN,
  VIDEO_PATH_PATTERN,
} from './plugins/markdown/utils';
import i18n from './project.inlang/settings.json' with { type: 'json' };
import {
  enhancedImgPathTransform,
  uniqueItemsSchema,
} from './src/lib/common/schema';
import { disciplines, tags } from './src/lib/data/meta';
import { extensions } from './svelte.config';

const collections = defineCollections({
  works: {
    directory: 'content/works/',
    pattern: `*/{${i18n.locales.join(',')},}{${extensions.join(',')},}`,
    schema: z.object({
      year: z.number(),
      title: z.string(),
      shortTitle: z.string().optional(),
      disciplines: uniqueItemsSchema(z.enum(disciplines).array()).optional(),
      tags: uniqueItemsSchema(z.enum(tags).array()).optional(),
      summary: z.string().optional(),
      images: z
        .union([
          z.string().regex(IMAGE_PATH_PATTERN).pipe(enhancedImgPathTransform),
          z.string().regex(VIDEO_PATH_PATTERN),
        ])
        .array()
        .optional(),
      banner: z
        .string()
        .regex(IMAGE_PATH_PATTERN)
        .pipe(enhancedImgPathTransform)
        .optional(),
      link: z
        .url({ protocol: /^https?$/, hostname: z.regexes.domain })
        .optional(),
      repo: z
        .url({ protocol: /^https?$/, hostname: z.regexes.domain })
        .optional(),
    }),
  },
});

type C = typeof collections;

declare module 'virtual:markdown' {
  interface Collections extends C {}
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
