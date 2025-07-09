<!--
	@component
	Singleton theme state and DOM updates.
-->
<script module lang="ts">
  import { Persisted } from '$lib/rigs/persisted.svelte';
  import * as m from '$messages';
  import { Blend, Moon, Sun } from 'lucide-svelte';
  import { MediaQuery } from 'svelte/reactivity';

  export class Theme {
    static readonly options = {
      system: {
        icon: Blend,
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
    };

    #persisted = new Persisted<'system' | 'light' | 'dark'>('theme', 'system');
    #query = new MediaQuery('(prefers-color-scheme: dark)');
    #system = $derived(
      this.#query.current ? ('dark' as const) : ('light' as const),
    );
    resolved = $derived(
      this.#persisted.current === 'system'
        ? this.#system
        : this.#persisted.current,
    );

    get current() {
      return this.#persisted.current;
    }

    set current(value) {
      this.#persisted.current = value;
    }
  }

  export const theme = new Theme();
</script>

<script lang="ts">
  $effect(() => {
    document.documentElement.setAttribute('data-theme', theme.resolved);
  });
</script>

<svelte:head>
  <script>
    {
      const theme = localStorage.getItem('theme');
      document.documentElement.setAttribute(
        'data-theme',
        !theme || theme === 'system'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : theme,
      );
    }
  </script>
</svelte:head>
