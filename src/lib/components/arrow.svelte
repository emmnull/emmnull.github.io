<!--
	@component
	A small arrow typically used to show where popovers, tooltips, or other elements are anchored.
-->
<script lang="ts">
	import { cn } from '$lib/common/css';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		roundness = 25,
		size = '0.75em',
		class: className,
		...svgProps
	}: {
		roundness?: number;
		size?: number | string;
		class?: string;
	} & HTMLAttributes<SVGElement> = $props();
</script>

<svg
	class={cn(
		'fill-tooltip bg-transparent data-[floating-placement="top"]:top-full data-[floating-placement="bottom"]:bottom-full data-[floating-placement="bottom"]:rotate-180 data-[floating-placement="left"]:left-full data-[floating-placement="left"]:-rotate-90 data-[floating-placement="right"]:right-full data-[floating-placement="right"]:rotate-90',
		className
	)}
	width={size}
	height={size}
	viewBox="0 0 100 100"
	preserveAspectRatio="xMinYMin slice"
	style:--arrow-size={typeof size === 'number' ? size + 'px' : size}
	{...svgProps}
>
	<path
		fill="inherit"
		d="M 0,0 C {roundness},0 {50 - roundness},75 50,75 C {50 + roundness},75 {100 -
			roundness},0 100,-0 Z"
	/>
</svg>

<!--
<svg
	class="tip {positioning ? positioning.placement : ''}"
	width={size}
	height={size}
	viewBox="25 0 75 50"
	preserveAspectRatio="xMinYMin slice"
	style:--size={typeof size === 'number' ? size + 'px' : size}
	{...arrow}
	use:arrowaction
	style:top
	style:right
	style:bottom
	style:left
	style:transform
>
	<path {d} />
</svg>

<style>
	.tip {
		pointer-events: none;
		user-select: none;
		position: absolute;
		padding: 0;
		margin: 0;
		background: transparent;
		overflow: visible;
	}

	path {
		fill: var(--tip-color, inherit);
	}

	.top,
	.top-start,
	.top-end {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
	}

	.right,
	.right-start,
	.right-end {
		right: 100%;
		top: 50%;
		transform: rotateZ(90deg) translateX(-50%);
	}

	.bottom,
	.bottom-start,
	.bottom-end {
		bottom: 100%;
		left: 50%;
		transform: rotateZ(180deg) translateX(50%);
	}

	.left,
	.left-start,
	.left-end {
		left: 100%;
		top: 50%;
		transform: rotateZ(-90deg) translateX(50%);
	}
</style> -->
