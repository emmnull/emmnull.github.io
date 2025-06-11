<!--
	@component
	Singleton for providing theme breakpoints in js
-->
<script module lang="ts">
  import { browser } from '$app/environment';
  import { MediaQuery } from 'svelte/reactivity';

  const styles = browser ? getComputedStyle(document.documentElement) : null;

  export const lg = new MediaQuery(
    `width >= ${styles?.getPropertyValue('--breakpoint-lg') ?? '48rem'}`,
    false,
  );
</script>
