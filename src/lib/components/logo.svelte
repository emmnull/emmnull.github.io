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
  <path d="M54 134H100M146 134H100M100 134V53" />
  <path
    d="M100 53C100 58.5773 98.8336 64.093 96.5758 69.1929C94.318 74.2928 91.0186 78.8642 86.8894 82.6135C82.7603 86.3628 77.8928 89.2071 72.5993 90.9639C67.3059 92.7207 61.7036 93.351 56.1521 92.8145"
  />
  <path
    d="M235 121V121C226.036 129.964 213.878 135 201.201 135H199.666C180.521 135 165 119.313 165 100.168V100.168C165 80.8377 180.67 65 200 65H200.748C216.115 65 229.448 75.6065 232.903 90.5796L233 91L232 92L165 100"
    stroke-miterlimit="1.8"
  />
  <path d="M300 144V79C300 72.3726 294.627 67 288 67H280C273.373 67 268 72.3726 268 79V144" />
  <path d="M332 144V79C332 72.3726 326.627 67 320 67H312C305.373 67 300 72.3726 300 79V144" />
</svg>
