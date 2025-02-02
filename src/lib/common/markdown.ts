import { languageTag } from '$lib/i18n/generated/runtime';
import matter from 'gray-matter';
import { parse } from 'marked';

/**
 * Preprocessing schema to transform glob imported modules into an index consolidating common
 * (index.md) data with language specific data ([lang].md). Expects import targets to abide to the
 * following file structure:
 *
 * ```
 * entry
 * ├── [lang].md
 * └── index.md (optional)
 * ```
 */
export function contents(
  files: Record<string, unknown>,
  /**
   * Simplify output keys by splicing off a base.
   *
   * @see https://github.com/vitejs/vite/issues/17453
   */
  base?: string,
) {
  const acc: Record<string, { content: string; metadata: Record<string, string> }> = {};
  for (const path in files) {
    const slash = path.lastIndexOf('/');
    const key = path.slice(base && path.indexOf(base) === 0 ? base.length : 0, slash);
    const filename = path.slice(slash + 1, path.lastIndexOf('.'));
    const isIndex = filename === 'index';
    if (!isIndex && filename !== languageTag()) {
      continue;
    }
    const fm = matter((files[path] as any).default);
    const md = parse(fm.content) as string;
    const pre = acc[key] || { metadata: {} };
    acc[key] = isIndex
      ? { metadata: { ...fm.data, ...pre.metadata }, content: pre.content || md }
      : { metadata: { ...pre.metadata, ...fm.data }, content: md || pre.content };
  }
  return acc;
}

/**
 * Compile parsed markdown to support svelte components and customized markdown nodes.
 */
export function compile() {}
