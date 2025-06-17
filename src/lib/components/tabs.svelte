<script lang="ts" module>
  /**
   * Create tabs and track state of currently selected tab and its corresponding
   * pannel(s).
   */
  export class Tabs<T> {
    #options;
    #current: T | (() => T);

    constructor(options: { value: T | (() => T); forceVisible?: boolean }) {
      this.#options = options;
      this.#current = $state(options.value);
    }

    get current() {
      return this.#current.value;
    }

    set current(value) {
      this.#current.value = value;
    }

    get forceVisible() {
      return this.#options.forceVisible ?? true;
    }

    /** @returns Attributes for a tab trigger corresponding to a certain value. */
    triggerAttributes(value: T) {
      return {
        role: 'tab' as const,
        'aria-selected': value === this.current,
        onclick: () => {
          this.current = value;
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    /** @returns Attributes for the element hosting a tab's content. */
    contentAttributes(value: T) {
      return {
        role: 'tabpanel' as const,
        hidden: !this.forceVisible && value !== this.current,
        'aria-hidden': value !== this.current,
        'aria-expanded': value === this.current,
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }
</script>

<script lang="ts" generics="T">
  import { type Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
