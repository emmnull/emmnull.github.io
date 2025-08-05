import dedent from 'dedent';
import { parseFile } from 'music-metadata';
import type { Plugin } from 'vite';
import { VIDEO_PATH_PATTERN } from './utils';

export interface Video {
  video: {
    src: string;
    /** Intrinsic width in pixels. */
    w: number;
    /** Intrinsic height in pixels. */
    h: number;
    /* Duration in seconds. */
    d: number;
  };
}

export default function videoMetadata(): Plugin {
  return {
    name: 'vite-plugin-video-metadata',
    enforce: 'pre',
    async transform(code, id) {
      const match = id.match(VIDEO_PATH_PATTERN);
      if (!match) {
        return;
      }
      const [_, filepath, _ext, query] = match;
      if (!query) {
        return;
      }

      const meta = new URLSearchParams(query).get('meta');
      if (!meta) {
        return;
      }

      try {
        const meta = await parseFile(filepath);
        const vid = meta.format.trackInfo?.find(
          (t) => t.video !== undefined,
        )?.video;

        if (!vid) {
          throw new Error('No video track found');
        }

        return dedent`
				export default {
					video: {
						src: ${code.replace('export default ', '').trim()},
						w: ${vid.pixelWidth || 0},
						h: ${vid.pixelHeight || 0},
						d: ${meta.format.duration || 0},
					}
				};`;
      } catch (err) {
        this.error(`Failed to read video metadata: ${filepath}\n${err}`);
      }
    },
    // async load(id) {
    //   const match = id.match(VIDEO_PATH_PATTERN);
    //   if (!match) {
    //     return;
    //   }
    //   const [_, filepath, ext, _query] = match;
    //   try {
    //     const meta = await parseFile(filepath);
    //     const vid = meta.format.trackInfo.find(
    //       (t) => t.video !== undefined,
    //     )?.video;
    //     if (!vid) {
    //       throw new Error('No video track found');
    //     }

    //     const w = vid.pixelWidth || 0;
    //     const h = vid.pixelHeight || 0;
    //     const d = meta.format.duration || 0;

    //     // const buffer = await readFile(filepath);
    //     // const hash = crypto
    //     //   .createHash('md5')
    //     //   .update(buffer)
    //     //   .digest('hex')
    //     //   .slice(0, 8);
    //     // const base = basename(filepath, ext);
    //     // const name = `${base}.${hash}${ext}`;

    //     // const fileId = this.emitFile({
    //     //   type: 'asset',
    //     //   name,
    //     //   source: buffer,
    //     // });

    //     // const publicPath = `__VITE_ASSET__${fileId}__`;

    //     return `
    //       const src = ${JSON.stringify(filepath)};
    //       export default src;
    //       export const video = {
    //         src,
    //         w: ${w},
    //         h: ${h},
    //         d: ${d},
    //       };
    //     `;
    //   } catch (err) {
    //     this.error(`Failed to read video metadata: ${filepath}\n${err}`);
    //   }
    // },
  };
}
