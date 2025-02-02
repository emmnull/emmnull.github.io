/**
 * Reworked based on melt-ui/next-gen's `Synced` class implementation.
 *
 * Credit: Thomas G. Lopes.
 */
export class Bound<T> {
  static #isFunction<V>(maybeFunction: V | (() => V)): maybeFunction is () => V {
    return typeof maybeFunction === 'function';
  }

  #internal = $state() as T;
  #fallback;
  #get;
  #set;

  constructor({
    get,
    set,
    fallback,
  }:
    | {
        get: Exclude<T, undefined> | (() => Exclude<T, undefined>);
        set?(value: T): void;
        fallback?: never;
      }
    | {
        get: undefined | T | (() => undefined | T);
        set?(value: T): void;
        fallback: T;
      }) {
    this.#get = get;
    this.#set = set;
    this.#fallback = fallback;
    const init = Bound.#isFunction(get) ? get() : get;
    this.#internal = (init ?? fallback ?? init) as T;
  }

  get value() {
    if (Bound.#isFunction(this.#get)) {
      return this.#get() ?? this.#fallback ?? this.#internal;
    }
    return this.#internal;
  }

  set value(value) {
    this.#set?.(value);
    if (Bound.#isFunction(this.#get)) {
      return;
    }
    this.#internal = value;
  }
}
