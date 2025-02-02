<script lang="ts">
  import type { KeyCombo } from '$lib/common/event';
  import { ArrowBigUp, ChevronUpSquare, Command, Option } from 'lucide-svelte';

  let { key, ctrl, meta, shift, alt }: KeyCombo = $props();
</script>

{#if meta}
  <Command />
{/if}
{#if alt}
  <Option />
{/if}
{#if shift}
  <ArrowBigUp />
{/if}
{#if ctrl}
  <ChevronUpSquare />
{/if}
{#if key}
  <span>{key}</span>
{/if}
