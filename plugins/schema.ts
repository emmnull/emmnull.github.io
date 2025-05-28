import { writeFile } from 'node:fs';
import type { Plugin } from 'vite';
import { z, type ZodType } from 'zod/v4';
import type { $ZodRegistry } from 'zod/v4/core';

const name = 'vite-plugin-schema' as const;

/**
 * Translate zod schemas to JSON schemas to get intellisense when authoring
 * content json or frontmatter (yaml) metadata in IDE.
 */
export function schema(
  sources: Record<string, ZodType | $ZodRegistry>,
): Plugin {
  return {
    name,
    buildStart() {
      for (const out in sources) {
        // this.addWatchFile(out)
        const s = sources[out as keyof typeof sources];
        const json = z.toJSONSchema(s, {
          target: 'draft-7',
          io: 'input',
        });
        write(out, JSON.stringify(json, undefined, 2));
      }
    },
  };
}

async function write(out: string, json: string) {
  // const comment =
  //   '// Schema generated from Zod definition.\n' +
  //   '// Do not modify this file. Any changes not from the Zod schema will be overwritten downstream.\n';
  writeFile(out, json, (err) => {
    if (err) {
      return console.error(
        `[${name}] couldn't generate json schema (${err.message}).`,
      );
    }
    console.log(`[${name}] succesfully generated json schema (${out}).`);
  });
}
