import type { HTMLAttributes } from 'svelte/elements';

export function getLoadingAttributes() {
  let error = $state(false);
  let loaded = $state(false);
  return {
    onload() {
      console.log('onload');
      loaded = true;
    },
    onerror() {
      error = true;
    },
    get 'aria-busy'() {
      return !loaded || undefined;
    },
    get 'data-loaded'() {
      return loaded || undefined;
    },
    get 'data-error'() {
      return error || undefined;
    },
    // [createAttachmentKey()](node) {
    //   if (node.complete) {
    //     console.log('already complete');
    //     loaded = true;
    //   }
    // },
  } satisfies HTMLAttributes<HTMLImageElement>;
}
