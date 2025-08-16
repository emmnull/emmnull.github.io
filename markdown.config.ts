import { normalize } from 'path';
import * as z from 'zod';
import { defineConfig } from './plugins/markdown';
import { IMAGE_PATH_PATTERN } from './plugins/markdown/utils';
import { VIDEO_PATH_PATTERN } from './plugins/video-metadata/utils';
import i18n from './project.inlang/settings.json' with { type: 'json' };
import {
  enhancedImgPathTransform,
  uniqueItemsSchema,
  videoMetadataPathTransform,
} from './src/lib/common/schema';
import { disciplines, tags } from './src/lib/data/meta';
import { extensions } from './svelte.config';

export default defineConfig({
  extensions,
  collections: {
    works: {
      pattern: `/content/works/*/{${i18n.locales.join(',')},}{${extensions.join(',')},}`,
      params: (filename) => {
        const dir = normalize(filename)
          .replace('content/works/', '')
          .split('/');
        const file = dir.pop();
        return {
          slug: dir.join('/'),
          locale: file?.substring(0, file.indexOf('.')),
        };
      },
      schema: z.object({
        year: z.number(),
        title: z.string(),
        shortTitle: z.string().optional(),
        disciplines: uniqueItemsSchema(z.enum(disciplines).array()).prefault(
          [],
        ),
        tags: uniqueItemsSchema(z.enum(tags).array()).prefault([]),
        summary: z.string().optional(),
        images: z
          .union([
            z.string().regex(IMAGE_PATH_PATTERN).pipe(enhancedImgPathTransform),
            z
              .string()
              .regex(VIDEO_PATH_PATTERN)
              .pipe(videoMetadataPathTransform),
          ])
          .array()
          .prefault([]),
        banner: z
          .string()
          .regex(IMAGE_PATH_PATTERN)
          .pipe(enhancedImgPathTransform)
          .optional(),
        link: z
          .url({ protocol: /^https?$/, hostname: z.regexes.domain })
          .optional(),
        repo: z
          .url({ protocol: /^https?$/, hostname: z.regexes.domain })
          .optional(),
      }),
    },
  },
});
