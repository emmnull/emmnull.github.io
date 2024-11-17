<script lang="ts">
	import { Dialog } from '$lib/builders/dialog.svelte';
	import { cn } from '$lib/common/css';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	let {
		dialog,
		backdrop,
		title,
		description,
		children,
		menu,
		closeButton = true,
		class: className,
		...dialogProps
	}: Omit<HTMLAttributes<HTMLElement>, 'title'> & {
		/**
		 * Dialog instance.
		 */
		dialog: Dialog;
		/**
		 * Custom backdrop.
		 */
		backdrop?: Snippet<[Dialog]>;
		/**
		 * Title content.
		 */
		title?: Snippet<[Dialog]> | string;
		/**
		 * Description content.
		 */
		description?: Snippet<[Dialog]> | string;
		/**
		 * Body content.
		 */
		children?: Snippet<[Dialog]>;
		/**
		 * Actions menu content.
		 */
		menu?: Snippet<[Dialog]>;
		/**
		 * Should the default close button be displayed?
		 */
		closeButton?: boolean;
	} = $props();
</script>

{#if dialog.open}
	<dialog
		{...dialog.getDialogAttributes()}
		{...dialogProps}
		class="top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-transparent"
	>
		{#if backdrop}
			{@render backdrop(dialog)}
		{:else}
			<div
				class="absolute top-0 left-0 -z-[1] h-full w-full bg-[blue]/25"
				transition:fade|global
			></div>
		{/if}
		<article
			class={cn('p-card rounded-card flex max-w-md flex-col bg-[red]/25', className)}
			transition:fade
			{...dialog.getContentAttributes()}
		>
			<!-- {#if title || description}
				<header class="relative flex flex-col gap-[1em]">
					<hgroup class="text-lg font-semibold">
						{#if closeButton}
							<button
								tabindex="0"
								class="button button-ghost compact ml-md top-[-0.125em] [float:inline-end] aspect-square rounded-full text-sm"
								{...dialog.getCloseAttributes()}
							>
								<X />
							</button>
						{/if}
						{#if title}
							{#if typeof title === 'string'}
								{title}
							{:else}
								{@render title(dialog)}
							{/if}
						{/if}
					</hgroup>
					{#if description}
						<section class="opacity-softer prose prose-block leading-sm mb-[0.5em] text-sm">
							{#if typeof description === 'string'}
								{description}
							{:else}
								{@render description(dialog)}
							{/if}
						</section>
					{/if}
				</header>
				<hr class="mb-section-padding" />
			{/if} -->
			{@render children?.(dialog)}
			<!-- {#if menu}
				<hr class="mt-section-padding" />
				<menu
					class="justify-content-start gap-io-group-gap sticky bottom-0 flex flex-row-reverse bg-inherit"
				>
					{@render menu(dialog)}
				</menu>
			{/if} -->
		</article>
	</dialog>
{/if}
