<!--
@component Optional text

Simplify markup for rendering of optionally defined text and normalize appearance of fallback content.
-->
<script lang="ts">
	import { cn } from '$lib/common/css';
	import * as m from '$messages';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		text,
		fallback = m.not_defined(),
		class: className,
		render,
		...spanProps
	}: {
		text?: string | null;
		fallback?: Snippet | string;
		render?: Snippet<[text: string]>;
	} & HTMLAttributes<HTMLSpanElement> = $props();
</script>

{#if text}
	{#if render}
		{@render render(text)}
	{:else}
		{text}
	{/if}
{:else}
	<span class={cn('opacity-softer font-thin italic', className)} {...spanProps}>
		{#if typeof fallback === 'string'}
			{#if render}
				{@render render(fallback)}
			{:else}
				{text}
			{/if}
		{:else}
			{@render fallback()}
		{/if}
	</span>
{/if}
