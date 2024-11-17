import postcssGlobalCss from '@csstools/postcss-global-data';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import postcssCustomSelectors from 'postcss-custom-selectors';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	css: {
		postcss: {
			plugins: [postcssGlobalCss({ files: ['src/styles/selectors.css'] }), postcssCustomSelectors()]
		}
	},
	plugins: [
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/i18n/generated'
		}),
		tailwindcss(),
		sveltekit()
	],
	server: {
		port: 9000
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
