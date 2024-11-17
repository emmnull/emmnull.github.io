import { getContext, setContext } from 'svelte';

/**
 * Define adequately typed and corresponding context setter and getter.
 */
export function defineContext<T>(key: unknown) {
	function set(context: T) {
		return setContext<T>(key, context);
	}
	function get<R extends boolean>(required?: R): R extends true ? T : T | undefined {
		const ctx = getContext<T>(key);
		if (!ctx && required) {
			throw Error(`No context found for required context (key: ${key}).`);
		}
		return getContext<T>(key);
	}
	return [get, set] as const as [getter: typeof get, setter: typeof set];
}
