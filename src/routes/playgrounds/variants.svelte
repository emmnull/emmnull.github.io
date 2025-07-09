<script lang="ts" generics="T extends Record<string, unknown>">
  import { type Snippet } from 'svelte';

  let {
    variants,
    variant,
    header,
  }: {
    variants: T;
    variant: Snippet<[keyof T, T[keyof T]]>;
    header?: Snippet;
  } = $props();
</script>

<section
  class="bg-surface flex flex-col rounded-(--radius) [--radius:var(--radius-lg)]"
>
  {#if header}
    <header class="flex flex-row p-4">
      {@render header()}
    </header>
  {/if}
  <div
    class="p-padding gap-gap border-io/io-border bg-background from-surface mx-(--inset) mb-(--inset) flex flex-row flex-wrap rounded-t-sm rounded-b-[calc(var(--radius)-var(--inset))] border bg-radial from-[1px] to-transparent to-[1px] bg-[length:1rem_1rem] bg-repeat [--inset:--spacing(2)]"
  >
    {#each Object.entries(variants) as [k, v]}
      {@render variant(k, v as T[keyof T])}
    {/each}
  </div>
</section>
