import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { markdown } from './plugins/markdown';
import { schema } from './plugins/schema';
import { postSchema, workSchema } from './src/lib/common/schemas';
import { extensions } from './svelte.config';

export default defineConfig({
  plugins: [
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/i18n/generated',
      strategy: ['url', 'cookie', 'baseLocale'],
    }),
    schema({
      './content/work/schema.json': workSchema,
      './content/posts/schema.json': postSchema,
    }),
    markdown({
      extensions,
      sharedMetadata: ['index.json'],
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
