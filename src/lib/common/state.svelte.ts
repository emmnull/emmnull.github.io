import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';

/**
 * Credits to Rich Harris.
 *
 * @see https://github.com/sveltejs/svelte.dev/blob/d160b1930312713d4c8c405b35d1d6278f269403/packages/site-kit/src/lib/state/Persisted.svelte.ts
 */
export class Persisted<T> {
  #key: string;
  #storage: Storage | undefined;
  #fallback: T;
  #serialize;
  #deserialize;
  #version = $state(0);
  #subscribe = createSubscriber((update) => {
    return on(window, 'storage', (e) => {
      if (e.key === this.#key) {
        update();
      }
    });
  });

  constructor(
    key: string,
    fallback: T,
    {
      storage = typeof localStorage === 'undefined' ? undefined : localStorage,
      serialize,
      deserialize,
    }: {
      storage?: Storage;
    } & (T extends string
      ? {
          serialize: (input: T) => string;
          deserialize: (stored: string) => T;
        }
      : {
          serialize?: never;
          deserialize?: never;
        }) = {} as never,
  ) {
    this.#key = key;
    this.#fallback = fallback;
    this.#storage = storage;
    this.#serialize = serialize;
    this.#deserialize = deserialize;
  }

  get current() {
    this.#subscribe(); // handle cross-tab updates
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.#version; // handle same-tab updates
    const stored = this.#storage?.getItem(this.#key);
    if (!stored) {
      return this.#fallback;
    }
    return this.#deserialize ? this.#deserialize(stored) : (stored as T);
  }

  set current(value: T) {
    this.#storage?.setItem(this.#key, this.#serialize ? this.#serialize(value) : (value as string));
    this.#version += 1;
  }
}

export class Hystorized<T> {}
