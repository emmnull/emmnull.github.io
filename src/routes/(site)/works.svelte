<script lang="ts">
  import { random } from '$lib/common/number';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { on } from 'svelte/events';
  import type { PageData } from './$types';

  let { works }: { works: PageData['works'] } = $props();
</script>

<section
  class="mt-padding flex flex-col gap-padding rounded-section py-padding"
>
  <h2
    class="
      w-full max-w-body self-center px-padding text-xl font-medium
      lg:text-2xl
    "
  >
    previous works
  </h2>
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
    class="
      group/works flex grid-flow-dense auto-rows-(--u)
      grid-cols-[repeat(auto-fit,minmax(var(--u),1fr))] flex-col gap-gap
      pattern-crosses bg-center p-padding
      [--scroll-y:max(0,calc(var(--spacing-scroll-y)-var(--top)))]
      [--top:3000]
      [--u:200px]
      pattern-color-surface pattern-size-[25%] pattern-spacing-[25px]
      lg:grid
    "
  >
    {#each works.flatMap(({ metadata, slug }) => {
      const { images, ...restMetadata } = metadata;
      return images ? images.map((src, i) => {
            return { src, ...restMetadata, slug, isBanner: !i };
          }) : [];
    }) as image, i (image)}
      {@const ratio =
        typeof image.src === 'string' ? 1.6 : image.src.img.w / image.src.img.h}
      <li
        style:--i={i}
        style:--ratio={ratio}
        style:--col={Math.round(random(1, 3))}
        class="
          group relative col-span-(--col)
          row-span-[round(calc(var(--col)/var(--ratio)))] rounded-(--radius)
          bg-surface transition duration-350 ease-exp-out will-change-transform
          [--radius:var(--radius-md)]
          transform-3d
          not-lg:not-data-cover:hidden
        "
      >
        <div
          class="
            absolute size-full overflow-hidden rounded-(--radius)
            opacity-[min(100%,0.1%*(var(--scroll-y)+100*var(--ii)))]
            transition-opacity
            group-hover:opacity-50
          "
        >
          {#if typeof image.src === 'string'}
            <video
              autoplay
              loop
              muted
              width="1600"
              height="1000"
              class="absolute size-full object-cover"
            >
              <source src={image.src} type="video/mp4" />
              <track kind="captions" label="No captions" srcLang="en" />
            </video>
          {:else}
            <enhanced:img
              alt="Cover image for {image.title}"
              src={image.src}
              class="absolute size-full object-cover"
            />
          {/if}
        </div>
        <div
          data-theme="dark"
          class="
            absolute inset-0 flex items-center justify-center p-[1rem] text-xs
          "
        >
          <a
            {...getLinkAttributes(`/works/${image.slug}`)}
            class="
              flex translate-y-[.5em] gap-[1em] overflow-x-hidden rounded-full
              border-[1px] border-current/10 bg-overlay px-[1.25em] py-[.5em]
              whitespace-nowrap text-base opacity-0 shadow-md transition-all
              duration-100
              group-hover:translate-y-0 group-hover:opacity-100
            "
          >
            <span class="overflow-hidden text-ellipsis">
              {image.title}
            </span>
          </a>
        </div>
      </li>
    {/each}
  </ul>
</section>
