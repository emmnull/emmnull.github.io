import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import variantSelectors from './src/styles/variant-selectors.js';

export default defineConfig({
	css: {
		postcss: {
			plugins: [
				// postcssGlobalData({ files: ['./src/styles/components.css'] }),
				variantSelectors({ files: ['./src/styles/variants.css'] })
			]
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
