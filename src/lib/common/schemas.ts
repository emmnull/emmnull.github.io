import type { SvelteComponent } from 'svelte';
import {
  NEVER,
  z,
  type ZodArray,
  type ZodEnum,
  type ZodNumber,
  type ZodObject,
  type ZodString,
} from 'zod/v4';
import { disciplines, tag_types, tags } from '../data/meta';

export function uniqueItems<
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

export function markdownModule<T extends ZodObject>(metadata: T) {
  return z.object({ default: z.custom<SvelteComponent>(), metadata });
}

export function localizedModules<T extends ZodObject>(metadata: T) {
  return z.record(
    z.string().transform((value) => value.substring(0, value.indexOf('/'))),
    markdownModule(metadata),
  );
}

export const disciplineSchema = z.enum(disciplines);

export const tagTypeSchema = z.enum(tag_types);

export const tagSchema = z.enum(tags);

export const workSchema = z.object({
  year: z.number(),
  title: z.string(),
  shortTitle: z.string().optional(),
  disciplines: uniqueItems(disciplineSchema.array()).optional(),
  tags: uniqueItems(tagSchema.array()).optional(),
  summary: z.string().optional(),
  cover: z.string().optional(),
  banner: z.string().optional(),
  link: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
  code: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
});

export const postSchema = z.object({
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
  tags: uniqueItems(tagSchema.array()),
  title: z.string(),
  shortTitle: z.string().optional(),
  summary: z.string().optional(),
  cover: z.string().optional(),
  banner: z.string().optional(),
  links: z
    .object({
      url: z.url({ protocol: /^https?$/, hostname: z.regexes.domain }),
      label: z.string(),
      description: z.string().optional(),
    })
    .array()
    .optional(),
});
