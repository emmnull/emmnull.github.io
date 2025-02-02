import { browser } from '$app/environment';
import { page } from '$app/state';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { i18n } from './adapter';

// export function getLocaleParam(
//   /**
//    * Pathname with or without locale.
//    */
//   pathname: string,
// ) {
//   const [_, maybeLocale] = pathname.split('/');
//   if (isLocale(maybeLocale)) {
//     return maybeLocale;
//   }
// }

// export function delocalize(
//   /**
//    * Pathname with or without locale.
//    */
//   pathname: string,
// ) {
//   const locale = getLocaleParam(pathname);
//   if (locale) {
//     return pathname.replace(`/${locale}`, '');
//   }
//   return pathname;
// }

// export function localize(
//   /**
//    * Pathname **without** locale.
//    */
//   pathname: string,
//   locale: Locale,
// ) {
//   return `/${locale}${pathname}`;
// }

const delocalized = $derived(browser ? i18n.route(page.url.pathname) : '');

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
      if (delocalized === (currentOmitHash ? href.split('#')[0] : href)) {
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
