<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let {
		preserveAspectRatio = 'xMidYMid',
		fill = 'none',
		viewBox = '0 0 400, 200',
		stroke = 'currentColor',
		'stroke-width': strokeWidth = '24',
		...props
	}: SVGAttributes<SVGElement> = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{preserveAspectRatio}
	{viewBox}
	{fill}
	{...props}
	{stroke}
	stroke-width={strokeWidth}
>
	<g data-glyph="1">
		<path id="Vector 1" d="M50 138H150" />
		<path id="Vector 2" d="M100 138V50" />
		<path
			id="Ellipse 3"
			d="M100 50C100 55.5155 98.9136 60.977 96.8029 66.0727C94.6922 71.1684 91.5985 75.7984 87.6985 79.6985C83.7984 83.5985 79.1684 86.6922 74.0727 88.8029C68.977 90.9136 63.5155 92 58 92"
		/>
	</g>
	<g data-glyph="e">
		<path
			id="Rectangle 8"
			d="M168 105L231 95V93.9032C231 76.2836 216.716 62 199.097 62V62C178.609 62 162 78.6088 162 99.0968V100C162 120.987 179.013 138 200 138H201.598C212.1 138 222.172 133.828 229.598 126.402L232 124"
		/>
	</g>
	<g data-glyph="m">
		<path
			id="Rectangle 5"
			d="M338 150V81C338 70.5066 329.493 62 319 62V62C308.507 62 300 70.5066 300 81V150"
		/>
		<path
			id="Rectangle 6"
			d="M300 150V81C300 70.5066 291.493 62 281 62V62C270.507 62 262 70.5066 262 81V150"
		/>
	</g>
</svg>
