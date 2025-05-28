import { createAttachmentKey } from 'svelte/attachments';
import type { HTMLAttributes } from 'svelte/elements';

export class Sidescroll {
  #height;

  constructor(options: {}) {}

  getContainerAttributes() {
    return {
      [createAttachmentKey()]: (node) => {
        this.#height = node.clientHeight;
      },
    } satisfies HTMLAttributes<HTMLElement>;
  }
}
