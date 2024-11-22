import type { HTMLInputAttributes } from 'svelte/elements';

export class Color {
	static fromString(source: string) {}

	#options = $state() as ConstructorParameters<typeof Color>[0];

	constructor(options: { name: string }) {
		this.#options = options;
	}

	getNameInputAttributes() {
		const _this = this;
		return {
			get value() {
				return _this.#options?.name;
			},
			oninput(e) {
				_this.#options.name = e.currentTarget.value;
			}
		} satisfies HTMLInputAttributes;
	}

	getColorInputAttributes() {}
}
