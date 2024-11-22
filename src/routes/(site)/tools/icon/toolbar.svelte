<script lang="ts">
	import { Tooltip } from '$lib/builders/tooltip.svelte';
	import Ripple from '$lib/components/ripple.svelte';
	import TooltipContainer from '$lib/components/tooltip-container.svelte';
	import { TOOLS } from './constants';
</script>

<menu class="p-sm gap-menu-gap bg-card flex flex-col rounded-lg text-sm [grid-area:toolbar]">
	{#each Object.entries(TOOLS) as [name, tool]}
		{@const tooltip = new Tooltip({ placement: 'left', lightDismiss: true })}
		{#if tool.description || tool.hotkey}
			<TooltipContainer {tooltip}>
				{#if tool.description}
					{tool.description}
				{/if}
				{#if tool.hotkey}
					<kbd class="key text-2xs">HI MOM</kbd>
				{/if}
			</TooltipContainer>
		{/if}
		<button
			class="button-ghost aspect-square"
			{...tool.getTriggerAttributes()}
			{...tooltip.getTriggerAttributes()}
		>
			<Ripple />
			<svelte:component this={tool.icon} />
		</button>
	{/each}
</menu>
