import { getLocale, type Locale } from '$lib/i18n/generated/runtime';
import type { z, ZodObject } from 'zod/v4';
import { markdownSchema } from './schema';

export function createCollection<S extends ZodObject, G>(
  schema: S,
  files: Record<string, G>,
) {
  return (_locale?: Locale) => {
    const locale = _locale ?? getLocale();
    const parsed: (z.infer<ReturnType<typeof markdownSchema<S>>> & {
      slug: string;
    })[] = [];
    for (const filepath in files) {
      const name = filepath.substring(
        filepath.lastIndexOf('/') + 1,
        filepath.lastIndexOf('.'),
      );
      if (name === locale) {
        parsed.push({
          ...markdownSchema(schema).parse(files[filepath]),
          slug: filepath.substring(0, filepath.lastIndexOf('/')),
        });
      }
    }
    return parsed;
  };
}

export function createOne<S extends ZodObject>(schema: S, base: string) {
  return async (slug: string, _locale?: Locale) => {
    const locale = _locale ?? getLocale();
    const file = await import(
      /* @vite-ignore */ `${base}/${slug}/${locale}.md`
    );
    return markdownSchema(schema).parse(file);
  };
}
