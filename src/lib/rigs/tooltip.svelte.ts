// import { randomId } from '$lib/common/string';
// import { KEYS } from '$lib/data/meta';
// import {
//   autoUpdate,
//   computePosition,
//   flip,
//   offset,
//   shift,
//   type ArrowOptions,
//   type ComputePositionReturn,
//   type FlipOptions,
//   type OffsetOptions,
//   type Placement,
//   type ShiftOptions,
//   type Strategy,
// } from '@floating-ui/dom';
// import type { HTMLAttributes } from 'svelte/elements';
// import { on } from 'svelte/events';
// import { Bound } from './bound.svelte';
// import { arrow, transformOrigin } from './floating.svelte';
// import { asGetSet, attrSelector, isHTMLElement } from './utils';

// export class Tooltip {
//   static readonly attr = {
//     trigger: 'data-tooltip-trigger',
//     content: 'data-tooltip-content',
//     arrow: 'data-tooltip-arrow',
//     placement: 'data-floating-placement',
//   } as const;
//   static #defaultGroup = Symbol();
//   static #groups = new Map<unknown, Tooltip>();

//   #options;
//   #computed: ComputePositionReturn | undefined;
//   #id = randomId(8);
//   #open: Bound<boolean>;
//   #timer: ReturnType<typeof setTimeout> | undefined; // Use explicit timer type?

//   constructor(options: {
//     /**
//      * Optional group to which the tooltip's exclusivity and visibility
//      * behaviors should be related. Useful to refine consideration of preceding
//      * or succeding active tooltips in logic such as opening and closing delay.
//      */
//     group?: unknown;
//     /**
//      * Immediately close the tooltip whenever user clicks outside the tooltip
//      * content or presses `Esc`. Also applies if the click occurs on trigger
//      * element.
//      */
//     lightDismiss?: boolean;
//     /**
//      * Delay in `ms` before the tooltip should open once focused/hovered. Open
//      * delay is not applied if tooltip from same group was previously triggered
//      * and is still opened.
//      */
//     openDelay?: number;
//     /**
//      * Delay in `ms` before the tooltip should close after focus/hover is done.
//      * Delay is aborted if another tooltip in the same group is triggered.
//      */
//     closeDelay?: number;
//     /** Initial state of the tooltip. */
//     open?: boolean;
//     /** If the consumer controls visibility. */
//     forceVisible?: boolean;
//     /** Floating placement. */
//     placement?: Placement;
//     /** Floating strategy. */
//     strategy?: Strategy;
//     /** @see https://floating-ui.com/docs/offset */
//     offset?: OffsetOptions | false;
//     /** @see https://floating-ui.com/docs/flip */
//     flip?: FlipOptions | false;
//     /** @see https://floating-ui.com/docs/shift */
//     shift?: ShiftOptions | false;
//     /** @see https://floating-ui.com/docs/arrow */
//     arrow?: Omit<ArrowOptions, 'element'>;
//     /** Apply transform-origin middleware. */
//     transformOrigin?: false;
//   }) {
//     this.#options = options;
//     this.#open = new Bound({
//       ...asGetSet(options, 'open'),
//       fallback: false,
//     });

//     $effect.root(() => {
//       if (options.open) {
//         this.open = true;
//       }
//       const unkeydown = on(window, 'keydown', (e) => {
//         if (e.key === KEYS.ESCAPE && this.open && this.lightDismiss) {
//           this.open = false;
//         }
//       });
//       return () => {
//         unkeydown();
//         this.open = false;
//       };
//     });
//   }

//   get open() {
//     return this.#open.value;
//   }

//   set open(value) {
//     clearTimeout(this.#timer);
//     this.#timer = undefined;
//     if (value === this.open) {
//       return;
//     }
//     this.#open.value = value;
//     if (value) {
//       const activeInGroup = Tooltip.#groups.get(this.group);
//       if (activeInGroup && activeInGroup !== this) {
//         activeInGroup.open = false;
//       }
//       Tooltip.#groups.set(this.group, this);
//     } else {
//       if (Tooltip.#groups.get(this.group) === this) {
//         Tooltip.#groups.delete(this.group);
//       }
//     }
//   }

//   get lightDismiss() {
//     return this.#options.lightDismiss ?? true;
//   }

//   get openDelay() {
//     return this.#options.openDelay ?? 750;
//   }

//   get closeDelay() {
//     return this.#options.closeDelay ?? 350;
//   }

//   get group() {
//     return this.#options.group ?? Tooltip.#defaultGroup;
//   }

//   get forceVisible() {
//     return this.#options.forceVisible ?? true;
//   }

//   get placement() {
//     return this.#options.placement ?? 'top';
//   }

