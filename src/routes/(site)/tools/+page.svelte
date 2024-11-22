<script lang="ts">
	import Ripple from '$lib/components/ripple.svelte';
	import * as m from '$messages';
	let { data } = $props();
</script>

<h1>
	{m.tools()}
</h1>
<nav class="p-base-padding gap-base-gap flex">
	{#each Object.entries(data.tools) as [subroute, tool]}
		<a href="/tools{subroute}" class="rounded-card bg-card/50 p-lg hover:bg-card relative flex">
			<Ripple />
			{tool.metadata.title}
		</a>
	{/each}
</nav>
