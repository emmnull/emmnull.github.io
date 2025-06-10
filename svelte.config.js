import adapter from '@sveltejs/adapter-static';

export const extensions = ['.md'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', ...extensions],
  preprocess: [
    // mdsx({ extensions }),
    // mdsvex({ extensions })
  ],
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    alias: {
      $messages: 'src/lib/i18n/generated/messages.js',
    },
    paths: {
      base: process.env.BASE_PATH ?? '',
    },
  },
};

export default config;
