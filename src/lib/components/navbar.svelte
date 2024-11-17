<script lang="ts">
	import { linkAttributes } from '$lib/common/link.svelte';
	import Logo from '$lib/components/logo.svelte';
	import * as m from '$messages';
	import { Languages, NotebookTabs, PencilRuler } from 'lucide-svelte';
	import NavbarButton from './navbar-button.svelte';
	import NavbarMenuLang from './navbar-menu-lang.svelte';
	import NavbarSearch from './navbar-search.svelte';
</script>

<header
	class="px-base-padding pt-base-gap pb-base-padding flex flex-row justify-between print:hidden"
>
	<nav class="gap-menu-gap flex flex-row">
		<NavbarButton href="/"><Logo /></NavbarButton>
		<NavbarButton {...linkAttributes('/blog', { currentOnSubpath: true })}>
			<NotebookTabs />
			{m.blog()}
		</NavbarButton>
		<NavbarButton {...linkAttributes('/tools', { currentOnSubpath: true })}>
			<PencilRuler />
			{m.tools()}
		</NavbarButton>
	</nav>
	<menu class="gap-menu-gap flex flex-row">
		<NavbarSearch />
		<NavbarMenuLang>
			{#snippet trigger(dialog)}
				<NavbarButton class="aspect-square" {...dialog.getTriggerAttributes()}>
					{#snippet tooltip(instance)}
						Test
					{/snippet}
					<Languages />
				</NavbarButton>
			{/snippet}
		</NavbarMenuLang>
	</menu>
</header>
