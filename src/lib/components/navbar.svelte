<script lang="ts">
  import { browser } from '$app/environment';
  import { linkAttributes } from '$lib/rigs/attributes/link.svelte';
  import * as m from '$messages';
  import { PencilRuler, ScrollText } from 'lucide-svelte';
  import { expoOut, quadOut } from 'svelte/easing';
  import { fly, scale } from 'svelte/transition';
  import Ripple from './ripple.svelte';

  let i = 0;

  function intro(node: Element) {
    return fly(node, { y: 6, delay: i++ * 100, easing: quadOut });
  }
</script>

<header
  data-hide={!browser || undefined}
  class="data-hide:opacity-0 px-root-padding py-root-gap z-[99] sticky top-0 flex flex-row justify-start text-sm print:hidden"
>
  <nav class="relative gap-menu-gap flex flex-row">
    <a in:intro|global class="button-nav" href="/">
      <Ripple />
      emmnull
    </a>
    <a
      in:intro|global
      class="button-nav"
      {...linkAttributes('/workshop', { currentOnSubpath: true })}
    >
      <Ripple />
      <PencilRuler />
      {m.workshop()}
    </a>
    <a
      in:intro|global
      class="button-nav"
      {...linkAttributes('/cv', { currentOnSubpath: true })}
    >
      <Ripple />
      <ScrollText />
      {m.resume()}
      <span
        class="badge-cta origin-bottom-left text-[10px] top-0 absolute right-0 translate-x-1/2 -translate-y-1/2"
        in:scale={{
          delay: 800,
          duration: 350,
          easing: expoOut,
          opacity: 0,
          start: 0.95,
        }}
      >
        {m.available()}
      </span>
    </a>
    <!-- <a
      in:intro|global
      class="button-nav aspect-square"
      href={links.github.url.toString()}
      rel="external"
    >
      <Ripple />
      <links.github.icon />
    </a> -->
    <!-- <menu class="relative gap-menu-gap flex flex-row">
				<NavbarSearch />
				<NavbarMenuTheme />
				<NavbarMenuLang />
				</menu> -->
  </nav>
</header>
