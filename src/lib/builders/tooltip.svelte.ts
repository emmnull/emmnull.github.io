import { browser } from '$app/environment';
import { KEYS } from '$lib/common/constants';
import { randomId } from '$lib/common/string';
import {
	flip,
	offset,
	shift,
	type FlipOptions,
	type OffsetOptions,
	type ShiftOptions
} from '@floating-ui/dom';
import { tick } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { on } from 'svelte/events';
import { FloatingWithArrow } from './floating.svelte';

const DEFAULT_GROUP = Symbol();

const groups = new Map<unknown, Tooltip>();

export class Tooltip {
	id = $state(`tooltiop-${randomId(8)}`);
	lightDismiss = $state(true);
	interactive = $state(false);
	openDelay = $state(750);
	closeDelay = $state(350);
	#group: unknown = DEFAULT_GROUP;
	#timer: ReturnType<typeof setTimeout> | undefined;
	#open = $state(false);
	#floating;

	constructor({
		id,
		group,
		lightDismiss,
		interactive,
		openDelay,
		closeDelay,
		open,
		placement = 'top',
		strategy,
		offset = {
			mainAxis: 12
		},
		flip,
		shift,
		arrow
	}: {
		/**
		 * Id used to select the tooltip element.
		 */
		id?: string;
		/**
		 * Optional group to which the tooltip's exclusivity and visibility behaviors should be related.
		 * Useful to refine consideration of preceding or succeding active tooltips in logic such as
		 * opening and closing delay.
		 */
		group?: unknown;
		/**
		 * Immediately close the tooltip whenever user clicks outside the tooltip content or presses
		 * `Esc`. Also applies if the click occurs on trigger element.
		 */
		lightDismiss?: boolean;
		/**
		 * Defines if hovering the tooltip should refresh its open state or not.
		 */
		interactive?: boolean;
		/**
		 * Delay in `ms` before the tooltip should open once focused/hovered. Open delay is not applied
		 * if tooltip from same group was previously triggered and is still opened.
		 */
		openDelay?: number;
		/**
		 * Delay in `ms` before the tooltip should close after focus/hover is done. Delay is aborted if
		 * another tooltip in the same group is triggered.
		 */
		closeDelay?: number;
		/**
		 * Initial state of the tooltip.
		 */
		open?: boolean;
	} & ConstructorParameters<
		typeof FloatingWithArrow<{
			/**
			 * @see https://floating-ui.com/docs/offset
			 */
			offset?: OffsetOptions | false;
			/**
			 * @see https://floating-ui.com/docs/flip
			 */
			flip?: FlipOptions | false;
			/**
			 * @see https://floating-ui.com/docs/shift
			 */
			shift?: ShiftOptions | false;
		}>
	>[0] = {}) {
		if (id != null) this.id = id;
		if (group != null) this.#group = group;
		if (lightDismiss != null) this.lightDismiss = lightDismiss;
		if (interactive != null) this.interactive = interactive;
		if (openDelay != null) this.openDelay = openDelay;
		if (closeDelay != null) this.closeDelay = closeDelay;
		this.#floating = new FloatingWithArrow({ placement, strategy, offset, flip, shift, arrow });

		if (open)
			tick().then(() => {
				this.open = true;
			});

		this.getContainerAttributes.bind(this);
		this.getTriggerAttributes.bind(this);
		this.getArrowAttributes.bind(this);

		$effect.root(() => {
			const removeKeydown = on(window, 'keydown', (e) => {
				if (e.key === KEYS.ESCAPE && this.open && this.lightDismiss) {
					this.open = false;
				}
			});
			return () => {
				removeKeydown();
				this.open = false;
			};
		});
	}

	get open() {
		return this.#open;
	}

