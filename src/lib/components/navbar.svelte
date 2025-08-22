<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/state';
  import { nav } from '$lib/data/nav';
  import {
    deLocalizeHref,
    getLocale,
    locales,
    localizeHref,
  } from '$lib/i18n/generated/runtime';
  import { getLinkAttributes } from '$lib/rigs/link.svelte';
  import * as m from '$messages';
  import { offset, shift } from '@floating-ui/dom';
  import { Languages, Menu } from 'lucide-svelte';
  import { lg } from './breakpoint-provider.svelte';
  import { transformOrigin } from './floating.svelte';
  import Popover from './popover.svelte';
  import Ripple from './ripple.svelte';
  import SwitchItemThumb from './switch-item-thumb.svelte';
  import { Theme, theme } from './theme-provider.svelte';

  let mobileDialog: HTMLDialogElement;
  let themePopover: HTMLDialogElement;
  let langPopover: HTMLDialogElement;

  $effect(() => {
    if (lg.current) {
      mobileDialog.close();
      themePopover.close();
      langPopover.close();
    }
  });
</script>

<header
  class="
    pointer-events-none fixed top-0 z-infinity flex min-h-1/2 w-full items-start
    justify-center bg-none via-ease-out from-transparent text-sm transition ease
    has-[:hover,:open,:focus-visible]:from-base
    lg:bg-linear-to-b
  "
>
  <div
    class="
      flex w-full max-w-body flex-row justify-between gap-gap px-padding py-gap
      [--radius:calc(var(--radius-io)+var(--spacing-io-nesting))]
      not-lg:pt-padding
    "
  >
    <!-- mobile -->
    <button
      class="
        button-nav pointer-events-auto aspect-square backdrop-blur-[16px]
        lg:hidden
      "
      style:--i="0"
      onclick={() => {
        mobileDialog.showModal();
      }}
    >
      <Ripple />
      <Menu />
    </button>
    <dialog
      class="
        pointer-events-auto h-dvh max-h-none w-full max-w-none flex-row
        flex-wrap place-items-end content-end gap-gap overflow-visible
        bg-transparent p-padding text-md
        backdrop:bg-linear-to-t backdrop:from-overlay backdrop:from-66%
        open:flex
      "
      onclick={(e) => {
        if (e.target === e.currentTarget) {
          e.currentTarget.requestClose();
          e.stopImmediatePropagation();
        }
      }}
      bind:this={mobileDialog}
    >
      <menu
        class="
          flex flex-col rounded-box bg-base p-[1em] shadow-lg duration-300
          ease-exp-out
          starting:translate-y-1/3 starting:opacity-0
        "
      >
        {@render langMenu()}
      </menu>
      <menu
        class="
          flex flex-col rounded-box bg-base p-[1em] shadow-lg delay-50
          duration-300 ease-exp-out
          starting:translate-y-1/3 starting:opacity-0
        "
      >
        {@render themeMenu()}
      </menu>
      <nav
        class="
          flex flex-col items-start gap-(--outline-width-io) rounded-box
          bg-surface p-[1em] shadow-lg delay-100 duration-300 ease-exp-out
          starting:translate-y-1/3 starting:opacity-0
        "
      >
        {@render pagesMenu()}
      </nav>
    </dialog>
    <!-- desktop -->
    <nav
      class="
        pointer-events-auto flex gap-io-nesting rounded-(--radius)
        bg-surface/[min(100%,0.5%*var(--spacing-scroll-y))] p-io-nesting
        transition duration-100
        not-lg:hidden
      "
    >
      {@render pagesMenu()}
    </nav>
    <menu
      class="
        pointer-events-auto flex gap-io-nesting rounded-(--radius)
        bg-surface/[min(100%,0.5%*var(--spacing-scroll-y))] p-io-nesting
        transition duration-100
        not-lg:hidden
      "
    >
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
            {...popover.getAnchorAttributes()}
            class="button-nav aspect-square"
            style:--i="3"
          >
            <Ripple />
            {#if browser}
              {#key current.name}
                <current.icon
                  class="
                    transition-all
                    starting:scale-90 starting:-rotate-45
                  "
                />
              {/key}
            {/if}
          </button>
          <dialog
            bind:this={themePopover}
            {...popover.getTargetAttributes()}
            closedby="any"
            class="
              rounded-box bg-surface p-[1em] transition-[translate,opacity]
              transition-discrete duration-300 ease-exp-out
              not-open:scale-95 not-open:opacity-0
              starting:-translate-y-1/4 starting:scale-95 starting:opacity-0
            "
          >
            <!-- <Arrow {...popover.getArrowAttributes()} /> -->
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
          <button
            {...popover.getAnchorAttributes()}
            class="button-nav"
            style:--i="4"
          >
            <Ripple />
            <Languages />
            <span
              class="
                font-mono opacity-40 transition-opacity
                in-button-open:opacity-100
              "
            >
              {getLocale()}
            </span>
          </button>
          <dialog
            bind:this={langPopover}
            {...popover.getTargetAttributes()}
            closedby="any"
            class="
              rounded-box bg-surface p-[1em] transition-[translate,opacity]
              transition-discrete duration-300 ease-exp-out
              not-open:scale-95 not-open:opacity-0
              starting:-translate-y-1/4 starting:scale-95 starting:opacity-0
            "
          >
            <!-- <Arrow {...popover.getArrowAttributes()} /> -->
            {@render langMenu()}
          </dialog>
        {/snippet}
      </Popover>
    </menu>
  </div>
</header>

{#snippet themeMenu()}
  {@const key = {}}
  <menu class="switch-ghost flex-col">
    {#each Object.keys(Theme.options) as (keyof typeof Theme.options)[] as option (option)}
      {@const details = Theme.options[option]}
      {@const current = theme.current === option}
      <button
        class="switch-item"
        role="radio"
        aria-checked={current || undefined}
        onclick={() => {
          theme.current = option;
        }}
      >
        <SwitchItemThumb {key} {current} />
        <Ripple />
        <details.icon />
        {details.name}
      </button>
    {/each}
  </menu>
{/snippet}

{#snippet langMenu()}
  {@const key = {}}
  <menu class="switch-ghost flex-col">
    {#each locales as locale (locale)}
      {@const current = getLocale() === locale}
      <a
        class="switch-item"
        href={localizeHref(deLocalizeHref(page.url.pathname), { locale })}
        hreflang={locale}
        data-sveltekit-reload
        data-sveltekit-replacestate
        aria-current={current || undefined}
      >
        <SwitchItemThumb {key} {current} />
        <Ripple />
        {m.locale_name(undefined, { locale })}
      </a>
    {/each}
  </menu>
{/snippet}

{#snippet pagesMenu()}
  {#each Object.entries(nav) as [slug, link] (link)}
    <a
      class="
        button-nav
        aria-disabled:pointer-events-none
      "
      aria-disabled={link.disabled}
      {...getLinkAttributes(`/${slug}`, {
        currentOnSubpath: slug !== '',
      })}
    >
      {#if 'icon' in link}
        <link.icon />
      {/if}
      <Ripple />
      {link.label}
    </a>
  {/each}
{/snippet}
