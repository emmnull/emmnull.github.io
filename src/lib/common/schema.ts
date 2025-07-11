import type { SvelteComponent } from 'svelte';
import {
  NEVER,
  z,
  type ZodArray,
  type ZodEnum,
  type ZodNumber,
  type ZodObject,
  type ZodString,
  type ZodType,
} from 'zod/v4';
import { disciplines, tags } from '../data/meta';

export function uniqueItemsSchema<
  T extends ZodString | ZodNumber | ZodEnum<Record<string, string>>,
>(schema: ZodArray<T>) {
  return schema
    .check((ctx) => {
      if (new Set(ctx.value).size !== ctx.value.length) {
        ctx.issues.push({
          input: ctx.value,
          code: 'custom',
          message: 'Array items must be unique.',
        });
        return NEVER;
      }
    })
    .meta({
      uniqueItems: true,
    });
}

export function markdownSchema<T extends ZodObject>(metadata: T) {
  return z.object({ default: z.custom<SvelteComponent>(), metadata });
}

export function lightDarkSchema<T extends ZodType>(schema: T) {
  return z.record(z.enum(['light', 'dark']), schema);
}

export function maybeLightDarkSchema<T extends ZodType>(schema: T) {
  return z.union([schema, lightDarkSchema(schema)]);
}

// export const pathToImport = z.transform<ZodString>((path) => {
// 	if (/\s*(\$\w+|\.{1,2})[/\\].*?\.\w+\s*(\?([^=&]+=[^=&]+)(&[^=&]+=[^=&]+)*)?/.test(path)) {

// 	}
// 	return path;
// })

export const workSchema = z.object({
  year: z.number(),
  title: z.string(),
  shortTitle: z.string().optional(),
  disciplines: uniqueItemsSchema(z.enum(disciplines).array()).optional(),
  tags: uniqueItemsSchema(z.enum(tags).array()).optional(),
  summary: z.string().optional(),
  covers: z.string().optional().array(),
  banner: z.string().optional(),
  link: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
  code: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
});

export const postSchema = z.object({
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
  tags: uniqueItemsSchema(z.enum(tags).array()),
  title: z.string(),
  shortTitle: z.string().optional(),
  summary: z.string().optional(),
  cover: z.string().optional(),
  banner: z.string().optional(),
  links: z
    .object({
      url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
      }),
      label: z.string(),
      description: z.string().optional(),
    })
    .array()
    .optional(),
});
