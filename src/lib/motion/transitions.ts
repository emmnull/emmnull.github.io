import { expoOut } from 'svelte/easing';
import type { EasingFunction } from 'svelte/transition';

/**
 * Custom transition similar to fly or scale, but with possibilities of combining transforms.
 */
export function transform(
  element: Element,
  {
    delay = 0,
    duration = 250,
    easing = expoOut,
    opacity = 0,
    scale = 1,
    translate = 0,
    rotate = 0,
  }: {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
    opacity?: number;
    scale?: number | string | { x?: number | string; y?: number | string };
    translate?: number | string | { x?: number | string; y?: number | string; z?: number | string };
    rotate?: number | string | { x?: number | string; y?: number | string; z?: number | string };
  } = {},
) {
  const style = getComputedStyle(element);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;
  const od = target_opacity * (1 - opacity);
  const si = d(scale);
  const sd = si.map((s) => 1 - s);
  // if (sd.length === 1) {
  // 	sd.push(sd[0]);
  // }
  const ti = d(translate);
  const td = ti.map((tr) => 0 - tr);
  const ri = d(rotate);
  const rd = ri.map((r) => 0 - r);

  return {
    delay,
    duration,
    easing,
    css: (t, u) => {
      const ns = `scale(${tr(sd[0], u, 1)}${sd[1] == null ? '' : `,${tr(sd[1], u, 1)}`})`;
      // prettier-ignore
      const nr = `rotateX(${tr(rd[0], u)}deg) rotateY(${tr(rd[1], u)}deg) rotateZ(${tr(rd[2], u)}deg)`;
      return `
			opacity: ${target_opacity - od * u};
			transform: ${transform} ${ns} ${nr};
			translate: ${tr(td[0], u)}px,${tr(td[1], u)}px,${tr(td[2], u)}px;
		`;
    },
  } satisfies SvelteTransitionReturnType;
}
