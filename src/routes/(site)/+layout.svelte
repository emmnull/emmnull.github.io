<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Navbar from '$lib/components/navbar.svelte';

  let { children } = $props();
</script>

<Navbar />
<main
  class="
    flex origin-(--root-center) flex-col bg-base transition ease-exp-out
    perspective-[16vw] perspective-origin-(--root-center)
    [:has(:modal:open,[aria-modal='true']:open)_&]:scale-90
    [:has(:modal:open,[aria-modal='true']:open)_&]:rounded-xl
  "
>
  {@render children()}
  <Footer />
</main>
