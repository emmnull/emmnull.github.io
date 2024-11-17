const locks = new Map<HTMLElement | string, Set<ScrollLock>>();

export class ScrollLock {
	#element = $state<HTMLElement | string>(document.documentElement);
	#active = $state(false);

	constructor(element: HTMLElement | string, active?: boolean) {
		this.#element = element;
		if (active) this.active = true;

		$effect.root(() => {
			return () => {
				this.active = false;
			};
		});
	}

	get element() {
		if (this.#element instanceof HTMLElement) {
			return this.#element;
		}
		const ref = document.querySelector(this.#element);
		if (ref instanceof HTMLElement) {
			return ref;
		}
	}

	get active() {
		return this.#active;
	}

	set active(value) {
		if (value === this.#active) return;
		this.#active = value;
		const existing = locks.get(this.#element);
		if (value) {
			if (existing) {
				existing.add(this);
			} else {
				locks.set(this.#element, new Set([this]));
				this.element?.setAttribute('data-scroll-lock', 'true');
			}
		} else {
			if (existing) {
				if (existing.has(this)) {
					existing.delete(this);
				}
				if (!existing.size) {
					this.element?.removeAttribute('data-scroll-lock');
					locks.delete(this.#element);
				}
			}
		}
	}
}
