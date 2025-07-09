<script lang="ts">
  import { dirs, unbase } from '$lib/common/content';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { House } from 'lucide-svelte';

  let { children } = $props();

  const playgrounds = dirs(
    unbase(
      import.meta.glob('/src/routes/playgrounds/*/+page.svelte'),
      '/src/routes/playgrounds/',
    ),
  );
</script>

<header
  class="p-gap border-surface sticky top-0 z-1 border-b text-sm backdrop-blur-[20px]"
>
  <a {...getLinkAttributes('/')} class="button-nav font-bold"><House />Return</a
  >
</header>
<main
  class="grid grid-cols-[[full-start_nav-start]200px[nav-end_main-start]1fr[main-end_full-end]] items-start"
>
  <nav class="p-gap top-navbar-height sticky flex h-dvh flex-col text-sm">
    {#each Object.keys(playgrounds) as playground}
      <a
        {...getLinkAttributes(`/playgrounds/${playground}`, {
          // currentOnSubpath: true,
        })}
        class="button-ghost justify-start capitalize"
      >
        {playground}
      </a>
    {/each}
  </nav>
  <article class="p-gap gap-gap col-[main] flex flex-col">
    {@render children()}
  </article>
</main>
