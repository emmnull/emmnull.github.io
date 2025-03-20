import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
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
