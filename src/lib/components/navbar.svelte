<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { locales_names } from '$lib/i18n/constants';
  import {
    deLocalizeHref,
    getLocale,
    locales,
    localizeHref,
  } from '$lib/i18n/generated/runtime';
  import { linkAttributes } from '$lib/rigs/link.svelte';
  import * as m from '$messages';
  import { offset, shift } from '@floating-ui/dom';
  import { FileUser, Languages, Menu, PencilRuler } from 'lucide-svelte';
  import { quadOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { lg } from './breakpoint-provider.svelte';
  import { transformOrigin } from './floating.svelte';
  import Popover from './popover.svelte';
  import Ripple from './ripple.svelte';
  import { Theme, theme } from './theme-provider.svelte';

  let mobileDialog: HTMLDialogElement;
  let themePopover: HTMLDialogElement;
  let langPopover: HTMLDialogElement;
  let i = 0;

  function intro(node: Element) {
    return fly(node, { y: 6, delay: i++ * 120, easing: quadOut });
  }

  $effect(() => {
    if (lg.current) {
      mobileDialog.close();
      themePopover.close();
      langPopover.close();
    }
  });
</script>

<header
  class="py-padding px-prose-padding has-focus-visible:from-overlay has-open:from-overlay has-hover:from-overlay z-frontmost ease via-ease-circ-out pointer-events-none fixed top-0 flex min-h-1/2 w-full flex-row items-start justify-center bg-linear-to-b to-transparent transition lg:justify-between lg:text-sm print:hidden"
>
  <nav class="gap-menu-gap pointer-events-auto flex flex-row">
    <!-- <a
      in:intro|global
      class="button-nav lg:mr-gap aspect-square rounded-full p-0"
      href="/"
    >
      <img
        src="{links.github.url}.png?size=96"
        width="96px"
        height="96px"
        alt="avatar"
        class="h-full w-full rounded-[inherit]"
      />
      <Ripple />
      <span
        data-state="success"
        class="badge-cta io-compact appose-top-left-1/8 aspect-square rounded-full text-xs"
      >
      </span>
			</a> -->
    <button
      in:intro|global
      class="button-nav aspect-square lg:hidden"
      onpointerup={(e) => {
        mobileDialog.showModal();
      }}
    >
      <Ripple />
      <Menu />
    </button>
    <dialog
      class="dialog w-full origin-bottom self-end shadow-lg not-open:scale-96 starting:translate-y-1/4"
      closedby="any"
      bind:this={mobileDialog}
      onpointerup={(e) => {
        e.stopImmediatePropagation();
      }}
    >
      {@render langMenu()}
      {@render themeMenu()}
      <nav>Other sections</nav>
    </dialog>
    <a
      in:intro|global
      class="button-nav not-lg:hidden"
      {...linkAttributes('/cv', { currentOnSubpath: true })}
    >
      <Ripple />
      <FileUser />
      {m.resume()}
    </a>
    <a
      in:intro|global
      class="button-nav not-lg:hidden"
      {...linkAttributes('/workshop', { currentOnSubpath: true })}
    >
      <Ripple />
      <PencilRuler />
      {m.workshop()}
    </a>
  </nav>
  <div
    class="mx-gap h-io pattern-dots pattern-color-io/50 pattern-thickness-[1.5px] pattern-spacing-[1em] flex-1 bg-[50%] bg-repeat-x transition-all delay-500 duration-500 not-lg:hidden starting:opacity-0"
  ></div>
  <nav class="gap-menu-gap pointer-events-auto flex flex-row not-lg:hidden">
    <Popover
      placement="bottom-end"
      middleware={[
        offset({ mainAxis: 10 }),
        shift({ crossAxis: true }),
        transformOrigin(),
      ]}
      strategy="fixed"
    >
      {#snippet children(popover)}
        {@const current = Theme.options[theme.current]}
        <button
          {...popover.anchorAttributes()}
          class="button-nav aspect-square"
        >
          <Ripple />
          {#if browser}
            {#key current.name}
              <current.icon class="transition-all starting:translate-y-1/4" />
            {/key}
          {/if}
        </button>
        <dialog
          bind:this={themePopover}
          {...popover.targetAttributes()}
          closedby="any"
          class="popover not-open:scale-95 starting:-translate-y-1/4 starting:scale-95"
        >
          {@render themeMenu()}
        </dialog>
      {/snippet}
    </Popover>
    <Popover
      placement="bottom-end"
      middleware={[offset({ mainAxis: 10 }), transformOrigin()]}
      strategy="fixed"
    >
      {#snippet children(popover)}
        <button {...popover.anchorAttributes()} class="button-nav">
          <Ripple />
          <Languages />
          <span class="button-trailing badge capitalize">
            {getLocale()}
          </span>
        </button>
        <dialog
          bind:this={langPopover}
          {...popover.targetAttributes()}
          closedby="any"
          class="popover not-open:scale-95 starting:-translate-y-1/4 starting:scale-95"
        >
          {@render langMenu()}
        </dialog>
      {/snippet}
    </Popover>
  </nav>
</header>

{#snippet themeMenu()}
  <menu class="switch-ghost flex-col">
    {#each <(keyof typeof Theme.options)[]>Object.keys(Theme.options) as option}
      {@const details = Theme.options[option]}
      <button
        class="switch-item"
        role="radio"
        aria-checked={theme.current === option || undefined}
        onclick={() => {
          theme.current = option;
        }}
      >
        <Ripple />
        {details.name}
        <details.icon />
      </button>
    {/each}
  </menu>
{/snippet}

{#snippet langMenu()}
  <menu class="switch-ghost flex-col">
    {#each locales as locale}
      <a
        class="switch-item"
        href={localizeHref(deLocalizeHref(page.url.pathname), { locale })}
        hreflang={locale}
        data-sveltekit-reload
        aria-current={locale === getLocale() || undefined}
      >
        {locales_names[locale]}
      </a>
    {/each}
  </menu>
{/snippet}
