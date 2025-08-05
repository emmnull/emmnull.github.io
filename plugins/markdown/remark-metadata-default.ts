import { readFile } from 'fs/promises';
import { basename, dirname, extname } from 'path';
import type { Processor, Transformer } from 'unified';
import { VFile } from 'vfile';
import i18n from '../../project.inlang/settings.json' with { type: 'json' };
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
      // prevent running into infinite loop
      return;
    }
    const name = basename(options.id, extname(options.id));
    if (!i18n.locales.includes(name) || name === i18n.baseLocale) {
      return;
    }
    const filepath = `${dirname(options.id)}/${i18n.baseLocale}${extname(options.id)}`;
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
        `No base locale content found for "${options.id}" at "${filepath}"`,
      );
    }
  };
}
