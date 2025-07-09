import adapter from '@sveltejs/adapter-static';
import { locales } from './src/lib/i18n/generated/runtime.js';

export const extensions = ['.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  kit: {
    prerender: {
      entries: [
        '*',
        ...locales.map((locale) => /** @type {`/${string}`} */ (`/${locale}`)),
      ],
    },
    adapter: adapter({ fallback: '404.html' }),
    alias: {
      // $content: '.content',
      $messages: 'src/lib/i18n/generated/messages.js',
    },
    paths: {
      base: process.env.BASE_PATH
        ? `/${process.env.BASE_PATH.replace(/^\/|\/$/g, '')}`
        : undefined,
    },
  },
};

export default config;
