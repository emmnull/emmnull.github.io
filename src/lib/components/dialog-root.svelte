<script lang="ts">
  import type { Dialog } from '$lib/builders/dialog.svelte';
  import { cn } from '$lib/common/css';
  import { X } from 'lucide-svelte';
  import type { Snippet } from 'svelte';
  import { cubicIn, expoOut } from 'svelte/easing';
  import type { HTMLAttributes } from 'svelte/elements';
  import { fade, fly, scale } from 'svelte/transition';

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
    {...dialog.getRootAttributes()}
    {...dialogProps}
    class="top-0 left-0 h-full w-full flex-col items-center justify-center bg-transparent open:flex"
  >
    {#if backdrop}
      {@render backdrop(dialog)}
    {:else}
      <div
        class="bg-backdrop backdrop-glass absolute top-0 left-0 -z-[1] h-full w-full"
        transition:fade|global={{ duration: 200, easing: expoOut }}
      ></div>
    {/if}
    <article
      class={cn('p-lg rounded-card bg-card flex max-w-prose flex-col', className)}
      in:scale|global={{ start: 0.96, duration: 350, easing: expoOut }}
      out:fly|global={{ y: '1em', duration: 200, easing: cubicIn }}
      {...dialog.getContentAttributes()}
    >
      {#if title || description}
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
      {/if}
      {@render children?.(dialog)}
      {#if menu}
        <hr class="mt-section-padding" />
        <menu
          class="justify-content-start gap-io-group-gap sticky bottom-0 flex flex-row-reverse bg-inherit"
        >
          {@render menu(dialog)}
        </menu>
      {/if}
    </article>
  </dialog>
{/if}
