<script lang="ts" generics="T extends Record<string, unknown>">
  import SwitchItemThumb from '$lib/components/switch-item-thumb.svelte';

  let { states, state = $bindable() }: { states: T; state?: keyof T } =
    $props();

  const key = {};
</script>

<fieldset class="switch-bordered text-sm">
  {#each [undefined, ...Object.keys(states)] as name}
    <label class="switch-item">
      <SwitchItemThumb {key} current={name === state} />
      <input type="radio" class="hidden" bind:group={state} value={name} />
      {name ?? 'Plain'}
    </label>
  {/each}
</fieldset>
