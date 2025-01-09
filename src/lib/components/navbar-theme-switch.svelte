<script module lang="ts">
	export const theme = {
		current: $state<'auto' | 'light' | 'dark'>('auto'),
		get computed() {
			if (this.current === 'auto') {
				// Do stuff
			}
			return this.current;
		}
		// toggle() {
		// 	this.current = this.computed ===
		// },
	};
</script>

<script lang="ts">
</script>

<menu>
	<!-- Switch here -->
</menu>

<style>
	:global {
		:root:has([app-theme='dark']) {
			color-scheme: only dark;
		}
		:root:has([app-theme='light']) {
			color-scheme: only light;
		}
	}
</style>
