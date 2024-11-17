import { browser } from '$app/environment';
import { page as pageStore } from '$app/stores';
import { i18n } from '$lib/i18n/adapter';
import type { HTMLAnchorAttributes } from 'svelte/elements';
import { fromStore } from 'svelte/store';

const page = browser && fromStore(pageStore);

let nolang = $derived(page && i18n.route(page.current.url.pathname));

export function linkAttributes<T extends string>(
	href: T,
	{
		currentOnSubpath = false,
		currentOmitHash = true
	}: {
		currentOnSubpath?: boolean;
		currentOmitHash?: boolean;
	} = {}
) {
	let current = $derived.by(() => {
		if (page && nolang) {
			if (
				href.startsWith('#') &&
				decodeURIComponent(page.current.url.hash) === decodeURIComponent(href)
			) {
				return 'step' as const;
			}
			if (nolang === (currentOmitHash ? href.split('#')[0] : href)) {
				return 'page' as const;
			}
			const pathWithHash = `${nolang}${page.current.url.hash}`;
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
		}
	} satisfies HTMLAnchorAttributes;
}
