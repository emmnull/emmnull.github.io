import { History } from '$lib/builders/history.svelte';
import type { Cursor } from '$lib/common/constants';
import { isKeyCombo, type KeyCombo } from '$lib/common/event';
import { type ComponentType } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { on } from 'svelte/events';

const active = new History<Tool | undefined>(undefined);

export class Tool {
	#description;
	#name;
	#hotkey;
	#icon;
	#cursor;
	current = $derived.by(() => active?.current === this);

	constructor({
		icon,
		hotkey,
		name,
		description,
		cursor
	}: {
		icon: ComponentType;
		name: string;
		hotkey: KeyCombo;
		description?: string;
		cursor?: Cursor;
	}) {
		this.#icon = icon;
		this.#hotkey = hotkey;
		this.#name = name;
		this.#description = description;
		this.#cursor = cursor;

		$effect.root(() => {
			const unbindHotkey =
				this.#hotkey &&
				on(document, 'keydown', (e) => {
					if (e.defaultPrevented || !isKeyCombo(e, this.#hotkey)) {
						return e;
					}
					e.preventDefault();
					active.current = this;
				});
			return () => {
				unbindHotkey?.();
			};
		});
	}

	get name() {
		return this.#name;
	}

	get description() {
		return this.#description;
	}

	get icon() {
		return this.#icon;
	}

	get hotkey() {
		return this.#hotkey;
	}

	get cursor() {
		return this.#cursor;
	}

	getTriggerAttributes() {
		const _this = this;
		return {
			get 'aria-current'() {
				return _this.current || undefined;
			},
			onclick(e) {
				if (!e.defaultPrevented) {
					active.current = _this;
				}
			}
		} satisfies HTMLAttributes<HTMLButtonElement>;
	}
}
