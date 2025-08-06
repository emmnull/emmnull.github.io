import adapter from '@sveltejs/adapter-static';

export const extensions = ['.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  kit: {
    // prerender: {
    //   entries: [
    //     '*',
    //     ...i18n.locales.map(
    //       (locale) => /** @type {`/${string}`} */ (`/${locale}`),
    //     ),
    //   ],
    // },
    adapter: adapter({ fallback: '404.html' }),
    alias: {
      $messages: 'src/lib/i18n/generated/messages.js',
    },
    // paths: {
    //   base: process.env.BASE_PATH
    //     ? `/${process.env.BASE_PATH.replace(/^\/|\/$/g, '')}`
    //     : undefined,
    // },
  },
};

export default config;
