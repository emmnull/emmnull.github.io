<script lang="ts">
  import Logo from '$lib/components/logo.svelte';
  import { linkAttributes } from '$lib/i18n/utils.svelte';
  import * as m from '$messages';
  import { PencilRuler } from 'lucide-svelte';
  import NavbarButton from './navbar-button.svelte';
  import NavbarMenuLang from './navbar-menu-lang.svelte';
  import NavbarMenuTheme from './navbar-menu-theme.svelte';
  import NavbarSearch from './navbar-search.svelte';
</script>

<header
  class="px-root-padding pt-root-gap pb-base-padding z-front sticky top-0 flex flex-row justify-between overflow-clip text-sm print:hidden"
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
