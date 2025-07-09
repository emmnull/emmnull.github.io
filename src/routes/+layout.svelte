<script lang="ts">
  import '@fontsource-variable/figtree';
  // import '@fontsource-variable/fraunces';
  import '@fontsource/dm-mono';
  import '@fontsource/instrument-serif';
  // import '@fontsource-variable/outfit';
  // import '@fontsource-variable/eb-garamond';
  // import '@fontsource-variable/spline-sans-mono';
  // Supports weights 200-800
  // import '@fontsource-variable/newsreader';
  import BreakpointProvider from '$lib/components/breakpoint-provider.svelte';
  import ScrollProvider from '$lib/components/scroll-provider.svelte';
  import ThemeProvider from '$lib/components/theme-provider.svelte';
  import '../app.css';

  let { children } = $props();
</script>

<ScrollProvider />
<BreakpointProvider />
<ThemeProvider />
<!-- <FiltersProvider /> -->
<!-- see https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#add-the-paraglidemiddleware-to-srchooksserverts -->
<!-- <div class="hidden">
  {#each locales as locale}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
</div> -->
{@render children()}
