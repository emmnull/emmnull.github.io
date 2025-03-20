<script lang="ts">
  import { page } from '$app/state';
  import { Dialog } from '$lib//rigs/dialog.svelte';
  import DialogRoot from '$lib/components/dialog-root.svelte';
  import { LOCALES } from '$lib/i18n/constants';
  import { deLocalizeHref, getLocale, locales } from '$lib/i18n/generated/runtime';
  import * as m from '$messages';
  import { Languages } from 'lucide-svelte';
  import NavbarButton from './navbar-button.svelte';

  const dialog = new Dialog();
</script>

<NavbarButton class="aspect-square" {...dialog.getTriggerAttributes()}>
  {#snippet tooltip()}
    {m.language()}
  {/snippet}
  <Languages />
</NavbarButton>

<DialogRoot {dialog}>
  {#each locales as lang}
    <a
      class="button"
      href={deLocalizeHref(page.url.pathname)}
      hreflang={lang}
      aria-current={lang === getLocale() || undefined}
    >
      {LOCALES[lang]}
    </a>
  {/each}
</DialogRoot>
