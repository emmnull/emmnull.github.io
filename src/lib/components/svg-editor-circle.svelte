<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SVGAttributes } from 'Svelte/elements';
	import SvgEditorBbox from './svg-editor-bbox.svelte';
	import SvgEditorShape from './svg-editor-geometry.svelte';
	import SvgEditorPoint from './svg-editor-point.svelte';

	let {
		cx = $bindable(0),
		cy = $bindable(0),
		r = $bindable(0),
		selected = $bindable(),
		children,
		...circleProps
	}: {
		cx?: number;
		cy?: number;
		r?: number;
		selected?: boolean;
		children?: Snippet;
	} & SVGAttributes<SVGCircleElement> = $props();

	let angle = $state<number>();
</script>

<SvgEditorShape bind:selected snapshot={() => ({ cx, cy, r })}>
	{#snippet shape(getShapeAttributes)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<circle
			{...circleProps}
			{cx}
			{cy}
			{r}
			{...getShapeAttributes()}
			onmousemove={(e) => {
				// update angle
			}}
			onmouseleave={(e) => (angle = undefined)}
		>
			{@render children?.()}
		</circle>
	{/snippet}
	{#snippet controls()}
		<SvgEditorPoint bind:x={cx} bind:y={cy} bind:selected />
		<SvgEditorPoint x={0} y={0} handle {selected} />
		<SvgEditorBbox x={cx - r} y={cy - r} width={2 * r} height={2 * r} />
	{/snippet}
</SvgEditorShape>
