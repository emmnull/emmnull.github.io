<script module lang="ts">
	const group = Symbol('navbar-button');

	let l = 0;
</script>

<script lang="ts">
	import { Tooltip } from '$lib/builders/tooltip.svelte';
	import { cn } from '$lib/common/css';
	import { onMount, type Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import Ripple from './ripple.svelte';
	import TooltipContainer from './tooltip-container.svelte';

	let {
		href,
		children,
		class: className,
		tooltip: tooltipContent,
		...buttonProps
	}: { tooltip?: Snippet<[Tooltip]> } & (
		| HTMLAnchorAttributes
		| (HTMLButtonAttributes & {
				href?: undefined;
				hreflang?: undefined;
		  })
	) = $props();

	const i = l++;
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});

	const tooltip = new Tooltip({ group, placement: 'bottom' });
</script>

{#if tooltipContent}
	<TooltipContainer {tooltip}>
		{@render tooltipContent(tooltip)}
	</TooltipContainer>
{/if}
{#if mounted}
	<svelte:element
		this={href ? 'a' : 'button'}
		{href}
		{...buttonProps}
		class={cn('button-navbar', className)}
		{...tooltipContent ? tooltip.getTriggerAttributes() : {}}
		in:fly={{ y: 6, delay: i * 100 }}
	>
		<Ripple />
		{@render children?.()}
	</svelte:element>
{/if}
