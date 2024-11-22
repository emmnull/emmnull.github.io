<script lang="ts">
	import Navigator from './navigator.svelte';
	import Toolbar from './toolbar.svelte';
	import Viewport from './viewport.svelte';

	let { data } = $props();
</script>

<main
	class="p-base-padding grid h-full flex-1 grid-cols-[[full-start_navigator-start]max-content[navigator-end_center-start]1fr[center-end_toolbar-start]max-content[toolbar-end_full-end]] grid-rows-[[full-start_navigator-start_center-start_toolbar-start]1fr[toolbar-end_center-end_navigator-end_full-end]] items-center"
>
	<Navigator />
	<Viewport />
	<Toolbar />
</main>
