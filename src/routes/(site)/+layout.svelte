<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  let { children, data } = $props();
</script>

<!-- <Blob /> -->
<Navbar />
<main class="flex grow-1 flex-col">
  {@render children()}
</main>
<Footer />
