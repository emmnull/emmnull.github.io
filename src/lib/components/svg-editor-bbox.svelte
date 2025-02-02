<script lang="ts">
  import SvgEditorPoint from './svg-editor-point.svelte';

  let { x, y, width, height }: { x: number; y: number; width: number; height: number } = $props();
</script>

<g data-editor-bbox>
  <rect data-svg-editor-point {width} {height} {x} {y} class="stroke-x-io fill-none" />
  <SvgEditorPoint {x} {y} />
  <SvgEditorPoint {x} y={y + width} />
  <SvgEditorPoint x={x + width} {y} />
  <SvgEditorPoint x={x + width} y={y + width} />
</g>
