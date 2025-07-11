import type { Processor, Transformer } from 'unified';
import type { ZodObject } from 'zod/v4';
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
    vfile.data.fm = options.schema.parse(vfile.data.fm);
  };
}
