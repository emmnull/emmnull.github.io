import { calc, multiply } from '$lib/common/css';
import {
  type AlignedPlacement,
  type ArrowOptions,
  type Axis,
  type Middleware,
  type Placement,
  arrow as arrowMiddleware,
} from '@floating-ui/dom';

const PLACEMENT_AXES = {
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

const PLACEMENT_MODS = {
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

const PLACEMENT_TRANSFORM_ORIGINS = {
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

const PLACEMENT_ARROW_ROTATIONS = {
  top: 0,
  bottom: 180,
  left: -90,
  right: 90,
} as const;

// data-[floating-placement="bottom"]:bottom-full
// data-[floating-placement="bottom"]:rotate-180
// data-[floating-placement="left"]:left-full
// data-[floating-placement="left"]:-rotate-90
// data-[floating-placement="right"]:right-full
// data-[floating-placement="right"]:rotate-90
// data-[floating-placement="top"]:top-full

export type UnalignedPlacement = Exclude<Placement, AlignedPlacement>;

export function getUnalignedPlacement(placement: Placement) {
  return placement.split('-')[0] as UnalignedPlacement;
}

/**
 * Transpose logical axes distances to actual axes based on a given placement.
 */
export function getAxialDistances(
  placement: Placement,
  distances: { cross?: string | number; main?: string | number },
) {
  const unaligned = getUnalignedPlacement(placement);
  return {
    [PLACEMENT_AXES.main[unaligned]]:
      distances.main && calc(multiply(PLACEMENT_MODS.main[unaligned], distances.main)),
    [PLACEMENT_AXES.cross[unaligned]]:
      distances.cross && calc(multiply(PLACEMENT_MODS.cross[unaligned], distances.cross)),
  } as Record<Axis, string | undefined | number>;
}

/**
 * Middleware to apply placement-based transform-origin.
 *
 * @todo Set transformOrigin with negative offset (`calc(percentage + offset)`) instead of keywords.
 */
export function transformOrigin() {
  return {
    name: 'transformOrigin',
    fn: ({ elements, placement }) => {
      Object.assign(elements.floating.style, {
        transformOrigin: PLACEMENT_TRANSFORM_ORIGINS[placement],
      });
      return {};
    },
  } satisfies Middleware;
}

export function arrow({
  element,
  angleOffset = 0,
  ...options
}: ArrowOptions & { angleOffset?: number }) {
  if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
    return null;
  }
  return {
    name: 'arrow2',
    async fn(state) {
      const res = await arrowMiddleware({ element, ...options }).fn(state);
      const unaligned = getUnalignedPlacement(state.placement);
      Object.assign(element.style, {
        position: 'absolute',
        left: res.data?.x != null ? `${res.data?.x}px` : '',
        top: res.data?.y != null ? `${res.data?.y}px` : '',
        [unaligned]: '100%',
        rotate: `${PLACEMENT_ARROW_ROTATIONS[unaligned] + angleOffset}deg`,
      });
      return res;
    },
  } satisfies Middleware;
}
