import { browser } from '$app/environment';
import { page } from '$app/state';
import { deLocalizeUrl } from '$lib/i18n/generated/runtime';
import type { HTMLAnchorAttributes } from 'svelte/elements';

const delocalized = $derived(browser ? deLocalizeUrl(page.url.pathname) : undefined);

export function linkAttributes<T extends string>(
  href: T,
  {
    currentOnSubpath = false,
    currentOmitHash = true,
  }: {
    currentOnSubpath?: boolean;
    currentOmitHash?: boolean;
  } = {},
) {
  const current = $derived.by(() => {
    if (page && delocalized) {
      if (href.startsWith('#') && decodeURIComponent(page.url.hash) === decodeURIComponent(href)) {
        return 'step' as const;
      }
      if (delocalized.href === (currentOmitHash ? href.split('#')[0] : href)) {
        return 'page' as const;
      }
      const pathWithHash = `${delocalized}${page.url.hash}`;
      if ((currentOnSubpath && pathWithHash.startsWith(href)) || pathWithHash === href) {
        return 'page' as const;
      }
    }
    return undefined;
  });

  return {
    href: href as T,
    get 'aria-current'() {
      return current;
    },
  } satisfies HTMLAnchorAttributes;
}
