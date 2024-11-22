import { browser, dev } from '$app/environment';
import { randomId } from '$lib/common/string';
import { tick } from 'svelte';
import type { HTMLAttributes, HTMLDialogAttributes } from 'svelte/elements';
import { ScrollLock } from './scroll-lock.svelte';

/**
 * Create a dialog using a hybrid of declarative HTML popover and reactive state control.
 */
export class Dialog {
	id = $state(`dialog-${randomId(6)}`);
	modal = $state(true);
	lightDismiss = $state(true);
	#open = $state(false);
	#beforeOpen;
	#onOpen;
	#beforeClose;
	#onClose;
	#scrollLock;
	#previousFocusRef: HTMLElement | undefined;
	#previousFocusVisible = false;

	constructor({
		id,
		open,
		modal,
		lightDismiss,
		beforeOpen,
		onOpen,
		beforeClose,
		onClose
	}: {
		/**
		 * Id used to select the dialog element.
		 */
		id?: string;
		/**
		 * Initial state of the dialog.
		 */
		open?: boolean;
		/**
		 * Show the dialog as a modal, meaning it should render all other elements in the same container
		 * `inert` and block scroll.
		 */
		modal?: boolean;
		/**
		 * Close the dialog whenever user clicks outside.
		 */
		lightDismiss?: boolean;
		/**
		 * Callback executed before attempting to open the dialog. Return true to proceed, else will
		 * prevent opening the dialog.
		 */
		beforeOpen?: (e?: Event) => boolean;
		/**
		 * Callback executed once the dialog has successfylly opened.
		 */
		onOpen?: (e?: Event) => void;
		/**
		 * Callback executed before attempting to close the dialog. Return true to proceed, else will
		 * prevent closing the dialog.
		 */
		beforeClose?: (e?: Event) => boolean;
		/**
		 * Callback executed once the dialog has successfully closed.
		 */
		onClose?: (e?: Event) => void;
	} = {}) {
		if (id != null) {
			this.id = id;
		}
		if (modal != null) {
			this.modal = modal;
		}
		if (lightDismiss != null) {
			this.lightDismiss = lightDismiss;
		}
		this.#beforeOpen = beforeOpen;
		this.#onOpen = onOpen;
		this.#beforeClose = beforeClose;
		this.#onClose = onClose;
		if (browser) {
			this.#scrollLock = new ScrollLock(document.documentElement);
		}

		this.getDialogAttributes.bind(this);
		this.getContentAttributes.bind(this);
		this.getTriggerAttributes.bind(this);
		this.getCloseAttributes.bind(this);

		// Ensuring we properly initialize open state.
		if (open) this.#setOpen(true);
	}

	/**
	 * Update the dialog state with the appropriate state change handlers. Allows granular control of
	 * events triggering state changes.
	 *
	 * @returns `true` if successfully changed state, else `false` if aborted.
	 */
	#setOpen(state: boolean, e?: Event) {
		// Prevent unecessary firing.
		if (this.#open === state) return;
		// Execute any preceding handlers and continue accordingly.
		const proceed = (state ? this.#beforeOpen : this.#beforeClose)?.(e) ?? true;
		if (!proceed) {
			if (!e?.defaultPrevented) {
				e?.preventDefault();
			}
			return false;
		}
		this.#previousFocusRef =
			document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
		this.#previousFocusVisible = this.#previousFocusRef?.matches(':focus-visible') ?? false;
		this.#open = state;
		if (this.#scrollLock) this.#scrollLock.active = state;
		if (!state) {
			this.#previousFocusRef?.focus(
				// @ts-ignore: Pending support (https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)
				{ focusVisible: this.#previousFocusVisible }
			);
			this.#previousFocusRef = undefined;
			this.#previousFocusVisible = false;
		}
		(state ? this.#onOpen : this.#onClose)?.(e);
		return true;
	}

	get open() {
		return this.#open;
	}

	set open(state: boolean) {
		this.#setOpen(state);
	}

	/**
	 * Get attributes for the HTML dialog element.
	 *
	 * @returns Type-cast HTMLDialogAttributes to force use of `<dialog>` element.
	 */
	getDialogAttributes() {
		const _this = this;
		tick().then(() => {
			const ref = document.querySelector(`[data-dialog-id=${this.id}]`);
			!ref && dev && console.warn(`No dialog element found with expected id "${this.id}".`);
			if (this.modal) {
				ref instanceof HTMLDialogElement && ref.showModal();
			} else {
				ref instanceof HTMLDialogElement && ref.show();
			}
		});
		return {
			get 'data-dialog-id'() {
				return _this.id;
			},
			get 'aria-modal'() {
				return _this.modal || undefined;
			},
			onclick(e) {
				if (_this.lightDismiss) {
					_this.#setOpen(false, e);
				}
			},
			oncancel(e) {
				e.preventDefault();
				if (_this.lightDismiss) {
					_this.#setOpen(false, e);
				}
			}
		} as HTMLDialogAttributes;
	}

	/**
	 * Attributes for dialog box element that should be used to visually wrap the dialog contents
	 * displayed over the backdrop.
	 */
	getContentAttributes() {
		const _this = this;
		return {
			'data-dialog-content': true,
			onclick(e) {
				e.stopPropagation();
			}
		} satisfies HTMLAttributes<HTMLElement>;
	}

	/**
	 * Attributes for element(s) used as trigger to open and/or close the dialog from the outside.
	 */
	getTriggerAttributes({
		mode = 'toggle'
	}: {
		mode?: 'toggle' | 'open' | 'close';
	} = {}) {
		const _this = this;
		return {
			'aria-haspopup': 'dialog' as const,
			get 'data-state'() {
				return _this.open ? 'open' : 'closed';
			},
			get 'aria-expanded'() {
				return _this.open;
			},
			onclick(e) {
				const newState = mode === 'open' ? true : mode === 'close' ? false : !_this.open;
				_this.#setOpen(newState, e);
			}
		} satisfies HTMLAttributes<HTMLElement>;
	}

	/**
	 * Attributes for close button. Restores focus on trigger used to open the dialog if any.
	 *
	 * @todo Implement focus restoration.
	 */
	getCloseAttributes() {
		const _this = this;
		return {
			onclick(e) {
				_this.#setOpen(false, e);
			}
		} satisfies HTMLAttributes<HTMLElement>;
	}
}
