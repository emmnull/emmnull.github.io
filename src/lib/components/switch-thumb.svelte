<script lang="ts" module>
	import { createCrossfadePreset } from '$lib/common/motion';

	export const switchThumbCrossfade = createCrossfadePreset({
		duration(l) {
			return 150 + l / 10;
		},
		easing: cubicInOut,
		fallback(node /* params, intro */) {
			return scale(node, { duration: 500, easing: elasticOut, start: 0.95 });
		}
	});
</script>

<script lang="ts">
	import { cubicInOut, elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let { current, key }: { current: boolean | undefined | string; key: any } = $props();
</script>

{#if current}
	<div
		class="switch-thumb"
		in:switchThumbCrossfade.receive={{ key }}
		out:switchThumbCrossfade.send={{ key }}
	></div>
{/if}
