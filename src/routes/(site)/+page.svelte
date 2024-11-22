<script lang="ts">
	import Ripple from '$lib/components/ripple.svelte';
	import { Filter, Search } from 'lucide-svelte';
	import Splash from './splash.svelte';

	let { data } = $props();
</script>

<Splash />
<section>
	<input type="text" class="input" />
</section>
<article class="p-lg gap-lg flex flex-col items-center">
	{#each ['input-group', 'input-group-bordered', 'input-group-dashed', 'input-group-ghost'] as variant}
		<div class={variant}>
			<label class="input-fill" for="{variant}-input"></label>
			<Ripple />
			<div class="input-peer">
				<button class="button">
					<Ripple />
					Hello
				</button>
			</div>
			<Filter />
			<input type="text" class="input" id="{variant}-input" />
			<div class="input-peer">
				<button class="button aspect-square">
					<Ripple />
					<Search />
				</button>
			</div>
		</div>
	{/each}
</article>
