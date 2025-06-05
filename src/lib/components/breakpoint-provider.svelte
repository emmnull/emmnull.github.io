<!--
	@component
	Singleton for providing theme breakpoints in js
-->
<script module lang="ts">
  import { MediaQuery } from 'svelte/reactivity';

  export const lg = new MediaQuery('width >= 48rem', false);
</script>
