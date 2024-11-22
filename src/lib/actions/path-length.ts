import type { ActionReturn } from 'svelte/action';

/**
 * Sets a `data-length` attribute on the path element and accepts a setter to allow for extracting
 * the value.
 */
export function pathLength(node: SVGPathElement, set?: (lenght: number) => void) {
	const lenght = node.getTotalLength();
	node.setAttribute('data-length', String(lenght));
	set?.(lenght);
	return {} satisfies ActionReturn;
}
