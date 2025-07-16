<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  let { children } = $props();
</script>

<Navbar />
<main
  class="bg-base ease-exp-out origin-root-center in-has-open flex flex-col transition [:has(:modal:open,[aria-modal='true']:open)_&]:scale-90 [:has(:modal:open,[aria-modal='true']:open)_&]:rounded-xl"
>
  {@render children()}
  <Footer />
</main>
