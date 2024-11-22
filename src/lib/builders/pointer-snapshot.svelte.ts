export class PointerSnapshot<T = void> {
	#saved: { pointer: { x: number; y: number }; data: T } | undefined;

	constructor() {}

	save(e: PointerEvent, data: T) {
		this.#saved = { pointer: { x: e.clientX, y: e.clientY }, data };
	}

	clear(e: PointerEvent) {
		this.#saved = undefined;
	}
}
