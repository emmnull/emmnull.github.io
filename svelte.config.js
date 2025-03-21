import adapter from '@sveltejs/adapter-static';
import markdown from './preprocessors/markdown.js';

export const markdown_ext = ['.md'];

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
  extensions: ['.svelte', ...markdown_ext],
  preprocess: [markdown({ extensions: markdown_ext })],
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    alias: {
      $messages: 'src/lib/i18n/generated/messages.js',
    },
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH,
    },
  },
};

export default config;
