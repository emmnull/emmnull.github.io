import { browser } from '$app/environment';
import { page } from '$app/state';
import { deLocalizeUrl, localizeHref } from '$lib/i18n/generated/runtime';
import type { HTMLAnchorAttributes } from 'svelte/elements';

const delocalized = $derived(
  browser ? deLocalizeUrl(page.url.pathname) : undefined,
);

export function getLinkAttributes(
  href: string,
  {
    currentOnSubpath = false,
    currentOmitHash = true,
    ...localizeOptions
  }: {
    currentOnSubpath?: boolean;
    currentOmitHash?: boolean;
  } & Parameters<typeof localizeHref>[1] = {},
) {
  const localized = localizeHref(href, localizeOptions);
  const current = $derived.by(() => {
    if (delocalized) {
      if (
        href.startsWith('#') &&
        decodeURIComponent(delocalized.hash) === decodeURIComponent(href)
      ) {
        return 'step' as const;
      }
      const pathWithHash = `${delocalized.pathname}${page.url.hash}`;
      if (
        (currentOmitHash && delocalized.pathname === href.split('#')[0]) ||
        pathWithHash === href
      ) {
        return 'page' as const;
      }
      if (
        (currentOnSubpath && pathWithHash.startsWith(href)) ||
        pathWithHash === href
      ) {
        return 'page' as const;
      }
    }
    return undefined;
  });

  return {
    href: localized,
    get 'aria-current'() {
      return current;
    },
  } satisfies HTMLAnchorAttributes;
}