//   get strategy() {
//     return this.#options.strategy ?? 'absolute';
//   }

//   get computed() {
//     return this.#computed;
//   }

//   get #baseAttr() {
//     return {
//       'data-state': this.open ? 'open' : 'closed',
//     };
//   }

//   #setOpenDelayed(value: boolean) {
//     clearTimeout(this.#timer);
//     this.#timer = undefined;
//     const activeInGroup = Tooltip.#groups.get(this.group);
//     if (value) {
//       if (activeInGroup && activeInGroup !== this) {
//         this.open = true;
//       } else {
//         this.#timer = setTimeout(() => {
//           this.open = true;
//         }, this.openDelay);
//       }
//     } else {
//       if (activeInGroup && activeInGroup !== this) {
//         this.open = false;
//       } else {
//         this.#timer = setTimeout(() => {
//           this.open = false;
//         }, this.closeDelay);
//       }
//     }
//   }

//   /** @returns Attributes for the triggering anchor element. */
//   getTriggerAttributes() {
//     return {
//       ...this.#baseAttr,
//       [Tooltip.attr.trigger]: this.#id,
//       onmouseenter: () => {
//         this.#setOpenDelayed(true);
//       },
//       onmouseleave: () => {
//         this.#setOpenDelayed(false);
//       },
//       onpointerdown: () => {
//         if (this.lightDismiss) {
//           this.open = false;
//         }
//       },
//       onfocus: (e) => {
//         if (!this.lightDismiss || e.currentTarget.matches(':focus-visible')) {
//           this.open = true;
//         }
//       },
//       onblur: () => {
//         this.open = false;
//       },
//     } satisfies HTMLAttributes<HTMLElement>;
//   }

//   /** @returns Attributes for the floating tooltip element. */
//   getContentAttributes() {
//     let cleanup: ReturnType<typeof autoUpdate> | undefined;
//     $effect(() => {
//       const contentEl = document.querySelector(
//         attrSelector(Tooltip.attr.content, this.#id),
//       );
//       if (!isHTMLElement(contentEl)) {
//         return;
//       }
//       const arrowEl = document.querySelector(
//         attrSelector(Tooltip.attr.arrow, this.#id),
//       );
//       if (this.open || this.forceVisible) {
//         contentEl.showPopover();
//         const triggerEl = document.querySelector(
//           attrSelector(Tooltip.attr.trigger, this.#id),
//         );
//         if (!isHTMLElement(triggerEl)) {
//           return;
//         }
//         cleanup = autoUpdate(triggerEl, contentEl, () => {
//           computePosition(triggerEl, contentEl, {
//             placement: this.placement,
//             strategy: this.strategy,
//             middleware: [
//               this.#options.offset !== false &&
//                 offset(this.#options.offset ?? { mainAxis: 12 }),
//               this.#options.flip !== false && flip(this.#options.flip),
//               this.#options.shift !== false && shift(this.#options.shift),
//               arrowEl && arrow({ ...this.#options.arrow, element: arrowEl }),
//               this.#options.transformOrigin !== false && transformOrigin(),
//             ],
//           }).then((computed) => {
//             this.#computed = computed;
//             Object.assign(contentEl.style, {
//               position: computed.strategy,
//               left: `${computed.x}px`,
//               top: `${computed.y}px`,
//             });
//             contentEl.setAttribute(Tooltip.attr.placement, computed.placement);
//             arrowEl?.setAttribute(Tooltip.attr.placement, computed.placement);
//           });
//         });
//       } else {
//         contentEl.hidePopover();
//         cleanup?.();
//       }
//       return () => {
//         cleanup?.();
//       };
//     });
//     return {
//       ...this.#baseAttr,
//       [Tooltip.attr.content]: this.#id,
//       popover: 'manual',
//       onmouseenter: () => {
//         this.#setOpenDelayed(true);
//       },
//       onmouseleave: () => {
//         this.#setOpenDelayed(false);
//       },
//       onfocusin: (e) => {
//         if (isHTMLElement(e.target) && !e.target.matches(':focus-visible')) {
//           return;
//         }
//         this.open = true;
//       },
//       onfocusout: (e) => {
//         if (
//           !isHTMLElement(e.relatedTarget) ||
//           !e.currentTarget.contains(e.relatedTarget)
//         ) {
//           this.open = false;
//         }
//       },
//     } satisfies HTMLAttributes<HTMLElement>;
//   }

//   /**
//    * @returns Attributes for the arrow element.
//    *
//    * @see https://floating-ui.com/docs/arrow
//    */
//   getArrowAttributes() {
//     return {
//       [Tooltip.attr.arrow]: this.#id,
//       // popover: 'manual',
//     } satisfies HTMLAttributes<HTMLElement>;
//   }
// }
