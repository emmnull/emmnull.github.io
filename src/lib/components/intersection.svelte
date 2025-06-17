<script lang="ts" module>
  export class Intersection {}
</script>

<script lang="ts">
  import { type Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
