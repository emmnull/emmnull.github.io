<script lang="ts">
  import { random } from '$lib/common/number';
  import { tags_details } from '$lib/data/meta';
  import { links, skills } from '$lib/data/profile';
  import * as m from '$messages';

  const verbs = ['cooking', 'building', 'designing', 'realizing'];
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
        class="chip chip-cta rotate-x-(--angle-x) rotate-y-(--angle-y) rotate-z-(--angle-z)"
        data-themed={details.type}
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

<section class="flex flex-col">
  <hgroup class="p-prose-padding pb-navbar-height text-center lg:text-left">
    <h2 class="font-misc text-2xl">
      {m.work()}
    </h2>
  </hgroup>
  <ul
    class="p-padding gap-padding no-scrollbar flex flex-row overflow-x-scroll"
  >
    {#each ['asd', 'asd', 'asddasda', 'asdasdasd'] as work}
      <li class="h-main-height bg-primary w-full flex-none">
        Some screenshots
      </li>
    {/each}
  </ul>
</section>

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
