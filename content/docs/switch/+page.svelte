<script lang="ts">
  import StatesSwitch from '../states-switch.svelte';
  import Variants from '../variants.svelte';

  const variants = {
    Default: 'switch',
    Bordered: 'switch-bordered',
    Dashed: 'switch-dashed',
    Ghost: 'switch-ghost',
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
    <menu class={classname} {...attributes}>
      {#each ['Foo', 'Bar', 'Bazz'] as option}
        <label class="switch-item">
          {option}
          <input type="radio" {name} value={option} class="hidden" />
        </label>
      {/each}
    </menu>
  {/snippet}
</Variants>
