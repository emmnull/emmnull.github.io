import adapter from '@sveltejs/adapter-static';

/**
 * @type {import('@sveltejs/kit').Config}
 */
const config = {
	extensions: ['.svelte', '.mdx'],
	preprocess: [cssLayer()],
	kit: {
		adapter: adapter(),
		alias: {
			$messages: 'src/lib/i18n/generated/messages.js'
		}
	}
};

export default config;

/**
 * Scoping component styles to a predefined layer to control cascade ordering.
 *
 * @see https://github.com/sveltejs/svelte/issues/11345
 */
function cssLayer() {
	return {
		name: 'svelte-css-layer',
		style: ({ content }) => {
			return {
				code: `@layer components { ${content} }`
			};
		}
	};
}
