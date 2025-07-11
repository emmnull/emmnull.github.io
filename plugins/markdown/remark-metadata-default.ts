import { readFile } from 'fs/promises';
import { basename, dirname, extname } from 'path';
import type { Processor, Transformer } from 'unified';
import { VFile } from 'vfile';
import { baseLocale, isLocale } from '../../src/lib/i18n/generated/runtime';
import './vfile.d.ts';

export const FLAG_SKIP = Symbol('skip-remark-metadata-default');

/**
 * When encountering locale-specific markdowns ([locale].md), user metadata from
 * default locale as base to reduce need for duplication.
 */
export default function remarkMetadataDefault(
  this: Processor,
  options: {
    id: string;
  },
): Transformer {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;
  return async function transformer(tree, vfile) {
    if (FLAG_SKIP in vfile.data && vfile.data[FLAG_SKIP]) {
      return;
    }
    const name = basename(options.id, extname(options.id));
    if (!isLocale(name) || name === baseLocale) {
      return;
    }
    const filepath = `${dirname(options.id)}/${baseLocale}${extname(options.id)}`;
    try {
      const value = await readFile(filepath, 'utf-8');
      if (value) {
        const vbase = new VFile({
          value,
          path: filepath,
          data: {
            [FLAG_SKIP]: true,
          },
        });
        const base = await self.process(vbase);
        vfile.data.fm = { ...base.data.fm, ...vfile.data.fm };
      }
    } catch {
      console.log(
        `no base locale content found for "${options.id}" at "${filepath}"`,
      );
    }
  };
}
