<script lang="ts" generics="T">
  import { PointerSnapshot } from '$lib/builders/pointer-snapshot.svelte';
  import type { Snippet } from 'svelte';
  import type { SVGAttributes } from 'svelte/elements';

  let {
    shape,
    controls,
    selected = $bindable(),
    snapshot,
  }: {
    shape: Snippet<[typeof getGeometryAttributes]>;
    selected: boolean | undefined;
    controls?: Snippet;
    snapshot: () => T;
  } = $props();

  const start = new PointerSnapshot<T>();

  function getGeometryAttributes() {
    return {
      // onpointerdown(e) {
      // 	start.save(e, snapshot());
      // 	e.stopPropagation();
      // },
      // onclick(e) {
      // 	selected = !selected;
      // },
      // onpointerup(e) {
      // 	if (!selected) {
      // 		start.clear(e);
      // 	}
      // },
      class:
        'group-selected:cursor-grab group-selected:active:cursor-grabbing cursor-pointer' as const,
    } satisfies SVGAttributes<SVGElement>;
  }
</script>

<g class="group" aria-selected={selected || undefined}>
  {@render shape(getGeometryAttributes)}
  <g data-controls class="group-selected:[display:initial] hidden group-hover:[display:initial]">
    {@render controls?.()}
  </g>
</g>
