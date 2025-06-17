import { writeFile } from 'node:fs';
import type { Plugin } from 'vite';
import { z, type ZodObject } from 'zod/v4';

const PLUGIN_NAME = 'vite-plugin-schema' as const;

/**
 * Translate zod schemas to JSON schemas to get intellisense when authoring
 * content json or frontmatter (yaml) metadata in IDE.
 */
export function schema(sources: Record<string, ZodObject>): Plugin {
  return {
    name: PLUGIN_NAME,
    buildStart() {
      for (const out in sources) {
        // this.addWatchFile(out)
        const s = sources[out as keyof typeof sources];
        const json = z.toJSONSchema(
          s.extend({ $schema: z.string().optional() }),
          {
            target: 'draft-7',
            io: 'input',
          },
        );
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
        `[${PLUGIN_NAME}] couldn't generate json schema (${err.message}).`,
      );
    }
    console.log(`[${PLUGIN_NAME}] succesfully generated json schema (${out}).`);
  });
}
