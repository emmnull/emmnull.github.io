<script module lang="ts">
  const group = Symbol();

  let l = 0;
</script>

<script lang="ts">
  import { Tooltip } from '$lib/builders/tooltip.svelte';
  import { cn } from '$lib/common/css';
  import { onMount, type Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import { fly } from 'svelte/transition';
  import Ripple from './ripple.svelte';
  import TooltipRoot from './tooltip-content.svelte';

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
  <TooltipRoot {tooltip}>
    {@render tooltipContent(tooltip)}
  </TooltipRoot>
{/if}
{#if mounted}
  <svelte:element
    this={href ? 'a' : 'button'}
    draggable="false"
    {href}
    {...buttonProps}
    class={cn('button-nav', className)}
    {...tooltipContent ? tooltip.getTriggerAttributes() : {}}
    in:fly={{ y: 6, delay: i * 100 }}
  >
    <Ripple />
    {@render children?.()}
  </svelte:element>
{/if}
