<script lang="ts">
  import { page } from '$app/state';
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import Searchbar from '$lib/components/searchbar.svelte';
  import { locales, localizeHref } from '$lib/i18n/generated/runtime';
  import '../app.css';

  let { children } = $props();
</script>

<!-- see https://inlang.com/m/gerre34r/library-inlang-paraglideJs/sveltekit#add-the-paraglidemiddleware-to-srchooksserverts -->
<div style="display:none">
  {#each locales as locale}
    <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
  {/each}
</div>
<Searchbar />
<Navbar />
<main class="flex grow-1 flex-col">
  {@render children()}
</main>
<Footer />
