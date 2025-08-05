<!--
  @component
	Headless component to wrap inline instantiation of Floating rigs
	managing computations, element references, and bindings.
-->
<script lang="ts" module>
  import {
    type AlignedPlacement,
    type ArrowOptions,
    type Axis,
    type ComputePositionConfig,
    type ComputePositionReturn,
    type Middleware,
    type Placement,
    arrow as arrowMiddleware,
    autoUpdate,
    computePosition,
  } from '@floating-ui/dom';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';

  const axes = {
    main: {
      top: 'y',
      bottom: 'y',
      left: 'x',
      right: 'x',
    },
    cross: {
      top: 'x',
      bottom: 'x',
      left: 'y',
      right: 'y',
    },
  } as const;

  const mods = {
    main: {
      top: 1,
      bottom: -1,
      left: 1,
      right: -1,
    },
    cross: {
      top: 1,
      bottom: -1,
      left: 1,
      right: -1,
    },
  } as const;

  const transform_origins = {
    top: 'bottom center',
    'top-start': 'bottom left',
    'top-end': 'bottom right',
    bottom: 'top center',
    'bottom-start': 'top left',
    'bottom-end': 'top right',
    left: 'center center',
    'left-start': 'top left',
    'left-end': 'bottom left',
    right: 'center center',
    'right-start': 'top right',
    'right-end': 'bottom right',
  } as const;

  const arrow_rotations = {
    top: 0,
    bottom: 180,
    left: -90,
    right: 90,
  } as const;

  export type UnalignedPlacement = Exclude<Placement, AlignedPlacement>;
  export function getUnalignedPlacement(placement: Placement) {
    return placement.split('-')[0] as UnalignedPlacement;
  }

  /** Transpose logical axes distances to actual axes based on a given placement. */
  export function getAxialDistances(
    placement: Placement,
    distances: { cross?: string | number; main?: string | number },
  ) {
    const unaligned = getUnalignedPlacement(placement);
    return {
      [axes.main[unaligned]]:
        distances.main && calc(multiply(mods.main[unaligned], distances.main)),
      [axes.cross[unaligned]]:
        distances.cross &&
        calc(multiply(mods.cross[unaligned], distances.cross)),
    } as Record<Axis, string | undefined | number>;
  }

  /**
   * Middleware to apply placement-based transform-origin.
   *
   * @todo Set transformOrigin with negative offset (`calc(percentage +
   *   offset)`) instead of keywords.
   */
  export function transformOrigin() {
    return {
      name: 'transformOrigin',
      fn: ({ elements, placement }) => {
        Object.assign(elements.floating.style, {
          transformOrigin: transform_origins[placement],
        });
        return {};
      },
    } satisfies Middleware;
  }

  export class Floating<T extends Partial<ComputePositionConfig>> {
    static readonly attributes = {
      reference: 'data-floating-reference',
      floating: 'data-floating',
      arrow: 'data-floating-arrow',
      placement: 'data-floating-placement',
    } as const;

    static arrow({
      angleOffset = 0,
      ...options
    }: Omit<ArrowOptions, 'element'> & { angleOffset?: number }) {
      if (!this.prototype.#arrowElement) {
        return null;
      }
      const element = this.prototype.#arrowElement;
      return {
        name: 'arrowPosition',
        async fn(state) {
          const res = await arrowMiddleware({ ...options, element }).fn(state);
          const unaligned = getUnalignedPlacement(state.placement);
          Object.assign(element.style, {
            position: 'absolute',
            left: res.data?.x != null ? `${res.data?.x}px` : '',
            top: res.data?.y != null ? `${res.data?.y}px` : '',
            [unaligned]: '100%',
            rotate: `${arrow_rotations[unaligned] + angleOffset}deg`,
          });
          return res;
        },
      } satisfies Middleware;
    }

    active;
    #options;
    #referenceElement: HTMLElement | undefined;
    #arrowElement: HTMLElement | SVGSVGElement | undefined;
    #computed: ComputePositionReturn | undefined;

    constructor({ active, ...options }: { active?: boolean } & T = {} as T) {
      this.active = $state(active ?? false);
      this.#options = options;
    }

    get computed() {
      return this.#computed;
    }

    get options() {
      return this.#options;
    }

    getReferenceAttributes() {
      return {
        [Floating.attributes.reference]: '',
        [createAttachmentKey()]: (node) => {
          if (this.#referenceElement) {
            console.warn(
              'Floating: Reference element already set, will overwrite with new.',
            );
          }
          this.#referenceElement = node;
          return () => {
            this.#referenceElement = undefined;
          };
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    getFloatingAttributes() {
      let cleanup: ReturnType<typeof autoUpdate> | undefined;
      return {
        [Floating.attributes.floating]: '',
        [createAttachmentKey()]: (node) => {
          if (this.active) {
            if (!this.#referenceElement) {
              console.error('Floating: No reference element found.');
              return;
            }
            const ref = this.#referenceElement;
            cleanup = autoUpdate(ref, node, () => {
              computePosition(ref, node, this.options).then((computed) => {
                this.#computed = computed;
                Object.assign(node.style, {
                  position: computed.strategy,
                  left: `${computed.x}px`,
                  top: `${computed.y}px`,
                });
              });
            });
          } else {
            cleanup?.();
          }
          return () => {
            cleanup?.();
          };
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    getArrowAttributes() {
      return {
        [Floating.attributes.arrow]: '',
        [createAttachmentKey()]: (node) => {
          this.#arrowElement = node;
          // this.#computed?.middlewareData.arrow;
          // 			Object.assign(node.style, {
          //   left: x != null ? `${x}px` : '',
          //   top: y != null ? `${y}px` : '',
          // });
          return () => {
            this.#arrowElement = undefined;
          };
        },
      } satisfies HTMLAttributes<HTMLElement | SVGSVGElement>;
    }
  }
</script>

<script
  lang="ts"
  generics="T extends ConstructorParameters<typeof Floating>[0]"
>
  import { calc, multiply } from '$lib/common/css';
  import type { Snippet } from 'svelte';

  let {
    children,
    ...options
  }: {
    children: Snippet<[InstanceType<typeof Floating>]>;
  } & T = $props();

  export const floating = new Floating(options);
</script>

{@render children(floating)}
