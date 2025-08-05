import type { SvelteComponent } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import { URLSearchParams } from 'url';
import * as z from 'zod';
import type { Video } from '../../../plugins/video-metadata';

export function uniqueItemsSchema<
  T extends z.ZodString | z.ZodNumber | z.ZodEnum<Record<string, string>>,
>(schema: z.ZodArray<T>) {
  return schema
    .check((ctx) => {
      if (new Set(ctx.value).size !== ctx.value.length) {
        ctx.issues.push({
          input: ctx.value,
          code: 'custom',
          message: 'Array items must be unique.',
        });
        return z.NEVER;
      }
    })
    .meta({
      uniqueItems: true,
    });
}

export function queryParamsTransform<I extends string | URL, O = I>(
  query: Record<string, string | number | boolean>,
) {
  return z.transform<I, O>((v) => {
    if (v instanceof URL) {
      for (const k in query) {
        if (Object.hasOwn(query, k)) {
          v.searchParams.append(k, String(query[k]));
        }
      }
      return v as unknown as O;
    }
    const qindex = v.indexOf('?');
    const path = qindex > -1 ? v.substring(0, qindex) : v;
    const params = new URLSearchParams(
      qindex > -1 ? v.substring(qindex + 1) : '',
    );
    for (const k in query) {
      if (Object.hasOwn(query, k)) {
        params.append(k, String(query[k]));
      }
    }
    return `${path}?${params.toString()}` as O;
  });
}

export const enhancedImgPathTransform = queryParamsTransform<
  string,
  Exclude<SvelteHTMLElements['enhanced:img']['src'], string>
>({
  enhanced: true,
});

export const videoMetadataPathTransform = queryParamsTransform<string, Video>({
  meta: true,
});

export const videoMetadataTypecastTransform = z.transform(
  (v) => v as unknown as Video,
);

export function markdownSchema<T extends z.ZodObject>(metadata: T) {
  return z.object({ default: z.custom<SvelteComponent>(), metadata });
}

export function lightDarkSchema<T extends z.ZodType>(schema: T) {
  return z.record(z.enum(['light', 'dark']), schema);
}

export function maybeLightDarkSchema<T extends z.ZodType>(schema: T) {
  return z.union([schema, lightDarkSchema(schema)]);
}
