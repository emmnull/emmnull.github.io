export class History<T> {
	#maxSize;
	#initial;
	#current = $state<T>() as T;
	#previous = $state<T[]>([]);
	#next = $state<T[]>([]);

	constructor(value: T, { maxSize = 10 }: { maxSize?: number } = {}) {
		this.#maxSize = maxSize;
		this.#initial = value;
		this.#current = value;
	}

	get initial() {
		return this.#initial;
	}

	get current() {
		return this.#current;
	}

	set current(value: T) {
		this.#previous.unshift(this.#current);
		if (this.#previous.length > this.#maxSize) {
			this.#previous.pop();
		}
		this.#current = value;
	}

	// undo() {
	// 	if (this.#previous.length > 0 && this.#current !== undefined) {
	// 		this.#next.unshift(this.#current);
	// 		this.#current = this.#previous.shift()!;
	// 	}
	// }

	// redo() {
	// 	if (this.#next.length > 0 && this.#current !== undefined) {
	// 		this.#previous.unshift(this.#current);
	// 		this.#current = this.#next.shift()!;
	// 	}
	// }
}
