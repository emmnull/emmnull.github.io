import { createCollection, createOne } from '$lib/common/content';
import { postSchema } from '$lib/common/schema';

export const all = createCollection(
  postSchema,
  import.meta.glob('/content/posts/*/*.md', {
    eager: true,
  }),
);

export const one = createOne(postSchema, '/content/posts');
