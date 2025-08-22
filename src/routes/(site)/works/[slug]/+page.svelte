<script lang="ts">
  import { tags_details } from '$lib/data/meta';

  let { data } = $props();
</script>

<article
  class="
    pointer-events-none mt-navbar-height w-full max-w-body self-center p-padding
  "
>
  <hgroup
    class="
      flex min-h-[50vh] max-w-prose-body flex-col items-start justify-center
      leading-[1.2]
    "
  >
    <h1 class="text-2xl font-semibold">
      {data.work.metadata.title}
    </h1>
    <span class="font-mono text-2xl opacity-25">{data.work.metadata.year}</span>
    <ul class="flex gap-(--outline-width-io) text-sm">
      {#each data.work.metadata.tags as tag (tag)}
        <li class="chip">{tags_details[tag].label}</li>
      {/each}
    </ul>
  </hgroup>
  <section class="*:pointer-events-auto">
    <data.work.default />
  </section>
</article>
<ul
  class="
    sticky bottom-0 left-0 -z-1 no-scrollbar flex h-lvh w-full flex-nowrap
    gap-gap overflow-x-scroll py-navbar-height
    pr-[max(0px,(100vw-var(--spacing-body))/2+var(--spacing-padding))] pl-[50vw]
  "
>
  {#each data.work.metadata.images as image ('img' in image ? image.img.src : image.video.src)}
    <li
      class="
        relative aspect-square h-full flex-none overflow-hidden rounded-md
      "
    >
      {#if 'img' in image}
        <enhanced:img src={image} class="absolute size-full object-cover" />
      {:else}
        <video
          autoplay
          loop
          muted
          width={image.video.w}
          height={image.video.h}
          class="absolute size-full object-cover"
        >
          <source src={image.video.src} type="video/mp4" />
          <track kind="captions" label="No captions" srcLang="en" />
        </video>
      {/if}
    </li>
  {/each}
</ul>
