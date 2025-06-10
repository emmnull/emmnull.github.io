<script lang="ts">
  import { random } from '$lib/common/number';
  import Sidescroller from '$lib/components/sidescroller.svelte';
  import { tags_details } from '$lib/data/meta';
  import { links, skills } from '$lib/data/profile';
  import * as m from '$messages';

  const verbs = ['cooking', 'building', 'designing', 'realizing'];

  let { data } = $props();
</script>

<!-- <Cursor /> -->

<section
  class="p-prose-padding flex min-h-dvh flex-col items-center justify-center"
>
  <h1 class="leading-xs text-center text-3xl lg:text-left lg:text-5xl">
    Hi 👋 <br />
    I'm <a href={links.github.url} class="link">Emmanuel</a> and I enjoy building
    interfaces :P
  </h1>
</section>

<section
  class="rounded-section bg-surface p-prose-padding max-w-prose-width flex flex-col lg:bg-transparent"
>
  <hgroup class="pb-prose-padding text-center lg:text-left">
    <h2 class="font-misc text-2xl">
      Put smiles on your users', your's, and my face
    </h2>
    <p class="opacity-prose-alt">Make me cook with…</p>
  </hgroup>
  <ul
    class="group/skills gap-io-gap flex flex-row flex-wrap justify-center pb-[1em] text-sm perspective-[200px] perspective-origin-center lg:justify-start"
  >
    {#each skills as skill, i}
      {@const details = tags_details[skill]}
      <li
        class="chip-cta rotate-x-(--angle-x) rotate-y-(--angle-y) rotate-z-(--angle-z)"
        style:--i={i}
        style:--angle-x="{random(-6, 6)}deg"
        style:--angle-y="{random(-6, 6)}deg"
        style:--angle-z="{random(-6, 6)}deg"
      >
        {details.label}
      </li>
    {/each}
  </ul>
</section>

<Sidescroller>
  {#snippet children(scroller)}
    <section class="w-full" {...scroller.containerAttributes()}>
      <div
        class="sticky top-1/4 flex h-[50dvh] flex-row items-stretch overflow-x-hidden"
        {...scroller.contentAttributes()}
      >
        <hgroup
          class="p-prose-padding pb-navbar-height text-center lg:text-left"
        >
          <h2 class="font-misc text-2xl">
            {m.work()}
          </h2>
        </hgroup>
        {#each Object.entries(data.work) as [slug, work]}
          <article
            class="from-primary to-base w-full flex-none bg-gradient-to-r"
          >
            {work.title ?? slug}
          </article>
        {/each}
      </div>
    </section>
  {/snippet}
</Sidescroller>

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
