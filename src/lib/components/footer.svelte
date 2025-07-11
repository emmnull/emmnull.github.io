<script lang="ts">
  import { nav } from '$lib/data/nav';
  import { links } from '$lib/data/profile';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { ArrowUp, Mail } from 'lucide-svelte';

  function backToTop() {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<footer
  class="max-w-body p-padding gap-padding flex min-h-[50vh] w-full flex-col items-stretch self-center text-sm"
>
  <div class="grid flex-1 grid-cols-3">
    <nav class="flex flex-col">
      {#each Object.entries(nav) as [slug, link]}
        <a {...getLinkAttributes(`/${slug}`)}>{link.label}</a>
      {/each}
    </nav>
    <nav class="flex justify-center">
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
    <nav class="flex justify-end">
      <button
        class="h-io rounded-io flex aspect-square items-center justify-center"
      >
        <ArrowUp class="size-[1em]" />
      </button>
    </nav>
  </div>
  <p class="text-center font-mono">© 2025 emmanuel beaudry marchand</p>
</footer>
