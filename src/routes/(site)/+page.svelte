<script lang="ts">
  import Hero from './hero.svelte';
  import Skills from './skills.svelte';
  import Works from './works.svelte';

  let { data } = $props();
</script>

<Hero />
<Skills />
<Works works={data.works} />

<!-- <section
  class="mt-gap rounded-section from-surface py-padding bg-gradient-to-b lg:bg-none"
>
  <hgroup class="px-padding text-center lg:text-left">
    <h2 class="font-misc text-4xl">
      {m.project({ count: 'many' })}
    </h2>
  </hgroup>
  <ul class="grid grid-cols-8">
    {#each Object.entries(data.work) as [slug, work]}
      {@const imgs = images(slug, work.metadata)}
      {@const cover = imgs.cover?.default ?? imgs.banner?.default}
      <article
        class="rounded-card p-prose-padding pt-navbar-height sticky left-0 z-0 flex h-full w-full flex-none flex-col"
      >
        <Ripple />
        <a href="/work/{slug}" class="text-center font-mono text-sm">
          {work.metadata.shortTitle || work.metadata.title}
          <span class="absolute inset-0"></span>
        </a>
        <div
          class="inset-gap absolute -z-1 flex-none overflow-hidden rounded-sm"
        >
          {#if cover}
            <enhanced:img
              src={cover}
              alt="Cover image for {slug}"
              class="absolute inset-0 h-full w-full object-cover"
            />
          {/if}
        </div>
      </article>
    {/each}
  </ul>
</section> -->

<!-- <section>
  Planning to fiddle with:
  <ul class="flex flex-row gap-io-gap">
    {#each want as todo}
      <li class="chip">{tags_details[todo].label}</li>
    {/each}
  </ul>
</section> -->

<!-- <section>
  <hgroup>
    <p>{m.workshop()}</p>
    <h2>{m.workshop_catchphrase()}</h2>
  </hgroup>
  <a href="/workshop">workshop</a>
</section> -->

<!-- <section>
  Some photos (pulled from insta?) :)
</section> -->
