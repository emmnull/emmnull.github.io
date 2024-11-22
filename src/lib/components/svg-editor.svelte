<script lang="ts" module>
	const [getSVGEditorContext, setSVGEditorContext] = defineContext<SVGEditor>({});

	export { getSVGEditorContext };

	export type SVGEditorOptions = {
		tools?: Record<string, Tool>;
		views?: Record<string, View>;
	};

	export class SVGEditor<T extends SVGEditorOptions = {}> {
		#options;
		#selection = new SvelteSet<{}>();

		constructor(options: T = {} as T) {
			this.#options = options;
			setSVGEditorContext(this);
		}

		getContainerAttributes() {
			const _this = this;
			return {
				get 'aria-multiselectable'() {
					return undefined;
				},
				onpointerdown(e) {},
				onpointerup(e) {},
				onpointermove(e) {},
				onpointercancel(e) {}
			} as SVGAttributes<SVGSVGElement>;
		}
	}
</script>

<script lang="ts" generics="T extends SVGEditorOptions">
	import type { Tool } from '$lib/builders/svg-editor/tools/tool.svelte';
	import { defineContext } from '$lib/common/context';
	import type { View } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import type { SVGAttributes } from 'svelte/elements';
	import { SvelteSet } from 'svelte/reactivity';

	let {
		children,
		options,
		...svgProps
	}: {
		children?: Snippet;
		options?: ConstructorParameters<typeof SVGEditor<T>>[0];
	} & SVGAttributes<SVGElement> = $props();

	const editor = new SVGEditor(options);
</script>

<svg {...svgProps} {...editor.getContainerAttributes()}>
	{@render children?.()}
</svg>
