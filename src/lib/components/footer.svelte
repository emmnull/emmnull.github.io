<script lang="ts">
  import { nav } from '$lib/data/nav';
  import { links } from '$lib/data/profile';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { Mail } from 'lucide-svelte';

  function backToTop() {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer
  class="max-w-body p-padding gap-padding grid w-full grid-cols-3 self-center text-sm"
>
  <nav class="flex flex-col">
    {#each Object.entries(nav) as [slug, link]}
      <a {...getLinkAttributes(`/${slug}`)}>{link.label}</a>
    {/each}
  </nav>
  <nav class="flex self-end">
    {#each Object.values(links) as link}
      <a
        href={link.href}
        class="h-io rounded-io hover:bg-io text-on-io flex aspect-square items-center justify-center"
      >
        <link.icon class="size-[1em]" />
      </a>
    {/each}
    <button
      class="h-io rounded-io hover:bg-io text-on-io flex aspect-square items-center justify-center"
    >
      <Mail class="size-[1em]" />
    </button>
  </nav>
  <menu class="gap-gap flex flex-col"> </menu>
</footer>
