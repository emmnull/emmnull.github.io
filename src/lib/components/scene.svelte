<script lang="ts">
  import { browser } from '$app/environment';
  import { Spring } from 'svelte/motion';

  function onmousemove(e: MouseEvent) {
    p.set({ x: e.clientX, y: e.clientY, a: 2 });
  }

  const p = new Spring(
    {
      x: browser ? document.body.clientWidth / 2 : 0,
      y: browser ? document.body.clientHeight / 2 : 0,
      a: 40,
    },
    { stiffness: 0.075, damping: 0.35 },
  );
</script>

<svelte:window {onmousemove} />

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="fixed top-0 left-0"
  width="100%"
  height="100%"
>
  <rect
    fill="var(--color-primary)"
    width="500"
    height="500"
    rx="25"
    x={p.current.x}
    y={p.current.y}
    transform="rotate({p.current.a} {p.current.x} {p.current.y})"
  />
</svg>
