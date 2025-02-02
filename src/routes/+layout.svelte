<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import Searchbar from '$lib/components/searchbar.svelte';
  import { i18n } from '$lib/i18n/adapter';
  import { ParaglideJS as I18nProvider } from '@inlang/paraglide-sveltekit';
  import '../app.css';

  let { children } = $props();
</script>

<I18nProvider {i18n}>
  <Searchbar />
  <Navbar />
  <main class="flex grow-1 flex-col">
    {@render children()}
  </main>
  <Footer />
</I18nProvider>
