import { compile, type MdsvexCompileOptions } from 'mdsvex';
import { basename, dirname, extname } from 'path';
import type { Transformer } from 'unified';
import type { Plugin } from 'vite';
import { isLocale } from '../src/lib/i18n/generated/runtime';

const PLUGIN_NAME = 'vite-plugin-markdown-svelte' as const;

/**
 * Support svelte markdown in vite for more control on timing with other
 * svelte-relevant vite plugins.
 */
export function markdown({
  sharedMetadata,
  extensions = ['.md'],
  ...options
}: {
  /**
   * Peer filename(s) of shared base metadata to inject into localized
   * markdown's frontmatter.
   */
  sharedMetadata?: `${string}.${'json' | 'jsonc'}`[];
} & MdsvexCompileOptions): Plugin {
  const pattern = new RegExp(`(${extensions.join('|')})$`, 'i');
  return {
    name: PLUGIN_NAME,
    enforce: 'pre',
    async transform(code, id) {
      if (pattern.test(id)) {
        const name = basename(id, extname(id));
        const metadata: Record<string, unknown> = {};
        if (isLocale(name) && sharedMetadata?.length) {
          for (const shared of sharedMetadata) {
            try {
              const file = await import(`${dirname(id)}/${shared}`, {
                with: { type: 'json' },
              });
              if (
                file != null &&
                typeof file === 'object' &&
                file.default != null &&
                typeof file.default === 'object'
              ) {
                Object.assign(metadata, file.default);
              }
            } catch (err) {
              console.info(
                `[${PLUGIN_NAME}] No index.json found for localized markdown ${id} (${JSON.stringify(err)})`,
              );
            }
          }
        }
        if ('$schema' in metadata) {
          delete metadata.$schema;
        }
        return compile(code, {
          ...options,
          remarkPlugins: [
            // @ts-expect-error mdsvex typings are shite
            [remarkInject, { metadata }],
            ...(options.remarkPlugins ?? []),
          ],
        });
      }
    },
  };
}

/**
 * When encountering locale-specific markdowns ([locale].md), look for shared
 * metadata (index.json) to inject alongside markdown metadata.
 */
function remarkInject(options: {
  metadata: Record<string, unknown>;
}): Transformer {
  return function transformer(tree, file) {
    if ('fm' in file.data && typeof file.data.fm === 'object') {
      file.data.fm = { ...options.metadata, ...file.data.fm };
    }
  };
}
