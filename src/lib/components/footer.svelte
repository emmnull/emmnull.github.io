<script lang="ts">
  import { PUBLIC_EMAIL } from '$env/static/public';
  import { nav } from '$lib/data/nav';
  import { links } from '$lib/data/profile';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import { ArrowUp, CopyCheck, Mail } from 'lucide-svelte';
  import Ripple from './ripple.svelte';

  let copied = $state<ReturnType<typeof setTimeout>>();
</script>

<footer
  class="gap-padding py-padding mx-gap flex min-h-dvh flex-col items-center justify-end self-stretch text-sm"
>
  <div
    class="max-w-body gap-padding p-padding rounded-section bg-surface flex w-full grid-cols-3 flex-col lg:grid"
  >
    <nav class="flex flex-col gap-(--outline-width-io) lg:items-start">
      {#each Object.entries(nav) as [slug, link] (link)}
        <a {...getLinkAttributes(`/${slug}`)} class="button-nav">
          <Ripple />
          {link.label}
        </a>
      {/each}
    </nav>
    <nav class="flex justify-center gap-(--outline-width-io)">
      {#each Object.values(links) as link (link)}
        <a href={link.href} class="button-ghost aspect-square">
          <Ripple />
          <link.icon />
        </a>
      {/each}
      <button
        class="button-ghost aspect-square cursor-copy"
        aria-pressed={copied != null || undefined}
        onpointerdown={() => {
          navigator.clipboard.writeText(PUBLIC_EMAIL);
          clearTimeout(copied);
          copied = setTimeout(() => {
            copied = undefined;
          }, 1500);
        }}
      >
        <Ripple />
        <Mail
          class="transition duration-150 in-aria-pressed:scale-50 in-aria-pressed:opacity-0"
        />
        <CopyCheck
          class="absolute transition duration-150 not-in-aria-pressed:scale-150 not-in-aria-pressed:opacity-0"
        />
      </button>
    </nav>
    <nav class="flex justify-end">
      <button
        class="button aspect-square"
        onclick={() => {
          document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <Ripple />
        <ArrowUp />
      </button>
    </nav>
  </div>
  <p class="text-soft text-center font-mono">
    © 2025 emmanuel beaudry marchand
  </p>
</footer>
