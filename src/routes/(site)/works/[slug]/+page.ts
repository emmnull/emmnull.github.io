import { getLocale } from '$lib/i18n/generated/runtime';
import { one } from 'virtual:works';

export async function load(e) {
  const work = await one({ locale: getLocale(), slug: e.params.slug });
  return {
    work,
  };
}
