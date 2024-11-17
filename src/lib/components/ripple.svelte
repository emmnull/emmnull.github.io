<script lang="ts" module>
	const HOST_ATTRIBUTE = 'data-ripple-host';

	const CSS_VAR_NAMES = {
		X: '--ripple-x',
		Y: '--ripple-y',
		D: '--ripple-d',
		SPREAD_DURATION: '--ripple-spread-duration',
		OUTRO_DURATION: '--ripple-outro-duration'
	} as const;
</script>

<script lang="ts">
	import { cssvar, px, type CSSVar } from '$lib/common/css';
	import { onDestroy } from 'svelte';
	import type { ActionReturn } from 'svelte/action';
	import type { HTMLAttributes } from 'svelte/elements';
	import { on } from 'svelte/events';

	let {
		blur,
		spreadDuration = (d) => 150 + d * 0.25,
		spreadEasing,
		outroDuration = 1_000,
		outroEasing,
		opacity,
		color,
		zIndex
	}: {
		blur?: string | number | ((diameter: CSSVar<(typeof CSS_VAR_NAMES)['D']>) => string);
		opacity?: string | number;
		spreadDuration?: number | ((diameter: number) => number);
		spreadEasing?: string;
		outroDuration?: number | ((diameter: number) => number);
		outroEasing?: string;
		zIndex?: number;
		color?: string;
	} = $props();

	class Ripplet {
		#x;
		#y;
		#d;
		#outroing = $state(false);
		#canceled = $state(false);
		#outside = $state(false);
		#done = { spread: false, outro: false };
		#unbinds: (() => void)[] = [];

		constructor(host: HTMLElement, e: PointerEvent) {
			// Using bounding client rect, even if a bit more expensive, to account for
			// child element event targets that steal the offsetX and offsetY value referentials.
			const rect = host.getBoundingClientRect();
			this.#x = e.clientX - rect.left;
			this.#y = e.clientY - rect.top;
			const rx = Math.max(this.#x, rect.right - e.clientX);
			const ry = Math.max(this.#y, rect.bottom - e.clientY);
			this.#d = 2 * Math.hypot(rx, ry);

			this.#unbinds.push(
				on(document, 'pointerup', this.#outro.bind(this)),
				on(document, 'pointercancel', this.#outro.bind(this)),
				on(host, 'pointerenter', this.#enter.bind(this)),
				on(host, 'pointerleave', this.#leave.bind(this))
			);
		}

		unbind() {
			for (const unbind of this.#unbinds) {
				unbind();
			}
		}

		#enter(e: PointerEvent) {
			this.#outside = false;
			return e;
		}

		#leave(e: PointerEvent) {
			this.#outside = true;
			return e;
		}

		#outro(e: PointerEvent) {
			this.unbind();
			this.#outroing = true;
			if (e.type === 'pointercancel' || this.#outside) {
				this.#canceled = true;
			}
		}

		#destroy() {
			ripplets.splice(ripplets.indexOf(this), 1);
		}

		getAttributes() {
			const _this = this;
			return {
				'data-ripple': '',
				get 'data-ripple-outroing'() {
					return _this.#outroing || undefined;
				},
				get 'data-ripple-canceled'() {
					return _this.#canceled || undefined;
				},
				get 'data-ripple-outside'() {
					return _this.#outside || undefined;
				},
				get style() {
					return (
						`${CSS_VAR_NAMES.X}:${Math.round(_this.#x)}px;` +
						`${CSS_VAR_NAMES.Y}:${Math.round(_this.#y)}px;` +
						`${CSS_VAR_NAMES.D}:${Math.ceil(_this.#d)}px;` +
						`${CSS_VAR_NAMES.SPREAD_DURATION}:${typeof spreadDuration === 'number' ? spreadDuration : Math.round(spreadDuration(_this.#d))}ms;` +
						`${CSS_VAR_NAMES.OUTRO_DURATION}:${typeof outroDuration === 'number' ? outroDuration : Math.round(outroDuration(_this.#d))}ms;`
					);
				},
				onanimationendcapture(e) {
					if (e.target !== e.currentTarget || !(e.target instanceof Element)) return;
					if (e.animationName === 'ripple-spread') {
						_this.#done.spread = true;
					} else if (e.animationName === 'ripple-outro') {
						_this.#done.outro = true;
					}
					if (_this.#done.spread && _this.#done.outro) {
						_this.#destroy();
					}
				}
			} satisfies HTMLAttributes<HTMLElement>;
		}
	}

	let ripplets = $state<Ripplet[]>([]);

	function action(container: HTMLElement) {
		const host = container.parentElement;
		if (!host) return;
		host.setAttribute(HOST_ATTRIBUTE, '');
		const unbindPointerdown = on(host, 'pointerdown', (e) => {
			// Catching only the directly descending events, prevents conflict between nested ripple triggers.
			if (
				// Catching only the directly descending events, prevents conflict between nested ripple triggers.
				e.target instanceof Element &&
				e.target.closest(`[${HOST_ATTRIBUTE}]`) === e.currentTarget
			) {
				ripplets.push(new Ripplet(host, e));
			}
		});
		return {
			destroy() {
				unbindPointerdown();
				host.removeAttribute(HOST_ATTRIBUTE);
			}
		} satisfies ActionReturn;
	}

	onDestroy(() => {
		for (const r of ripplets) {
			r.unbind();
		}
	});
</script>

<div
	use:action
	class="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
	style:--ripple-z-index={zIndex}
	style:--ripple-opacity={opacity}
	style:--ripple-color={color}
	style:--ripple-blur={blur
		? typeof blur === 'function'
			? blur(cssvar(CSS_VAR_NAMES.D))
			: px(blur)
		: undefined}
	style:--ripple-spread-easing={spreadEasing}
	style:--ripple-outro-easing={outroEasing}
>
	{#each ripplets as r (r)}
		<div
			class="absolute aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full"
			{...r.getAttributes()}
		></div>
	{/each}
</div>

<style>
	[data-ripple] {
		--_ripple-spread-easing: var(--ripple-spread-easing, cubic-bezier(0, 0, 0, 1));
		--_ripple-outro-easing: var(--ripple-outro-easing, cubic-bezier(0, 0, 0.5, 1));
		--_ripple-blur: var(--ripple-blur, calc(var(--ripple-d) * 0.05));
		--_ripple-color: var(--ripple-color, currentColor);
		left: var(--ripple-x);
		top: var(--ripple-y);
		width: 0;
		/* background: radial-gradient(
			circle at center,
			var(--_ripple-color),
			transparent calc(1.25 * var(--ripple-d))
		); */
		background: radial-gradient(circle at center, transparent -25%, var(--_ripple-color) 100%);
		opacity: var(--ripple-opacity, 25%);
		filter: blur(var(--_ripple-blur));
		transition: opacity calc(var(--ripple-outro-duration) / 2) var(--_ripple-outro-easing);
		animation: var(--ripple-spread-duration) var(--_ripple-spread-easing) 0s 1 forwards
			ripple-spread;
	}

	[data-ripple-outroing] {
		animation:
			var(--ripple-outro-duration) var(--_ripple-outro-easing) 0s 1 forwards ripple-outro,
			var(--ripple-spread-duration) var(--_ripple-spread-easing) 0s 1 forwards ripple-spread;
	}

	[data-ripple-canceled] {
		animation-delay: 0s;
	}

	[data-ripple-outside] {
		transition: opacity var(--ripple-outro-duration) var(--_ripple-outro-easing);
		opacity: 0;
	}

	@keyframes ripple-outro {
		to {
			opacity: 0;
		}
	}

	@keyframes ripple-spread {
		to {
			width: calc(var(--ripple-d) + 2 * var(--_ripple-blur));
		}
	}
</style>
