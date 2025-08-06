<script lang="ts">
  import { page } from '$app/state';
  import BreakpointProvider from '$lib/components/breakpoint-provider.svelte';
  import ScrollProvider from '$lib/components/scroll-provider.svelte';
  import ThemeProvider from '$lib/components/theme-provider.svelte';
  import { locales, localizeHref } from '$lib/i18n/generated/runtime';
  import '@fontsource-variable/figtree';
  import '@fontsource/dm-mono';
  import '@fontsource/instrument-serif';
  import '../app.css';

  let { children } = $props();
</script>

<ScrollProvider />
<BreakpointProvider />
<ThemeProvider />
<!-- see https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#add-the-paraglidemiddleware-to-srchooksserverts -->
<div class="hidden">
  {#each locales as locale (locale)}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
</div>
{@render children()}
