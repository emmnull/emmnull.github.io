<script lang="ts">
	import ScrollProvider from '$lib/components/scroll-provider.svelte';
	import SearchCommand from '$lib/components/search-command.svelte';
	import { i18n } from '$lib/i18n/adapter';
	import { ParaglideJS as I18nProvider } from '@inlang/paraglide-sveltekit';
	import '../app.css';

	let { children, data } = $props();
</script>

<ScrollProvider />
<I18nProvider {i18n}>
	<SearchCommand />
	{@render children()}
</I18nProvider>
