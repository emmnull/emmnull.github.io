<script lang="ts">
  import { random } from '$lib/common/number';
  import { on } from 'svelte/events';
  import type { PageData } from './$types';

  let { works }: { works: PageData['works'] } = $props();
</script>

<section class="mt-padding flex flex-col transform-3d">
  <!-- <hgroup class="max-w-body px-padding w-full self-center">
    <h2
      class="py-padding pattern-crosses pattern-color-surface pattern-spacing-[1.5rem] pattern-spread-30% bg-[center] text-lg lg:text-2xl"
    >
      Projects
    </h2>
  </hgroup> -->
  <ul
    {@attach (node) => {
      function settop() {
        console.log('settop!');
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
    class="my-padding px-gap gap-gap grid auto-rows-(--u) grid-cols-[repeat(auto-fit,minmax(var(--u),1fr))] [--scroll-y:max(0,calc(var(--spacing-scroll-y)-var(--top)))] [--top:2000] [--u:50px] transform-3d"
  >
    {#each works as w, i}
      <div>{w.slug}</div>
      {#if w.metadata.covers}
        {#each w.metadata.covers as src, ii}
          {@const ratio = src.img.w / src.img.h}
          {@const scale = Math.round(random(4, 10))}
          <li
            style:--i={i}
            style:--ii={ii}
            class="ease-exp-out _opacity-[min(100%,0.3%*(var(--scroll-y)+100*var(--ii)))] relative col-span-(--col) row-span-(--row) translate-z-[calc(var(--z)-var(--z)*min(1,.001*(var(--scroll-y)-100*var(--i))))] transition duration-200 transform-3d"
            style:--col={scale}
            style:--row={Math.round(scale / ratio)}
            style:--z="{Math.round(random(10, 100))}px"
          >
            <enhanced:img
              {src}
              width="20px"
              height="20px"
              class="block size-full overflow-hidden rounded-sm object-cover"
            />
          </li>
        {/each}
      {/if}
    {/each}
  </ul>
</section>
