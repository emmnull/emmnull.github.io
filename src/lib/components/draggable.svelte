<script lang="ts" module>
  export class Draggable {
    constructor() {}

    getDraggableAttributes() {
      return {} satisfies HTMLAttributes<HTMLElement>;
    }
  }
</script>

<script lang="ts">
  import { type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  let { children }: { children: Snippet } = $props();

  const draggable = new Draggable();
</script>

{@render children()}
