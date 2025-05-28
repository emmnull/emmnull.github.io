/* eslint-disable @typescript-eslint/consistent-type-imports */
import z from 'zod';

const base = '/content/ui/';

const schemas = {
  theme: z.record(z.string(), z.object({})),
  styles: z.object({
    name: z.string(),
    description: z.string(),
    properties: z.record(
      z.string(),
      z.object({
        description: z.string(),
        syntax: z
          .enum([
            'angle',
            'color',
            'custom-ident',
            'image',
            'integer',
            'length',
            'length-percentage',
            'number',
            'percentage',
            'resolution',
            'string',
            'time',
            'transform-function',
            'transform-list',
            'url',
          ])
          .array(),
      }),
    ),
    variants: z.record(
      z.string(),
      z.object({ name: z.string(), description: z.string().optional() }),
    ),
  }),
  rigs: z.object({
    name: z.string(),
  }),
};

function unslug(slug: string) {
  const [group, item] = slug.split(/\/(.*)/);
  if (!group || !item || !(group in schemas)) {
    throw Error(`Unexpected group or item found at ${slug}`);
  }
  return [group, item] as [keyof typeof schemas, string];
}

export async function all() {
  const files = import.meta.glob<typeof import('*.md')>('/content/ui/**/*.md', {
    eager: true,
  });
  const data: {
    [K in keyof typeof schemas]: Record<string, z.infer<(typeof schemas)[K]>>;
  } = { styles: {}, theme: {}, rigs: {} };
  for (const filepath in files) {
    const slug = filepath.slice(base.length, filepath.lastIndexOf('.'));
    const [group] = unslug(slug);
    const parsed = schemas[group].parse(files[filepath].metadata);
    data[group]![slug] = parsed;
  }
  return data;
}

export async function one(slug: string) {
  const { default: content, metadata } = (await import(
    /* @vite-ignore */
    `${base}${slug}.md`
  )) as typeof import('*.md');
  const [group] = unslug(slug);
  schemas[group].parse(metadata);
  return {
    content,
    metadata,
  };
}
