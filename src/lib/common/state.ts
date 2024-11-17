/**
 * Type signature for params expecting a deconstructed state.
 */
export type StateGetterSetter<T> = {
	get: () => T;
	set: (value: T) => void;
};

export type StateOrValue<T> = T | StateGetterSetter<T>;
