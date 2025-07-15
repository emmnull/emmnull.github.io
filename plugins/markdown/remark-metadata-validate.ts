import type { Processor, Transformer } from 'unified';
import type { ZodObject } from 'zod/v4';
import { FLAG_SKIP } from './remark-metadata-default';
import './vfile.d.ts';

export default function remarkMetadataValidate(
  this: Processor,
  options: {
    schema?: ZodObject;
  },
): Transformer {
  return function transformer(tree, vfile) {
    if (!options.schema) {
      return;
    }
    if (FLAG_SKIP in vfile.data && vfile.data[FLAG_SKIP]) {
      // prevent running schema transforms twice
      return;
    }
    vfile.data.fm = options.schema.parse(vfile.data.fm);
  };
}
