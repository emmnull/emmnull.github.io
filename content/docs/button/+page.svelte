<script lang="ts">
  import { GitCompareArrows, UserPen } from 'lucide-svelte';
  import StatesSwitch from '../../../src/routes/playgrounds/states-switch.svelte';
  import Variants from '../../../src/routes/playgrounds/variants.svelte';

  const variants = {
    Default: 'button',
    Bordered: 'button-bordered',
    Dashed: 'button-dashed',
    Ghost: 'button-ghost',
    'Call-to-action': 'button-cta',
    Navigation: 'button-nav',
  };

  const states = {
    Error: { 'data-error': true },
    Success: { 'data-success': true },
  };

  let state = $state<keyof typeof states>();

  let attributes = $derived(state && states[state]);
</script>

{#snippet header()}
  <StatesSwitch {states} bind:state />
{/snippet}

<Variants {variants} {header}>
  {#snippet variant(name, classname)}
    <button class={classname} {...attributes}>
      {name}
      <GitCompareArrows />
    </button>
  {/snippet}
</Variants>

<Variants {variants} {header}>
  {#snippet variant(name, classname)}
    <button class="{classname} aspect-square" {...attributes}>
      <UserPen />
    </button>
  {/snippet}
</Variants>
