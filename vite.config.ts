import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { markdown } from './plugins/markdown';
import { schema } from './plugins/schema';
import { postSchema, workSchema } from './src/lib/common/schemas';
import { extensions } from './svelte.config';

export default defineConfig({
  plugins: [
    schema({
      './content/work/schema.json': workSchema.partial(),
      './content/posts/schema.json': postSchema.partial(),
    }),
    markdown({
      extensions,
    }),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/i18n/generated',
      strategy: ['url', 'cookie', 'baseLocale'],
    }),
    tailwindcss(),
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
