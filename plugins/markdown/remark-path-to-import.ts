import type { Definition, Image, Root as MdastRoot } from 'mdast';
import type { Processor, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { FLAG_SKIP } from './remark-metadata-default';
import { PATH_PATTERN, PROPS_PATTERN, SCRIPT_START_PATTERN } from './utils';
import './vfile.d.ts';

/**
 * Transform relative paths into imports.
 *
 * @credits pngwn
 * @credits mattjennings
 *
 * @see https://github.com/mattjennings/mdsvex-relative-images/blob/main/index.js
 */
export default function remarkPathToImport(this: Processor): Transformer {
  this.use(rehypeSerializeMetadata);

  return function transformer(tree, vfile) {
    if (FLAG_SKIP in vfile.data && vfile.data[FLAG_SKIP]) {
      // skip transforms on base-locale defaulted metadata pass else generated invalid imports
      return;
    }
    const imports = new Map<string, string>();
    vfile.data.imports = imports;
    const name_counts = new Map<string, number>();

    function transformUrl(path: string, wrap?: boolean) {
      path = path.trim();
      path = decodeURIComponent(path);
      const match = path.match(PATH_PATTERN);

      if (match && match.length && match[0] == path) {
        let name = path
          .replace(/[^a-zA-Z0-9]+/g, ' ')
          .trim()
          .split(/\s+/)
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join('')
          .replace(/^(\d)/, '_$1');
        const count = name_counts.get(name);
        const dupe = imports.has(path);
        if (count && !dupe) {
          name_counts.set(name, count + 1);
          name = `${name}_${count}`;
        } else if (!dupe) {
          name_counts.set(name, 1);
        }
        imports.set(path, name);
        return wrap ? `{${name}}` : name;
      }
      return path;
    }

    // transform metadata
    function transformMetadata(
      metadata: Record<string | number | symbol, unknown>,
    ) {
      for (const k in metadata) {
        if (typeof metadata[k] === 'string') {
          metadata[k] = transformUrl(metadata[k]);
        }
        if (typeof metadata[k] === 'object' && metadata[k] !== null) {
          transformMetadata(
            metadata[k] as Record<string | number | symbol, unknown>,
          );
        }
      }
    }
    if (vfile.data.fm) {
      for (const k in vfile.data.fm) {
        // reserve frontmatter prop names
        name_counts.set(k, 1);
      }
      transformMetadata(vfile.data.fm);
    }

    // transform urls in images
    visit(tree, ['image', 'definition'], (node) => {
      const typed = node as Image | Definition;
      typed.url = transformUrl(typed.url, true);
    });

    // transform src in html nodes
    visit(tree, 'html', (node: { value: string }) => {
      let match;
      const props: string[] = [];

      while ((match = PROPS_PATTERN.exec(node.value)) !== null) {
        if (match[1]) {
          props.push(match[3]);
        }
      }

      for (const url of props) {
        const transformed = transformUrl(url, true);
        node.value = node.value.replace(`${url}`, transformed);
      }
    });

    let scripts = '';
    imports.forEach(
      (name, path) => (scripts += `import ${name} from "${path}";\n`),
    );

    let is_script = false;

    visit(tree as MdastRoot, 'html', (node) => {
      if (SCRIPT_START_PATTERN.test(node.value)) {
        is_script = true;
        node.value = node.value.replace(
          SCRIPT_START_PATTERN,
          (script: string) => {
            return `${script}\n${scripts}`;
          },
        );
      }
    });

    if (!is_script) {
      (tree as MdastRoot).children.push({
        type: 'html',
        value: `<script>\n${scripts}</script>`,
      });
    }
  };
}

/** Customize serialization of parsed front matter into metadata module export. */
function rehypeSerializeMetadata(this: Processor): Transformer {
  return function (tree, vfile) {
    if (FLAG_SKIP in vfile.data && vfile.data[FLAG_SKIP]) {
      // skip transforms on base-locale defaulted metadata pass else generated invalid imports
      return;
    }
    const imports = vfile.data.imports as Map<string, string> | undefined;
    const names = new Set(imports?.values());

    function wrap(key: string, value: string) {
      if (typeof value === 'string' && names.has(value)) {
        return `%import%${value}%import%`;
      }
      return value;
    }

    visit(tree, 'raw', (_node) => {
      const node = _node as { type: 'raw'; value: string };
      if (!/^<script\s+(?:context="module"|module)/.test(node.value)) {
        return;
      }

      node.value = node.value
        .split('\n')
        .map((line) => {
          if (!/^\s*export const metadata =/.test(line)) {
            return line;
          }
          const replaced = JSON.stringify(vfile.data.fm, wrap).replace(
            /"%import%(.+?)%import%"/g,
            (_, name) => name,
          );
          return `export const metadata = ${replaced};`;
        })
        .join('\n');
    });
  };
}
