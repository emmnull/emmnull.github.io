import escape from 'escape-string-regexp';
import { compile, type MdsvexCompileOptions } from 'mdsvex';
import type { Plugin } from 'vite';

const name = 'vite-plugin-markdown-svelte' as const;

/**
 * Support svelte markdown in vite for more control on timing with other
 * svelte-relevant vite plugins.
 */
export function markdown({
  extensions = ['.md'],
  ...options
}: MdsvexCompileOptions): Plugin {
  const pattern = new RegExp(`(${extensions.map(escape).join('|')})$`, 'i');
  return {
    name,
    enforce: 'pre',
    async transform(code, id) {
      if (pattern.test(id)) {
        return compile(code, options);
      }
    },
  };
}

// async function dts(options: { metadata?: string; extensions?: string[] }) {}
