<script lang="ts" module>
	import { browser } from '$app/environment';

	let x = $state(0);
	let y = $state(0);

	export const scroll = {
		get x() {
			return x;
		},
		get y() {
			return y;
		}
	};

	function updateScroll() {
		x = document.documentElement.scrollLeft;
		y = document.documentElement.scrollTop;
		// document.documentElement.style.setProperty('--scroll-x', `${x}`);
		// document.documentElement.style.setProperty('--scroll-y', `${y}`);
	}

	if (browser) {
		updateScroll();
	}
</script>

<svelte:window
	onscroll={(e) => {
		updateScroll();
	}}
/>

<svelte:head>
	{@html `<style>
	:root {
		--scroll-x: ${x};
		--scroll-y: ${y};
		--scroll-y-px: calc(var(--scroll-y) * 1px);
		--scroll-x-px: calc(var(--scroll-x) * 1px);
	}
	</style>`}
</svelte:head>

<!-- <style global>
	:root {
		--scroll-y: 0;
		--scroll-x: 0;
		--scroll-y-px: calc(var(--scroll-y) * 1px);
		--scroll-x-px: calc(var(--scroll-x) * 1px);
	}
</style> -->
