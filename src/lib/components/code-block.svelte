<script lang="ts">
  import { Check, Copy } from 'lucide-svelte';

  let { filename, content = $bindable() }: { filename?: string; content: string } = $props();

  let copied = $state<NodeJS.Timeout | number>(0);

  function copy() {
    if (copied) clearTimeout(copied);
    navigator.clipboard.writeText(content);
    copied = setTimeout(() => {
      copied = 0;
    }, 1500);
  }
</script>

<pre class="relative">
	<button class="button-ghost text-sm aspect-square absolute top-[1em] right-[1em]" onclick={copy}>
		{#if copied}
      <Check />
    {:else}
      <Copy />
    {/if}
	</button>
	{#each content.split('\n') as line}
    <code>{line}</code>
  {/each}
</pre>
