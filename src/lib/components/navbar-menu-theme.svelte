<script module lang="ts">
  class Theme {
    #persisted = new Persisted<'system' | 'light' | 'dark'>('theme', 'system');
    #query = new MediaQuery('(prefers-color-scheme: dark)');
    #system = $derived(this.#query.current ? ('dark' as const) : ('light' as const));

    get current() {
      return this.#persisted.current;
    }

    set current(value) {
      this.#persisted.current = value;
    }

    get computed() {
      return this.#persisted.current === 'system' ? this.#system : this.#persisted.current;
    }

    set computed(value: 'light' | 'dark') {
      this.#persisted.current = value === this.#system ? 'system' : value;
    }
  }

  export const theme = new Theme();
</script>

<script lang="ts">
  import { Dialog } from '$lib/builders/dialog.svelte';
  import { Persisted } from '$lib/common/state.svelte';
  import * as m from '$messages';
  import { Monitor, Moon, Sun, type Icon } from 'lucide-svelte';
  import { MediaQuery } from 'svelte/reactivity';
  import DialogRoot from './dialog-root.svelte';
  import NavbarButton from './navbar-button.svelte';
  import SwitchThumb from './switch-thumb.svelte';

  const themes = {
    system: {
      icon: Monitor,
      name: m.theme_system(),
    },
    dark: {
      icon: Moon,
      name: m.theme_dark(),
    },
    light: {
      icon: Sun,
      name: m.theme_light(),
    },
  } satisfies Record<typeof theme.current, { icon: typeof Icon; name: string }>;

  const dialog = new Dialog();
</script>

<svelte:head>
  <script>
    {
      const theme = localStorage.getItem('theme');
      document.documentElement.classList.add(
        !theme || theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'scheme-dark'
            : 'scheme-light'
          : 'scheme-' + theme,
      );
    }
  </script>
</svelte:head>

<NavbarButton class="aspect-square" {...dialog.getTriggerAttributes()}>
  {#snippet tooltip()}
    {m.theme()} <span class="opacity-dim">({themes[theme.computed].name})</span>
  {/snippet}
  {@const Icon = themes[theme.computed].icon}
  <Icon />
</NavbarButton>

<DialogRoot {dialog}>
  <menu class="switch" data-orientation="vertical">
    {#each Object.entries(themes) as [option, { icon: Icon, name }]}
      {@const current = theme === (option as unknown)}
      <button class="switch-item" aria-pressed={current ?? undefined}>
        <SwitchThumb key="navbar-theme-switch" {current} />
        {name}
        <Icon />
      </button>
    {/each}
  </menu>
</DialogRoot>
