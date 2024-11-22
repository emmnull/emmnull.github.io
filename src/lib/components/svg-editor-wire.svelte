<script lang="ts" generics="T extends keyof SVGElementTagNameMap">
	import type { SVGAttributes } from 'svelte/elements';

	let { this: element, ...restProps }: { this: T } & SVGAttributes<SVGElementTagNameMap[T]> =
		$props();
</script>

<svelte:element this={element} {...restProps as any} class="stroke-sm fill-none stroke-current" />
