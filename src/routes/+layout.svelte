<script lang="ts">
  import BreakpointProvider from '$lib/components/breakpoint-provider.svelte';
  import ScrollProvider from '$lib/components/scroll-provider.svelte';
  import ThemeProvider from '$lib/components/theme-provider.svelte';
  import '@fontsource-variable/figtree';
  import '@fontsource/dm-mono';
  import '@fontsource/instrument-serif';
  import '../app.css';

  let { children } = $props();
</script>

<ScrollProvider />
<BreakpointProvider />
<ThemeProvider />
{@render children()}
