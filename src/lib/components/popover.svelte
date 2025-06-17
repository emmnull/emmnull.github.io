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
  export class Popover<
    T extends Omit<
      NonNullable<ConstructorParameters<typeof Floating>[0]>,
      'active'
    > & { open?: boolean },
  > {
    static readonly attributes = {
      placement: 'data-popover-placement',
      anchor: 'data-popover-anchor',
      target: 'data-popover-target',
      arrow: 'data-popover-arrow',
    } as const;

    #floating;

    constructor({ open: active, ...options }: T) {
      this.#floating = new Floating({ ...options, active });
    }

    get open() {
      return this.#floating.active;
    }

    set open(value) {
      this.#floating.active = value;
    }

    anchorAttributes({
      mode = 'toggle',
    }: { mode?: 'toggle' | 'open' | 'close' } = {}) {
      return {
        ...this.#floating.referenceAttributes(),
        [Popover.attributes.anchor]: '',
        'data-state': this.open ? 'open' : undefined,
        onclick: (e) => {
          this.open =
            mode === 'toggle' ? !this.open : mode === 'open' ? true : false;
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    targetAttributes({ modal = false }: { modal?: boolean } = {}) {
      return {
        ...this.#floating.floatingAttributes(),
        [Popover.attributes.target]: '',
        onclose: (e) => {
          if (!e.defaultPrevented) {
            this.open = false;
          }
        },
        [createAttachmentKey()]: (node) => {
          if (this.open) {
            if (node instanceof HTMLDialogElement) {
              modal ? node.showModal() : node.show();
            } else {
              node.showPopover();
            }
          } else {
            if (node instanceof HTMLDialogElement) {
              node.close();
            } else {
              node.hidePopover();
            }
          }
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
    children: Snippet<[InstanceType<typeof Popover>]>;
  } & T = $props();

  export const popover = new Popover(options);
</script>

{@render children(popover)}
