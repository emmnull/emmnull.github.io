<script lang="ts">
  import { linkAttributes } from '$lib/attributes/link.svelte';
  import Logo from '$lib/components/logo.svelte';
  import * as m from '$messages';
  import { PencilRuler } from 'lucide-svelte';
  import NavbarButton from './navbar-button.svelte';
  import NavbarMenuLang from './navbar-menu-lang.svelte';
  import NavbarMenuTheme from './navbar-menu-theme.svelte';
  import NavbarSearch from './navbar-search.svelte';
</script>

<header
  class="px-root-padding pt-root-gap pb-base-padding z-[99] sticky top-0 flex flex-row justify-between text-sm print:hidden"
>
  <nav class="relative gap-menu-gap flex flex-row">
    <NavbarButton href="/"><Logo height="2em" /></NavbarButton>
    <NavbarButton {...linkAttributes('/workshop', { currentOnSubpath: true })}>
      <PencilRuler />
      {m.workshop()}
    </NavbarButton>
  </nav>
  <menu class="relative gap-menu-gap flex flex-row">
    <NavbarSearch />
    <NavbarMenuTheme />
    <NavbarMenuLang />
  </menu>
</header>
