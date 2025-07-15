<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  let { children } = $props();
</script>

<!-- <Blob /> -->
<Navbar />
<main>
  {@render children()}
</main>
<Footer />
