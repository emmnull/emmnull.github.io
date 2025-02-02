<script lang="ts" module>
  export const hotkey = { key: KEYS.K, meta: isMacOS, ctrl: isMacOS === false } satisfies KeyCombo;

  export const dialog = new Dialog();
</script>

<script lang="ts">
  import { Dialog } from '$lib/builders/dialog.svelte';
  import { KEYS } from '$lib/common/constants';
  import { isKeyCombo, type KeyCombo } from '$lib/common/event';
  import { isMacOS } from '$lib/common/platform';
  import DialogRoot from './dialog-root.svelte';
</script>

<svelte:window
  onkeydown={(e) => {
    if (isKeyCombo(e, hotkey)) {
      dialog.open = true;
    }
  }}
/>

<DialogRoot {dialog}>Hello search!</DialogRoot>
