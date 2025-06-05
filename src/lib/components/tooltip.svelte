<script lang="ts" module>
  export class Tooltip {}
</script>

<script lang="ts" generics="T extends ComputePositionConfig">
  import type { ComputePositionConfig } from '@floating-ui/dom';
  import type { Snippet } from 'svelte';

  let {
    anchor,
    content,
    ...options
  }: { anchor: Snippet<[]>; content: Snippet<[]> } & T = $props();

  const tooltip = new Tooltip();
</script>

{@render anchor()}
{@render content()}
