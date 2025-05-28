import { browser } from '$app/environment';
import { randomId } from '$lib/common/string';
import type {
  HTMLAttributes,
  HTMLButtonAttributes,
  HTMLDialogAttributes,
} from 'svelte/elements';
import { Bound } from './bound.svelte';
import { Lockscroll } from './lockscroll.svelte';
import { asGetSet, attrSelector, isHTMLElement } from './utils';

/**
 * Create a dialog using a hybrid of declarative HTML and reactive state
 * control.
 */
export class Dialog {
  static readonly attr = {
    root: 'data-dialog-root',
    overlay: 'data-dialog-overlay',
    content: 'data-dialog-content',
    trigger: 'data-dialog-trigger',
    close: 'data-dialog-close',
  } as const;

  #options;
  #id = randomId(6);
  #open: Bound<boolean>;
  #lockscroll;
  #refocus: HTMLElement | undefined;
  #refocusVisible = false;

  constructor(
    options: {
      /** Initial state of the dialog. */
      open?: boolean;
      /**
       * Show the dialog as a modal, meaning it should render all other elements
       * in the same container `inert` and block scroll.
       */
      modal?: boolean;
      /** Close the dialog whenever user clicks outside. */
      lightDismiss?: boolean;
      /** If the user should control visibility of rhe. */
      forceVisible?: boolean;
      /**
       * Callback executed before attempting to open the dialog. Return true to
       * proceed, else will prevent opening the dialog.
       */
      beforeOpen?: (e?: Event) => boolean;
      /** Callback executed once the dialog has successfylly opened. */
      onOpen?: (e?: Event) => void;
      /**
       * Callback executed before attempting to close the dialog. Return true to
       * proceed, else will prevent closing the dialog.
       */
      beforeClose?: (e?: Event) => boolean;
      /** Callback executed once the dialog has successfully closed. */
      onClose?: (e?: Event) => void;
    } = {},
  ) {
    this.#options = options;
    this.#open = new Bound({
      ...asGetSet(options, 'open'),
      fallback: false,
    });

    if (browser) {
      this.#lockscroll = new Lockscroll(document.documentElement);
    }

    /**
     * Should be implemented through createSubscriber() instead.
     *
     * @see https://www.youtube.com/live/BGNykPO4L7c?si=BO4UcJQR0ds70ybd&t=5934
     */
    $effect.root(() => {
      if (options.open) {
        this.open = true;
      }
      return () => {
        this.open = false;
      };
    });
  }

  get open() {
    return this.#open.value;
  }

  set open(state: boolean) {
    this.#setOpen(state);
  }

  get modal() {
    return this.#options.modal ?? true;
  }

  get lightDismiss() {
    return this.#options.lightDismiss ?? true;
  }

  get forceVisible() {
    return this.#options.forceVisible ?? true;
  }

  get #baseAttr() {
    return {
      'data-state': this.open ? 'open' : 'closed',
    };
  }

  #getRootEl() {
    const el = document.querySelector(attrSelector(Dialog.attr.root, this.#id));
    if (!isHTMLElement(el, HTMLDialogElement)) {
      return;
    }
    return el;
  }

  /**
   * Update the dialog state with the appropriate state change handlers. Allows
   * granular control of events triggering state changes.
   *
   * @returns `true` if successfully changed state, else `false` if aborted.
   *
   * @todo Implement focus restoration on close.
   *
   * @todo Move as much logic into getRootAttributes.
   */
  #setOpen(value: boolean, e?: Event) {
    // Prevent unecessary firing.
    if (this.open === value) {
      return;
    }
    // Preceding handlers.
    const proceed =
      (value ? this.#options.beforeOpen : this.#options.beforeClose)?.(e) ??
      true;
    if (!proceed) {
      if (!e?.defaultPrevented) {
        e?.preventDefault();
      }
      return false;
    }
    if (isHTMLElement(document.activeElement)) {
      this.#refocus = document.activeElement;
      this.#refocusVisible = this.#refocus?.matches(':focus-visible') ?? false;
    }
    this.#open.value = value;
    if (this.#lockscroll && this.modal) {
      this.#lockscroll.active = value;
    }
    if (!value) {
      if (!this.forceVisible) {
        this.#getRootEl()?.close();
      }
      this.#refocus?.focus(
        // @ts-expect-error: Pending support (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
        { focusVisible: this.#refocusVisible },
      );
      this.#refocus = undefined;
      this.#refocusVisible = false;
    }
    // Succeeding handlers.
    (value ? this.#options.onOpen : this.#options.onClose)?.(e);
    return true;
  }

  /**
   * @returns Attributes for the functional dialog element.
   *
   * @todo Use attachment once feature is released.
   *   (https://github.com/sveltejs/svelte/pull/15000)
   */
  getRootAttributes() {
    $effect(() => {
      const root = this.#getRootEl();
      if (!root) {
        return;
      }
      if (this.modal) {
        root.showModal();
      } else {
        root.show();
      }
    });
    return {
      ...this.#baseAttr,
      [Dialog.attr.root]: this.#id,
      'aria-modal': this.modal || undefined,
      onclick: (e) => {
        const content = document.querySelector(
          attrSelector(Dialog.attr.content, this.#id),
        );
        if (this.lightDismiss) {
          if (isHTMLElement(e.target) && content?.contains(e.target)) {
            return;
          }
          this.#setOpen(false, e);
        }
      },
      oncancel: (e) => {
        e.preventDefault();
        if (this.lightDismiss) {
          this.#setOpen(false, e);
        }
      },
    } as HTMLDialogAttributes;
  }

  /** @returns Attributes for custom backdrop. */
  getOverlayAttributes() {
    return {
      ...this.#baseAttr,
      [Dialog.attr.overlay]: '',
    };
  }

  /**
   * @returns Attributes for the dialog's visual content box. This additionnal
   *   nesting is needed to allow better handling of light dismissal and
   *   customization of backdrops.
   */
  getContentAttributes() {
    return {
      ...this.#baseAttr,
      [Dialog.attr.content]: this.#id,
    } satisfies HTMLAttributes<HTMLElement>;
  }

  /**
   * @returns Attributes for open/close/toggle trigger(s), typically used
   *   outside the dialog.
   */
  getTriggerAttributes({
    mode = 'toggle',
  }: {
    mode?: 'toggle' | 'open' | 'close';
  } = {}) {
    return {
      ...this.#baseAttr,
      [Dialog.attr.trigger]: '',
      'aria-haspopup': 'dialog' as const,
      onclick: (e) => {
        const open =
          mode === 'open' ? true : mode === 'close' ? false : !this.open;
        this.#setOpen(open, e);
      },
    } satisfies HTMLButtonAttributes;
  }

  /** @returns Attributes for close button(s). */
  getCloseAttributes() {
    return {
      [Dialog.attr.close]: '',
      onclick: (e) => {
        this.#setOpen(false, e);
      },
    } satisfies HTMLButtonAttributes;
  }
}
