<script lang="ts" module>
	import { defineContext } from '$lib/common/context';
	import { clamp } from '$lib/common/number';

	const [getViewportContext, setViewportContext] = defineContext<{}>({});

	export { getViewportContext };
</script>

<script lang="ts">
	import { KEYS } from '$lib/common/constants';
	import { isKeyCombo } from '$lib/common/event';
	import { isMacOS } from '$lib/common/platform';

	let {
		width = 28,
		height = 28,
		ratio = 1,
		zoom = $bindable(1),
		zoomStep = 0.1,
		zoomMin = 0.5,
		zoomMax = 500
	}: {
		width?: number;
		height?: number;
		ratio?: number;
		zoom?: number;
		zoomStep?: number;
		zoomMin?: number;
		zoomMax?: number;
	} = $props();

	setViewportContext({});

	let panning = $state(false);
	let down = $state<{ x: number; y: number }>();
	let translate = $state({ x: 0, y: 0 });
</script>

<svelte:window
	onkeydown={(e) => {
		if (isKeyCombo(e, { key: KEYS.SPACE })) {
			e.preventDefault();
			panning = true;
		} else if (isKeyCombo(e, { key: '0', meta: isMacOS, ctrl: !isMacOS })) {
			e.preventDefault();
			zoom = 1;
		}
	}}
	onkeyup={(e) => {
		if (isKeyCombo(e, { key: KEYS.SPACE })) {
			panning = false;
		}
	}}
	onpointermove={(e) => {
		if (!down) return;
		translate.x += e.screenX - down.x;
		translate.y += e.screenY - down.y;
	}}
	onpointerup={(e) => {
		down = undefined;
	}}
/>

<figure
	data-panning={panning || undefined}
	class="absolute inset-0 flex items-center justify-center overflow-scroll bg-[red] p-[500px] [grid-area:full] data-[panning]:cursor-[grab] data-[panning]:active:cursor-[grabbing]"
	onwheel={(e) => {
		e.preventDefault();
		zoom = clamp(zoom + zoomStep * -e.deltaY, zoomMin, zoomMax);
	}}
	onpointerdown={(e) => {
		down = { x: e.screenX, y: e.screenY };
	}}
>
	<svg
		width={width * zoom}
		height={height * zoom}
		style:--width="{width}px"
		style:--height="{height}px"
		style:--zoom={zoom}
		style:--translate-y="{translate.y}px"
		style:--translate-x="{translate.x}px"
		class="border-pure translate-x-(--translate-x) translate-y-(--translate-y) overflow-visible border"
		viewBox="0 0 {width} {height}"
		preserveAspectRatio="xMidYMid meet"
	>
		<circle cx="10" cy="10" r="10" fill="blue" />
	</svg>
</figure>
