import { browser } from '$app/environment';
import type { OmitIndexSignature } from 'type-fest';
import { isNumeric } from './number';

/**
 * Based on `svelte/transition`'s internal `split_css_unit`
 *
 * @see https://github.com/sveltejs/svelte/blob/4ec9986cba11d4635155e90c87c7ac5e6503a6c1/packages/svelte/src/transition/index.js#L22
 */
export function splitUnit(value: string | number) {
  const split = typeof value === 'string' && /^\s*(-?[\d.]+)([^\s+\-*/]*)\s*$/.exec(value);
  return split ? ([parseFloat(split[1]), split[2] || ''] as const) : ([value, ''] as const);
}

/**
 * Fallback format a given size input as pixels **if numeric**.
 */
export function px(size: string | number) {
  if (!isNumeric(size)) {
    return size;
  }
  return size + 'px';
}

export function deg(angle: string | number) {
  if (!isNumeric(angle)) {
    return angle;
  }
  return angle + 'deg';
}

/**
 * Transpose and format a given size value as rem **if numeric** and in browser. Size will be
 * computed as css-valid `rem` value if in browser, else in `px`.
 */
export function rem(size: string | number) {
  if (!isNumeric(size)) {
    return size;
  }
  if (!browser) {
    return size + 'px';
  }
  return size / parseFloat(getComputedStyle(document.documentElement).fontSize) + 'rem';
}

/**
 * Fallback format a given size input as pixels **if numeric**.
 */
export function em(size: string | number) {
  if (!isNumeric(size)) {
    return size;
  }
  return size + 'em';
}

/**
 * Fallback format a given duration input as miliseconds **if numeric**.
 */
export function ms(duration: string | number) {
  if (!isNumeric(duration)) {
    return duration;
  }
  return duration + 'ms';
}

/**
 * Format given value as css calc() function if necessary. Also removes nested calcs as only
 * parentheses is needed within the outer function.
 */
export function calc(value: string | number) {
  const [v, _u] = splitUnit(value);
  if (isNumeric(v)) {
    return value;
  }
  return `calc(${String(value).replaceAll('calc', '')})`;
}

function op(evaluate: (left: number, right: number) => number, operator: '+' | '-' | '*' | '/') {
  return function operation(...[init, ...values]: (string | number)[]) {
    return values.reduce((acc, curr) => {
      if (isNumeric(curr) && isNumeric(acc)) {
        return evaluate(acc, curr);
      }
      const [av, au] = splitUnit(acc);
      const [cv, cu] = splitUnit(curr);
      const anum = isNumeric(av);
      const cnum = isNumeric(cv);
      if (anum && cnum && (au === cu || !au || !cu)) {
        // Single unit
        return `${evaluate(av, cv)}${au || cu}`;
      }
      return `${acc} ${operator} ${curr}`;
    }, init);
  };
}

/**
 * Format given values as a css addition. Resolve if possible.
 */
export const add = op((left, right) => left + right, '+');

/**
 * Format given values as a css subtraction. Resolve if possible.
 */
export const subtract = op((left, right) => left - right, '-');

/**
 * Format given values as a css multiplication. Resolve if possible.
 */
export const multiply = op((left, right) => left * right, '*');

/**
 * Format given values as a css division. Resolve if possible.
 */
export const divide = op((left, right) => left / right, '/');

/**
 * Style string from object.
 */
export function style(
  style: Partial<
    Record<
      | `--${string}`
      | Exclude<
          OmitIndexSignature<keyof CSSStyleDeclaration>,
          | number
          | typeof Symbol.iterator
          | 'parentRule'
          | 'length'
          | 'getPropertyPriority'
          | 'getPropertyValue'
          | 'item'
          | 'removeProperty'
          | 'setProperty'
        >,
      string | number
    >
  >,
) {
  return (Object.keys(style) as (keyof typeof style)[])
    .map(
      (k) =>
        `${k.startsWith('--') ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}: ${style[k]}`,
    )
    .join(';');
}
