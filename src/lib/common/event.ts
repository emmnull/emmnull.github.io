import { on } from 'svelte/events';
import type { Key, KeyModifier } from './constants';

export function isKeyCombo(
	e: KeyboardEvent,
	{
		key,
		ctrl = false,
		alt = false,
		shift = false,
		meta = false
	}: {
		key: Exclude<Key, KeyModifier>;
		ctrl?: boolean;
		alt?: boolean;
		shift?: boolean;
		meta?: boolean;
	}
) {
	return (
		e.key === key &&
		e.shiftKey === shift &&
		e.altKey === alt &&
		e.ctrlKey === ctrl &&
		e.metaKey === meta
	);
}

export type KeyCombo = Parameters<typeof isKeyCombo>[1];

export type UnbindHandler = ReturnType<typeof on>;

export function unbindAll(unbinds: UnbindHandler[]) {
	for (const unbind of unbinds) {
		unbind();
	}
}
