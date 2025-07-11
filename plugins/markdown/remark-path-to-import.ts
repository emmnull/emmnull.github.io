import type { Definition, Image, Root } from 'mdast';
import type { Processor, Transformer } from 'unified';
import { visit } from 'unist-util-visit';
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
  return function transformer(tree, vfile) {
    const paths = new Map<string, string>();
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
        const dupe = paths.has(path);
        if (count && !dupe) {
          name_counts.set(name, count + 1);
          name = `${name}_${count}`;
        } else if (!dupe) {
          name_counts.set(name, 1);
        }
        paths.set(path, name);
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
    paths.forEach(
      (name, path) => (scripts += `import ${name} from "${path}";\n`),
    );

    let is_script = false;

    visit(tree as Root, 'html', (node) => {
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
      (tree as Root).children.push({
        type: 'html',
        value: `<script>\n${scripts}</script>`,
      });
    }

    // transform serialized meta
    // to do
  };
}
