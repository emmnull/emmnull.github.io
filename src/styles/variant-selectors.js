import { readFileSync } from 'fs';
import { parse } from 'postcss';

const PLUGIN_NAME = 'postcss-tailwind-variant-selectors';
const PLUGIN_LOG_PREFIX = `[${PLUGIN_NAME}]: `;

/**
 * Use your custom tailwind variants as selectors inside css files without relying on the `@apply`
 * syntax.
 *
 * @example
 *
 * ```css
 * ⁣@variant hocus (&:hover, &:focus);
 *
 * .btn {
 *   color: var(--color-input);
 *   &:variant(hocus) {
 *     color: var(--color-input-accent);
 *   }
 * }
 * ```
 *
 * @type {import('postcss').PluginCreator<{ files?: string[] }>}
 */
const plugin = ({ files = [] } = {}) => {
	/**
	 * @type {{ [variant: string]: string }}
	 */
	const selectors = {};

	for (const file of files) {
		const content = readFileSync(file, 'utf-8');
		const parsed = parse(content);
		parsed.walkAtRules('variant', (rule) => {
			const [name, amped] = rule.params
				.substring(0, rule.params.length - 1)
				.trim()
				.split(/\s*\((.*)/);
			const unamped = amped
				.split(',')
				.map((s) => {
					const trimmed = s.trim();
					if (trimmed.startsWith('&')) {
						return trimmed.substring(1);
					}
					return trimmed;
				})
				.join(', ');
			if (name in selectors) {
				if (selectors[name] === unamped) {
					console.warn(PLUGIN_LOG_PREFIX + `Duplicate variant declaration found for ${name}.`);
					return;
				}
				throw Error(PLUGIN_LOG_PREFIX + `Conflicting variant declarations found for ${name}.`);
			}
			selectors[name] = unamped;
		});
	}
	return {
		postcssPlugin: PLUGIN_NAME,
		Rule(rule, { result }) {
			if (!rule.selector || !rule.selector.toLowerCase().includes(':variant(')) {
				return;
			}
			const is = rule.selector.replace(/:variant\((.*[^\)])\)/, (matched, variant) => {
				if (!(variant in selectors)) {
					console.error(
						PLUGIN_LOG_PREFIX + `No corresponding variant definition found for ${variant}.`
					);
					return variant;
				}
				return `:is(${selectors[variant]})`;
			});
			rule.replaceWith(rule.clone({ selector: is }));
		}
	};
};

plugin.postcss = true;

export default plugin;
