<script lang="ts" module>
	class PathData {
		static #parser = new SVGPathDataParser();
		static parse(d: string) {
			return PathData.#parser.parse(d + ' ');
		}

		#parsed = $state<SVGCommand[]>([]);
		#options;

		constructor(options: { value: string }) {
			this.#parsed = PathData.parse(options.value);
			this.#options = options;
			$effect.root(() => {
				// this.#parsed =
			});
		}

		get value() {
			return this.#options.value;
		}

		get parsed() {
			return this.#parsed;
		}

		set parsed(data) {
			this.#parsed = data;
			this.#options.value = encodeSVGPath(data);
		}
	}
</script>

<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { SVGAttributes } from 'Svelte/elements';
	import { encodeSVGPath, SVGPathData, SVGPathDataParser, type SVGCommand } from 'svg-pathdata';
	import SvgEditorGeometry from './svg-editor-geometry.svelte';
	import SvgEditorPoint from './svg-editor-point.svelte';
	import SvgEditorWire from './svg-editor-wire.svelte';

	let {
		d = $bindable(''),
		selected = $bindable(),
		children,
		...pathProps
	}: {
		d: string;
		selected?: boolean;
		children?: Snippet;
	} & SVGAttributes<SVGPathElement> = $props();

	const data = new PathData({
		get value() {
			return d;
		},
		set value(v) {
			d = v;
		}
	});
</script>

<SvgEditorGeometry bind:selected snapshot={() => ({})}>
	{#snippet shape(getShapeAttributes)}
		<path {...pathProps} {d} {...getShapeAttributes()}>
			{@render children?.()}
		</path>
	{/snippet}
	{#snippet controls()}
		<SvgEditorWire this="path" {d} />
		{#each data.parsed as command}
			{#if command.type === SVGPathData.MOVE_TO}
				<SvgEditorPoint bind:x={command.x} bind:y={command.y} />
			{:else if command.type === SVGPathData.LINE_TO}
				<SvgEditorPoint bind:x={command.x} bind:y={command.y} />
			{:else if command.type === SVGPathData.ARC}
				<SvgEditorPoint bind:x={command.x} bind:y={command.y} />
			{/if}
		{/each}
	{/snippet}
</SvgEditorGeometry>
