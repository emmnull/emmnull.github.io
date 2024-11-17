import {
	arrow,
	autoUpdate,
	computePosition,
	type AlignedPlacement,
	type ArrowOptions,
	type Axis,
	type ComputePositionConfig,
	type ComputePositionReturn,
	type FloatingElement,
	type Placement,
	type ReferenceElement,
	type Strategy
} from '@floating-ui/dom';
import type { HTMLAttributes } from 'svelte/elements';

export type UnalignedPlacement = Exclude<Placement, AlignedPlacement>;

const PLACEMENT_MAIN_AXES = {
	top: 'y',
	bottom: 'y',
	left: 'x',
	right: 'x'
} as const satisfies Record<UnalignedPlacement, Axis>;

const PLACEMENT_CROSS_AXES = {
	top: 'x',
	bottom: 'x',
	left: 'y',
	right: 'y'
} as const satisfies Record<UnalignedPlacement, Axis>;

const PLACEMENT_MAIN_AXES_MODULATION = {
	top: 1,
	bottom: -1,
	left: 1,
	right: -1
} as const satisfies Record<UnalignedPlacement, 1 | -1>;

const PLACEMENT_CROSS_AXES_MODULATION = {
	top: 1,
	bottom: -1,
	left: 1,
	right: -1
} as const satisfies Record<UnalignedPlacement, 1 | -1>;

export class Floating<T extends Record<string, unknown> = Record<string, unknown>> {
	static getUnalignedPlacement(placement: Placement) {
		return placement.split('-')[0] as UnalignedPlacement;
	}

	static getMainAxis(unalignedPlacement: UnalignedPlacement) {
		return PLACEMENT_MAIN_AXES[unalignedPlacement];
	}

	static getCrossAxis(unalignedPlacement: UnalignedPlacement) {
		return PLACEMENT_CROSS_AXES[unalignedPlacement];
	}

	static getMainAxisModulation(unalignedPlacement: UnalignedPlacement) {
		return PLACEMENT_MAIN_AXES_MODULATION[unalignedPlacement];
	}

	static getCrossAxisModulation(unalignedPlacement: UnalignedPlacement) {
		return PLACEMENT_CROSS_AXES_MODULATION[unalignedPlacement];
	}

	placement;
	strategy;
	options;
	#computed = $state<ComputePositionReturn>();
	#cleanup: ReturnType<typeof autoUpdate> | undefined;

	constructor(
		{
			placement = 'top',
			strategy = 'absolute',
			...options
		}: {
			placement?: Placement;
			strategy?: Strategy;
		} & T = {} as T
	) {
		this.placement = placement;
		this.strategy = strategy;
		this.options = options;
	}

	get computed() {
		return this.#computed;
	}

	/**
	 * Compute position once.
	 *
	 * @see https://floating-ui.com/docs/computeposition
	 */
	compute(
		reference: ReferenceElement,
		floating: FloatingElement,
		middleware?: ComputePositionConfig['middleware']
	) {
		computePosition(reference, floating, {
			placement: this.placement,
			strategy: this.strategy,
			middleware
		}).then((computed) => {
			this.#computed = computed;
		});
	}

	/**
	 * Start tracking for auto-updating position compute.
	 *
	 * @see https://floating-ui.com/docs/autoUpdate
	 */
	start(
		reference: ReferenceElement,
		floating: FloatingElement,
		middleware?: ComputePositionConfig['middleware']
	) {
		this.stop();
		this.#cleanup = autoUpdate(reference, floating, () =>
			this.compute(reference, floating, middleware)
		);
	}

	/**
	 * Stop tracking and cleanup auto-update.
	 *
	 * @see https://floating-ui.com/docs/autoUpdate
	 */
	stop() {
		this.#cleanup?.();
		this.#cleanup = undefined;
	}

	getAnchorAttributes() {
		const _this = this;
		return {
			get 'data-floating-placement'() {
				return _this.#computed?.placement;
			}
		};
	}

	getFloatingAttributes() {
		const _this = this;
		return {
			get 'data-floating-placement'() {
				return _this.#computed?.placement;
			},
			get 'data-floating-strategy'() {
				return _this.#computed?.strategy;
			},
			get style() {
				return `position: ${_this.strategy}; left: ${_this.#computed?.x || 0}px; top: ${_this.#computed?.y || 0}px;`;
			}
		} satisfies HTMLAttributes<HTMLElement>;
	}
}

type WithArrowOptions<T extends Record<string, unknown> = Record<string, unknown>> = {
	/**
	 * @see https://floating-ui.com/docs/arrow
	 */
	arrow?: Omit<ArrowOptions, 'element'>;
} & T;

export class FloatingWithArrow<T extends WithArrowOptions = WithArrowOptions> extends Floating<
	WithArrowOptions<T>
> {
	constructor(options: ConstructorParameters<typeof Floating<WithArrowOptions<T>>>[0]) {
		super(options);
	}

	compute(
		...[reference, floating, ...rest]:
			| Parameters<Floating['compute']>
			| [
					reference: Parameters<Floating['compute']>[0],
					floating: Parameters<Floating['compute']>[1],
					arrow: Element | null,
					middleware?: Parameters<Floating['compute']>[2]
			  ]
	) {
		if (rest[0] instanceof Element || rest[0] === null) {
			const _arrow = rest[0]
				? arrow({ padding: this.options.arrow?.padding, element: rest[0] })
				: false;
			const middleware = rest[1] || [];
			middleware.push(_arrow);
			super.compute(reference, floating, middleware);
		} else {
			super.compute(reference, floating, rest[0]);
		}
	}

	start(
		...[reference, floating, ...rest]:
			| Parameters<Floating['start']>
			| [
					reference: Parameters<Floating['start']>[0],
					floating: Parameters<Floating['start']>[1],
					arrow: Element | null,
					middleware?: Parameters<Floating['start']>[2]
			  ]
	) {
		if (rest[0] instanceof Element || rest[0] === null) {
			const _arrow = rest[0]
				? arrow({ padding: this.options.arrow?.padding, element: rest[0] })
				: false;
			const middleware = rest[1] || [];
			middleware.push(_arrow);
			super.start(reference, floating, middleware);
		} else {
			super.start(reference, floating, rest[0]);
		}
	}

	getArrowAttributes(options?: T['arrow']) {
		const _this = this;
		if (options) {
			this.options.arrow = options;
		}
		return {
			get 'data-floating-placement'() {
				return _this.computed?.placement;
			},
			get style() {
				const left = _this.computed?.middlewareData.arrow?.x
					? _this.computed?.middlewareData.arrow?.x + 'px'
					: '';
				const top = _this.computed?.middlewareData.arrow?.y
					? _this.computed?.middlewareData.arrow?.y + 'px'
					: '';
				return `position: absolute; left: ${left}; top: ${top};`;
			}
		} satisfies HTMLAttributes<HTMLElement>;
	}
}
