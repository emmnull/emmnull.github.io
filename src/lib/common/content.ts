import { getLocale } from '$lib/i18n/generated/runtime';

export function unbase<T>(files: Record<string, T>, base: string) {
  const res: typeof files = {};
  for (const p in files) {
    const k = p.substring(base.length);
    res[k] = files[p];
  }
  return res;
}

export function localized<T extends Record<string, unknown>>(files: T) {
  const locale = getLocale();
  const pattern = new RegExp(`^(.*(\\.|/))*${locale}\\.\\w+$`, 'i');
  const filtered: Partial<T> = {};
  for (const k in files) {
    if (pattern.test(k)) {
      filtered[k] = files[k];
    }
  }
  return filtered;
}
