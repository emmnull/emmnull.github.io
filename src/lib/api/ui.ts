import z from 'zod';

const base = '/content/ui';

const schema = z.object({
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
});

export async function all() {
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  const files = import.meta.glob<typeof import('*.md')>('/content/ui/*.md', {
    eager: true,
  });
  const data: Record<string, z.infer<typeof schema>> = {};
  for (const path in files) {
    console.log(files[path]);
    // const key = path.slice(base.length, path.lastIndexOf('.'));
    // data[key] = schema.parse(files[path].metadata);
  }
  return data;
}

export async function one(slug: string) {
  // // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  // return (await import(`${base}/${slug}.md`)) as typeof import('*.md');
}
