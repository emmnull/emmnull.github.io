<script lang="ts">
	let { items }: { items: unknown[] } = $props();
</script>

{#snippet treeItem()}
	<li>thing</li>
{/snippet}

<menu class="flex flex-col">
	{#each items as item, i}
		{@render treeItem()}
	{/each}
</menu>
