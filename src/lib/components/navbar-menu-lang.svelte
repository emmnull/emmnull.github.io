<script lang="ts">
	import { page } from '$app/stores';
	import { Dialog } from '$lib/builders/dialog.svelte';
	import DialogContainer from '$lib/components/dialog-container.svelte';
	import { i18n } from '$lib/i18n/adapter';
	import { LANGUAGES } from '$lib/i18n/constants';
	import { availableLanguageTags, languageTag } from '$lib/i18n/generated/runtime';
	import type { Snippet } from 'svelte';

	let { trigger }: { trigger: Snippet<[Dialog]> } = $props();

	const dialog = new Dialog();
</script>

{@render trigger(dialog)}
<DialogContainer {dialog}>
	{#each availableLanguageTags as lang}
		<a
			class="button"
			href={i18n.route($page.url.pathname)}
			hreflang={lang}
			aria-current={lang === languageTag() || undefined}
		>
			{LANGUAGES[lang]}
		</a>
	{/each}
</DialogContainer>
