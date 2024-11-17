<script lang="ts">
	import * as m from '$messages';
	import { Command, Search } from 'lucide-svelte';
	import Ripple from './ripple.svelte';
	import * as search from './search-command.svelte';
</script>

<button class="input-group-bordered" {...search.dialog.getTriggerAttributes()}>
	<Search />
	<div class="input">
		{m.search()}
	</div>
	<div class="input-peer">
		<kbd>
			{#if search.hotkey.meta}
				<Command /> +
			{/if}
			{#if search.hotkey.ctrl}
				Ctrl +
			{/if}
			K
		</kbd>
	</div>
	<Ripple />
</button>
