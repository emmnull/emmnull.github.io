import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import variants from 'tailwind-variant-selectors/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/i18n/generated',
    }),
    variants(),
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    port: 9000,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
