<!--
	@component
	A small arrow typically used to show where popovers, tooltips, or other elements are anchored.
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    roundness = 25,
    size = '0.75em',
    ...svgProps
  }: {
    roundness?: number;
    size?: number | string;
    class?: string;
  } & HTMLAttributes<SVGElement> = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 100 100"
  preserveAspectRatio="xMinYMin slice"
  {...svgProps}
>
  <path
    fill="inherit"
    d="M 0,0 C {roundness},0 {50 - roundness},75 50,75 C {50 +
      roundness},75 {100 - roundness},0 100,-0 Z"
  />
</svg>