	set open(value) {
		if (!browser) return;
		clearTimeout(this.#timer);
		this.#timer = undefined;
		if (value === this.#open) return;
		this.#open = value;
		if (value) {
			const activeInGroup = groups.get(this.#group);
			if (activeInGroup && activeInGroup !== this) {
				activeInGroup.open = false;
			}
			groups.set(this.#group, this);
			tick().then(() => {
				const triggerRef = document.querySelector(`[data-tooltip-trigger-id='${this.id}']`);
				if (!(triggerRef instanceof HTMLElement)) {
					console.warn('No tooltip trigger element found.');
					return;
				}
				const tooltipRef = document.querySelector(`[data-tooltip-id='${this.id}']`);
				if (!(tooltipRef instanceof HTMLElement)) {
					console.warn('No tooltip element found.');
					return;
				}
				const arrowRef = tooltipRef.querySelector(`[data-tooltip-arrow-id='${this.id}']`);
				this.#floating.start(triggerRef, tooltipRef, arrowRef, [
					this.#floating.options.offset !== false && offset(this.#floating.options.offset),
					this.#floating.options.flip !== false && flip(this.#floating.options.flip),
					this.#floating.options.shift !== false && shift(this.#floating.options.shift)
				]);
			});
		} else {
			this.#floating.stop();
			if (groups.get(this.#group) === this) {
				groups.delete(this.#group);
			}
		}
	}

	get group() {
		return this.#group;
	}

	get floating() {
		return this.#floating;
	}

	#setOpenDelayed(value: boolean) {
		clearTimeout(this.#timer);
		this.#timer = undefined;
		const activeInGroup = groups.get(this.#group);
		if (value) {
			if (activeInGroup && activeInGroup !== this) {
				this.open = true;
			} else {
				this.#timer = setTimeout(() => {
					this.open = true;
				}, this.openDelay);
			}
		} else {
			if (activeInGroup && activeInGroup !== this) {
				this.open = false;
			} else {
				this.#timer = setTimeout(() => {
					this.open = false;
				}, this.closeDelay);
			}
		}
	}

	/**
	 * @returns Attributes for the triggering anchor element.
	 */
	getTriggerAttributes() {
		const _this = this;
		return {
			get 'data-tooltip-trigger-id'() {
				return _this.id;
			},
			onmouseenter(e) {
				_this.#setOpenDelayed(true);
			},
			onmouseleave(e) {
				_this.#setOpenDelayed(false);
			},
			onpointerdown(e) {
				if (_this.lightDismiss) {
					_this.open = false;
				}
			},
			onfocus(e) {
				if (!_this.lightDismiss || e.currentTarget.matches(':focus-visible')) {
					_this.open = true;
				}
			},
			onblur(e) {
				_this.open = false;
			},
			..._this.#floating.getAnchorAttributes()
		} satisfies HTMLAttributes<HTMLElement>;
	}

	/**
	 * @returns Attributes for the floating tooltip element.
	 */
	getContainerAttributes() {
		const _this = this;
		return {
			get 'data-tooltip-id'() {
				return _this.id;
			},
			get 'data-tooltip-interactive'() {
				return _this.interactive;
			},
			onmouseenter(e) {
				if (!_this.interactive) return;
				_this.#setOpenDelayed(true);
			},
			onmouseleave(e) {
				_this.#setOpenDelayed(false);
			},
			onfocusin(e) {
				if (!_this.interactive) return;
				if (e.target instanceof HTMLElement && !e.target.matches(':focus-visible')) return;
				_this.open = true;
			},
			onfocusout(e) {
				if (!(e.relatedTarget instanceof Element) || !e.currentTarget.contains(e.relatedTarget)) {
					_this.open = false;
				}
			},
			..._this.#floating.getFloatingAttributes()
		} satisfies HTMLAttributes<HTMLElement>;
	}

	/**
	 * @returns Attributes for the arrow element.
	 * @see https://floating-ui.com/docs/arrow
	 */
	getArrowAttributes(...options: Parameters<FloatingWithArrow['getArrowAttributes']>) {
		const _this = this;
		return {
			get 'data-tooltip-arrow-id'() {
				return _this.id;
			},
			..._this.#floating.getArrowAttributes(...options)
		} satisfies HTMLAttributes<HTMLElement>;
	}
}
