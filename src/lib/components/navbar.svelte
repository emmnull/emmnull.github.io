<script lang="ts">
  import { page } from '$app/state';
  import { links } from '$lib/data/profile';
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
  import { Languages, Menu, PencilRuler, ScrollText } from 'lucide-svelte';
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
  class="py-padding px-prose-padding has-focus-visible:from-overlay/overlay has-open:from-overlay/overlay has-hover:from-overlay/overlay z-frontmost ease to-overlay/0 via-ease-circ-out pointer-events-none fixed top-0 flex min-h-1/4 w-full flex-row items-start justify-center bg-linear-to-b transition lg:justify-between lg:text-sm print:hidden"
>
  <nav class="gap-menu-gap pointer-events-auto flex flex-row">
    <a
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
        class="badge-cta io-sm appose-top-left-1/8 aspect-square rounded-full text-xs"
      >
      </span>
    </a>
    <button
      in:intro|global
      class="button-nav aspect-square lg:hidden"
      onclick={() => {
        mobileDialog?.showModal();
      }}
    >
      <Ripple />
      <Menu />
    </button>
    <a
      in:intro|global
      class="button-nav not-lg:hidden"
      {...linkAttributes('/cv', { currentOnSubpath: true })}
    >
      <Ripple />
      <ScrollText />
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
  <!-- <nav class="gap-menu-gap pointer-events-auto flex flex-1 flex-row"></nav> -->
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
        <button
          {...popover.anchorAttributes()}
          class="button-nav aspect-square"
        >
          <Ripple />
          <theme.currentOption.icon />
        </button>
        <dialog
          bind:this={themePopover}
          {...popover.targetAttributes()}
          closedby="any"
          class="popover not-open:scale-90 starting:-translate-y-1/2"
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
          class="popover not-open:scale-90 starting:-translate-y-1/2"
        >
          {@render langMenu()}
        </dialog>
      {/snippet}
    </Popover>
  </nav>
</header>

<dialog
  class="dialog w-full self-end shadow-lg not-open:scale-110 starting:translate-y-1/2"
  closedby="any"
  bind:this={mobileDialog}
>
  {@render langMenu()}
  {@render themeMenu()}
  <nav>Other sections</nav>
</dialog>

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
