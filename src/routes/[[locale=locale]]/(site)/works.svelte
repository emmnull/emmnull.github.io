<script lang="ts">
  import { resolve } from '$app/paths';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { on } from 'svelte/events';
  import type { PageData } from './$types';

  let { images }: Pick<PageData, 'images'> = $props();
</script>

<section class="mt-padding flex flex-col gap-padding">
  <!-- <h2
    class="
      w-full max-w-body self-center px-padding text-xl font-medium
      lg:text-2xl
    "
  >
    {m.works_phrase()}
  </h2> -->
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
      on(window, 'resize', settop);
    }}
    class="
      @container flex grid-flow-dense auto-rows-[calc(1cqw*var(--row))]
      grid-cols-[repeat(var(--cols),minmax(0,1fr))] flex-col gap-gap
      pattern-crosses bg-center p-padding
      [--cols:5]
      [--row:5]
      [--scroll-y:max(0,calc(var(--spacing-scroll-y)-var(--top)))]
      [--top:3000]
      pattern-color-surface pattern-size-[33%] pattern-spacing-[1.5rem]
      pattern-thickness-[1px]
      lg:grid lg:gap-0 lg:px-[calc(var(--spacing-gap)/2)]
    "
  >
    {#each images as datum, i ('img' in datum.image ? datum.image.img.src : datum.image.video.src)}
      {@const w =
        'img' in datum.image ? datum.image.img.w : datum.image.video.w}
      {@const h =
        'img' in datum.image ? datum.image.img.h : datum.image.video.h}
      <li
        style:--i={i}
        style:--w={w}
        style:--h={h}
        style:--factor={w > h ? Math.round(1 + Math.random() * 2) : 1}
        class="
          group relative col-span-(--factor)
          row-span-[round((var(--h)/var(--w))*(100/var(--cols))/var(--row)*var(--factor))]
          rounded-(--radius) bg-surface transition duration-350 ease-exp-out
          will-change-transform
          [--radius:var(--radius-sm)]
          transform-3d
          lg:m-[calc(var(--spacing-gap)/2)]
        "
      >
        {#if 'img' in datum.image}
          <enhanced:img
            alt="Cover image for {datum.metadata.title}"
            src={datum.image}
            class="
              relative size-full rounded-(--radius) object-cover
              lg:absolute
            "
          />
        {:else}
          <video
            autoplay
            loop
            muted
            width={datum.image.video.w}
            height={datum.image.video.h}
            class="
              relative size-full rounded-(--radius) object-cover
              lg:absolute
            "
          >
            <source src={datum.image.video.src} type="video/mp4" />
            <track kind="captions" label="No captions" srcLang="en" />
          </video>
        {/if}
        <div
          data-theme="dark"
          class="
            absolute inset-0 flex items-center justify-center p-[1rem] text-xs
          "
        >
          <a
            {...getLinkAttributes(
              resolve('/(site)/works/[slug]', { slug: datum.params.slug }),
            )}
            class="
              pointer-events-none flex translate-y-[.5em] gap-[1em]
              overflow-x-hidden rounded-full border-[1px] border-current/10
              bg-overlay px-[1.25em] py-[.5em] whitespace-nowrap text-base
              opacity-0 shadow-md transition-all duration-100
              group-hover:translate-y-0 group-hover:opacity-100
            "
          >
            <span class="overflow-hidden text-ellipsis">
              {datum.metadata.title}
            </span>
          </a>
        </div>
      </li>
    {/each}
  </ul>
</section>
