<script lang="ts">
	import SvgEditorPath from '$lib/components/svg-editor-path.svelte';
	import SvgEditor from '$lib/components/svg-editor.svelte';

	let d = $state('M 200,200 L 350,325 200,100');

	$inspect(d);
</script>

<section class="h-main-height top-navbar-height sticky flex flex-col items-center justify-center">
	<SvgEditor class="border-sm h-full w-full border-[pink]" viewBox="0 0 500 500">
		<SvgEditorPath bind:d stroke="currentColor" stroke-width="24" fill="none" />
	</SvgEditor>
</section>
