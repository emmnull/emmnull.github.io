<script lang="ts">
	import { SVGEditor } from '$lib/builders/svg-editor/svg-editor.svelte';

	const editor = new SVGEditor();
</script>

<section class="sticky top-0 flex h-screen flex-col items-center justify-center">
	<svg class="h-full w-full" viewBox="0 0 500 500" {...editor.getContainerAttributes()}>
		<!-- Some svg content -->
	</svg>
</section>
