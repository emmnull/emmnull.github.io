<script lang="ts" module>
	const SIZE = 5;
	const SIZE_HALF = SIZE / 2;
</script>

<script lang="ts">
	import type { Cursor } from '$lib/common/constants';

	let {
		x = $bindable(),
		y = $bindable(),
		selected = $bindable(),
		handle,
		cursor
	}: {
		x: number;
		y: number;
		selected?: boolean;
		handle?: boolean;
		cursor?: Cursor;
	} = $props();
</script>

<rect
	data-editor-point
	width={SIZE}
	height={SIZE}
	aria-selected={selected || undefined}
	x={x - SIZE_HALF}
	y={y - SIZE_HALF}
	rx={handle ? 0.5 : SIZE_HALF}
	style:--cursor={cursor}
	class="fill-base selected:cursor-grab selected:active:cursor-grabbing hover:stroke-primary stroke-sm hover:stroke-md selected:stroke-primary-accent selected:fill-primary-accent cursor-pointer stroke-current"
/>
