<script lang="ts" generics="T extends keyof HTMLElementTagNameMap = 'section'">
  import type { Snippet } from 'svelte';

  let { children }: { children?: Snippet } = $props();

  let height = $state<number>();
</script>

<section class="bg-primary flex-none overflow-visible" style:height="{height}px">
  <div class="h-screen overflow-x-scroll sticky top-0" bind:clientWidth={height}>
    {@render children?.()}
  </div>
</section>
