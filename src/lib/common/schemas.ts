import {
  NEVER,
  z,
  type ZodArray,
  type ZodEnum,
  type ZodNumber,
  type ZodString,
} from 'zod/v4';
import { tag_scopes, tag_types, tags } from '../data/meta';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function uniqueItems<T extends ZodString | ZodNumber | ZodEnum<any>>(
  schema: ZodArray<T>,
) {
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

export const tagScopeSchema = z.enum(tag_scopes);

export const tagTypeSchema = z.enum(tag_types);

export const tagSchema = z.enum(tags);

// export const workRoleSchema = z.enum();

export const workSchema = z.object({
  year: z.number(),
  title: z.string(),
  // roles: uniqueItems(workRoleSchema.array()),
  summary: z.string(),
  url: z.url().optional(),
  repoUrl: z.url().optional(),
});

export const postSchema = z.object({
  createdAt: z.iso.date(),
  updatedAt: z.iso.date(),
  tags: uniqueItems(tagSchema.array()),
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
