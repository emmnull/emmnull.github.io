<script lang="ts">
	import type { Tooltip } from '$lib/builders/tooltip.svelte';
	import { toAxes } from '$lib/common/css';
	import type { Snippet } from 'svelte';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Arrow from './arrow.svelte';

	let { tooltip, children }: { tooltip: Tooltip; children?: Snippet<[Tooltip]> } = $props();
</script>

{#if tooltip.open}
	<div
		{...tooltip.getContainerAttributes()}
		class="rounded-tooltip bg-tooltip px-sm py-2xs text-xs"
		transition:fly={{
			...toAxes(tooltip.floating.computed?.placement || tooltip.floating.placement, {
				main: '0.5em'
			}),
			duration: 250,
			easing: expoOut
		}}
	>
		<Arrow {...tooltip.getArrowAttributes()} />
		{@render children?.(tooltip)}
	</div>
{/if}
