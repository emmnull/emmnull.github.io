<script lang="ts" module>
  import { bounceOut, quadInOut } from 'svelte/easing';
  import { crossfade, scale } from 'svelte/transition';

  const [send, receive] = crossfade({
    fallback(node, params, intro) {
      return scale(node, {
        easing: bounceOut,
        start: 0.75,
        duration: 300,
      });
    },
    easing: quadInOut,
    duration(l) {
      return 150 + 0.1 * l;
    },
  });
</script>

<script lang="ts">
  let { key, current }: { key: unknown; current: unknown } = $props();
</script>

{#if current}
  <span class="switch-item-thumb" in:receive={{ key }} out:send={{ key }}
  ></span>
{/if}
