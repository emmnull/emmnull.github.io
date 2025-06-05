<script lang="ts">
  import { type Snippet } from 'svelte';
  import { Spring } from 'svelte/motion';

  let { children }: { children?: Snippet } = $props();

  let entered = $state(false);

  const p0 = new Spring({ x: 0, y: 0 }, { stiffness: 0.25, damping: 0.5 });

  const p1 = new Spring(
    { ...p0.current, d: 0 },
    { stiffness: 0.1, damping: 0.5 },
  );

  function onmousemove(e: MouseEvent) {
    onmouseenter(e);
    p0.set({ x: e.clientX, y: e.clientY });
    p1.set({
      x: e.clientX,
      y: e.clientY,
      d: Math.hypot(p1.target.x - e.clientX, p1.target.y - e.clientY),
    });
  }

  function onmouseleave(e: MouseEvent) {
    // entered = false;
  }

  function onmouseenter(e: MouseEvent) {
    entered = true;
  }
</script>

<svelte:document {onmousemove} {onmouseenter} {onmouseleave} />

<svg>
  <defs>
    <filter id="cursor-filter">
      <feFlood height="1" width="1" />
      <feComposite width="4" height="4" />
      <feTile result="a" />
      <feComposite in="SourceGraphic" in2="a" operator="in" />
      <feMorphology operator="dilate" radius="2" />
    </filter>
  </defs>
</svg>

<div
  data-entered={entered || undefined}
  style:left="{p1.current.x}px"
  style:top="{p1.current.y}px"
  style:--d={Math.round(p1.current.d * 100) / 1000 + 1}
  class="fixed [backdrop-filter:url(#cursor-filter)] aspect-square size-[calc(var(--d)*10em)] rounded-full z-frontmost -translate-1/2 pointer-events-none"
></div>
<div
  data-entered={entered || undefined}
  style:left="{p0.current.x}px"
  style:top="{p0.current.y}px"
  class="fixed bg-[black] aspect-square size-2 rounded-full z-frontmost -translate-1/2 invert pointer-events-none"
>
  {@render children?.()}
</div>

<style>
  :global(*) {
    cursor: none;
  }
</style>
