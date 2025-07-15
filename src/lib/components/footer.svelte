<script lang="ts">
  import { nav } from '$lib/data/nav';
  import { links } from '$lib/data/profile';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { ArrowUp, Mail } from 'lucide-svelte';
</script>

<footer
  class="gap-padding py-padding mx-gap flex min-h-dvh flex-col items-center justify-end self-stretch text-sm"
>
  <div
    class="max-w-body p-padding rounded-section bg-surface grid w-full grid-cols-3"
  >
    <nav class="flex flex-col items-start gap-(--outline-width-io)">
      {#each Object.entries(nav) as [slug, link] (link)}
        <a {...getLinkAttributes(`/${slug}`)} class="button-ghost">
          {link.label}
        </a>
      {/each}
    </nav>
    <nav class="flex justify-center gap-(--outline-width-io)">
      {#each Object.values(links) as link (link)}
        <a href={link.href} class="button-ghost aspect-square">
          <link.icon />
        </a>
      {/each}
      <button class="button-ghost aspect-square">
        <Mail />
      </button>
    </nav>
    <nav class="flex justify-end">
      <button
        class="button aspect-square"
        onclick={() => {
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <ArrowUp />
      </button>
    </nav>
  </div>
  <p class="text-soft text-center font-mono">
    © 2025 emmanuel beaudry marchand
  </p>
</footer>
