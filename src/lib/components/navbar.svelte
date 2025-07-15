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
  class="has-[:hover,:open,:focus-visible]:from-base z-infinity via-ease-out ease pointer-events-none fixed top-0 flex min-h-1/2 w-full items-start justify-center bg-none to-transparent text-sm transition lg:bg-linear-to-b"
>
  <div
    class="max-w-body gap-gap px-padding py-gap flex w-full flex-row justify-between [--inset:5px] [--radius:calc(var(--radius-io)+var(--inset))]"
  >
    <nav
      class="bg-base pointer-events-auto flex gap-(--inset) rounded-(--radius) p-(--inset) transition duration-100"
    >
      <button
        class="button-nav aspect-square lg:hidden"
        style:--i="0"
        onclick={() => {
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
      >
        {@render langMenu()}
        {@render themeMenu()}
        <nav>Other sections</nav>
      </dialog>
      {#each Object.entries(nav) as [slug, link] (link)}
        <a
          class="button-nav not-lg:hidden"
          {...getLinkAttributes(`/${slug}`, { currentOnSubpath: slug !== '' })}
        >
          <Ripple />
          {link.label}
        </a>
      {/each}
    </nav>
    <menu
      class="bg-base pointer-events-auto flex gap-(--inset) rounded-(--radius) p-(--inset) transition duration-100 not-lg:hidden"
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
                  class="transition-all starting:scale-90 starting:-rotate-45"
                />
              {/key}
            {/if}
          </button>
          <dialog
            bind:this={themePopover}
            {...popover.getTargetAttributes()}
            closedby="any"
            class="popover not-open:scale-95 starting:-translate-y-1/4 starting:scale-95"
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
            <span class="button-trailing badge font-mono italic">
              {getLocale()}
            </span>
          </button>
          <dialog
            bind:this={langPopover}
            {...popover.getTargetAttributes()}
            closedby="any"
            class="popover not-open:scale-95 starting:-translate-y-1/4 starting:scale-95"
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
        aria-current={current || undefined}
      >
        <SwitchItemThumb {key} {current} />
        <Ripple />
        {m.locale_name(undefined, { locale })}
      </a>
    {/each}
  </menu>
{/snippet}
