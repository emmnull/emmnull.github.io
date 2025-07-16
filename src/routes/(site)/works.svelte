<script lang="ts">
  import { random } from '$lib/common/number';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { on } from 'svelte/events';
  import type { PageData } from './$types';

  let { works }: { works: PageData['works'] } = $props();
</script>

<section class="mt-gap rounded-section mx-gap flex flex-col transform-3d">
  <hgroup class="max-w-body px-padding w-full self-center">
    <h2 class="py-padding text-lg lg:text-2xl">some works</h2>
  </hgroup>
  <ul
    {@attach (node) => {
      function settop() {
        const r1 = node.getBoundingClientRect();
        const r2 = document.documentElement.getBoundingClientRect();
        node.style.setProperty(
          '--top',
          String(Math.round(r1.top - window.innerHeight - r2.top)),
        );
      }
      settop();
      on(window, 'resize', () => settop);
    }}
    class="group/works my-padding px-gap gap-gap flex auto-rows-(--u) grid-cols-[repeat(auto-fit,minmax(var(--u),1fr))] flex-col [--scroll-y:max(0,calc(var(--spacing-scroll-y)-var(--top)))] [--top:2000] [--u:50px] transform-3d lg:grid"
  >
    {#each works as w, i (w)}
      {#if w.metadata.covers}
        {#each w.metadata.covers as src, ii (src)}
          {@const ratio = src.img.w / src.img.h}
          {@const scale = Math.round(random(4, 10))}
          <li
            data-cover={!ii || undefined}
            style:--i={i}
            style:--ii={ii}
            class="ease-exp-out bg-surface group relative col-span-(--col) row-span-(--row) translate-z-[calc(var(--z)-var(--z)*min(1,.001*(var(--scroll-y)-100*var(--i))))] rounded-(--radius) transition duration-350 will-change-transform [--radius:var(--radius-sm)] transform-3d not-lg:not-data-cover:hidden"
            style:--col={scale}
            style:--row={Math.round(scale / ratio)}
            style:--z="{Math.round(random(10, 100))}px"
          >
            <enhanced:img
              alt="Cover image for {w.metadata.title}"
              {src}
              class="block size-full overflow-hidden rounded-(--radius) object-cover opacity-[min(100%,0.1%*(var(--scroll-y)+100*var(--ii)))] will-change-[opacity]"
            />
            <div
              class="p-gap absolute inset-0 flex items-center justify-center text-xs"
            >
              <a
                {...getLinkAttributes(`/works/${w.slug}`)}
                class="bg-overlay badge-base scale-105 opacity-0 shadow-md backdrop-blur-[6px] transition-all duration-150 group-hover:scale-100 group-hover:opacity-100"
              >
                <span class="overflow-hidden text-ellipsis">
                  {w.metadata.title}
                </span>
              </a>
            </div>
          </li>
        {/each}
      {/if}
    {/each}
  </ul>
</section>
