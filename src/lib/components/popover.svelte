<!--
  @component
  Headless component wrapping inline instantiation of Popover rig
  with internal Floating mechanics.
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { Floating } from './floating.svelte';

  /**
   * Basic handling of events and element references to manage internal Floating
   * states and computations.
   *
   * @see Floating
   */
  export class Popover<T extends ConstructorParameters<typeof Floating>[0]> {
    static readonly attributes = {
      placement: 'data-popover-placement',
      anchor: 'data-popover-anchor',
      target: 'data-popover-target',
      arrow: 'data-popover-arrow',
    } as const;

    #floating;
    #targetElement: HTMLElement | undefined;

    constructor(options: T) {
      this.#floating = new Floating(options);
    }

    anchorAttributes(options?: { modal?: boolean }) {
      return {
        ...this.#floating.referenceAttributes(),
        [Popover.attributes.anchor]: '',
        onclick: (e) => {
          this.#floating.active = true;
          if (this.#targetElement instanceof HTMLDialogElement) {
            options?.modal
              ? this.#targetElement.showModal()
              : this.#targetElement.show();
          } else {
            this.#targetElement?.showPopover();
          }
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    targetAttributes() {
      return {
        ...this.#floating.floatingAttributes(),
        [Popover.attributes.target]: '',
        [createAttachmentKey()]: (node) => {
          this.#targetElement = node;
          return () => {
            this.#targetElement = undefined;
          };
        },
        onclose: (e) => {
          this.#floating.active = false;
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    arrowAttributes() {
      return {
        ...this.#floating.arrowAttributes(),
        [Popover.attributes.arrow]: '',
      } satisfies HTMLAttributes<HTMLElement | SVGSVGElement>;
    }
  }
</script>

<script lang="ts" generics="T extends ConstructorParameters<typeof Popover>[0]">
  import { type Snippet } from 'svelte';
  import { createAttachmentKey } from 'svelte/attachments';

  let {
    children,
    ...options
  }: {
    children: Snippet<[InstanceType<typeof Popover<T>>]>;
  } & T = $props();

  export const popover = new Popover(options);
</script>

{@render children(popover)}
