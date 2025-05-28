import { z } from 'zod/v4';
import { tag_scopes, tag_types, tags } from '../data/meta';

export const tagScopeSchema = z.enum(tag_scopes);

export const tagTypeSchema = z.enum(tag_types);

export const tagSchema = z.enum(tags);

export const workSchema = z.object({
  year: z.number(),
  title: z.string(),
  summary: z.string(),
  url: z.url(),
});

export const postSchema = z.object({
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
  tags: z.string().array(),
  title: z.string(),
  summary: z.string().optional(),
});

// export const frontmatterSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   properties: z.record(
//     z.string(),
//     z.object({
//       description: z.string(),
//       syntax: z
//         .enum([
//           'angle',
//           'color',
//           'custom-ident',
//           'image',
//           'integer',
//           'length',
//           'length-percentage',
//           'number',
//           'percentage',
//           'resolution',
//           'string',
//           'time',
//           'transform-function',
//           'transform-list',
//           'url',
//         ])
//         .array(),
//     }),
//   ),
//   variants: z.record(
//     z.string(),
//     z.object({ name: z.string(), description: z.string().optional() }),
//   ),
// });
