import { extname } from 'path';
import { isObject } from './object';

/**
 * Remove extension from glob import object keys. Useful to be more flexible and
 * agnostic to extensions and instead rely more on file naming.
 */
export function unext(files: Record<string, unknown>, base?: string) {
  const res: typeof files = {};
  for (const p in files) {
    let k = p.replace(extname(p), '');
    if (base) {
      k = k.substring(base.length);
    }
    res[k] = files[p];
  }
  return res;
}

/**
 * Merge common (index.json) and locale-specific (locale.json) metada to avoid
 * need for repeating locale-agnostic post data.
 *
 * Localized metadata takes precedence if conflicting keys are found.
 */
export function meta(index: unknown, localized: unknown) {
  const metadata: Record<string, unknown> = {};

  if (isObject(index) && 'default' in index) {
    // assuming json or parsed module with default export as metadata
    Object.assign(metadata, index.default);
  }
  if (isObject(localized) && 'metadata' in localized) {
    // assuming metadata export from compiled svelte markdown module
    Object.assign(metadata, localized.metadata);
  }
  return {
    metadata,
  };
}
