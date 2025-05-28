<!--
@component
Group of code blocks as tabs
-->

<script lang="ts" generics="T extends string">
  import { type Snippet } from 'svelte';

  let { children, current = $bindable() }: { children: Snippet; current?: T; items: T[] } =
    $props();
</script>

<section>
  {@render children()}
</section>
