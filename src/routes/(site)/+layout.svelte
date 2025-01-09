<script lang="ts">
	import Filters from '$lib/components/filters.svelte';
	import Footer from '$lib/components/footer.svelte';
	import Navbar from '$lib/components/navbar.svelte';

	let { children, data } = $props();
</script>

<Filters />
<Navbar />
<main class="flex grow-1 flex-col">
	{@render children()}
</main>
<Footer />
