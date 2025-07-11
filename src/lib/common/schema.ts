import type { SvelteComponent } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
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
import { PATH_PATTERN } from '../../../plugins/markdown/utils';

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

export function imagePathSchema<T extends ZodString>(
  schema: T,
  query?: Record<string, string | number | boolean>,
) {
  return schema.regex(PATH_PATTERN).transform((v) => {
    const q = query
      ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
      : '';
    return (v + q) as unknown as Exclude<
      SvelteHTMLElements['enhanced:img']['src'],
      string
    >;
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
