import adapter from '@sveltejs/adapter-static';
import i18n from './project.inlang/settings.json' with { type: 'json' };

export const extensions = ['.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  kit: {
    prerender: {
      entries: [
        '*',
        ...i18n.locales.map(
          (locale) => /** @type {`/${string}`} */ (`/${locale}`),
        ),
      ],
    },
    adapter: adapter({
      fallback: '404.html',
    }),
    alias: {
      $messages: 'src/lib/i18n/generated/messages.js',
    },
  },
};

export default config;
