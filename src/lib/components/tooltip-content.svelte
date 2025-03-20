<script lang="ts">
  import { getAxialDistances } from '$lib//rigs/floating';
  import type { Tooltip } from '$lib//rigs/tooltip.svelte';
  import type { Snippet } from 'svelte';
  import { expoOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Arrow from './arrow.svelte';

  let { tooltip, children }: { tooltip: Tooltip; children?: Snippet<[Tooltip]> } = $props();
</script>

{#if tooltip.open}
  <div
    {...tooltip.getContentAttributes()}
    class="rounded-tooltip bg-tooltip px-sm py-2xs text-x-base overflow-visible text-xs"
    transition:fly={{
      ...getAxialDistances(tooltip.computed?.placement ?? tooltip.placement, { main: '0.5em' }),
      duration: 250,
      easing: expoOut,
    }}
  >
    <Arrow {...tooltip.getArrowAttributes()} />
    {@render children?.(tooltip)}
  </div>
{/if}
