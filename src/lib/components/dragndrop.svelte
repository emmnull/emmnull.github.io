<script lang="ts" module>
  import { browser } from '$app/environment';

  export function swap() {}

  export class Dragndrop<
    I extends string | number | symbol,
    Z extends string | number | symbol,
  > {
    #start = $state<{ x: number; y: number }>();
    #current = $state<{ x: number; y: number }>();
    #d = $derived(
      this.#start && this.#current
        ? {
            x: this.#current.x - this.#start.x,
            y: this.#current.y - this.#start.y,
          }
        : { x: 0, y: 0 },
    );
    #options;
    #zone = $state<Z>();
    #subscribe;
    zones = new SvelteMap<Z, Set<I>>();
    selection = new SvelteSet<I>();

    constructor(options: {
      items: I[];
      zones: Z[];
      multiple?: boolean;
      // motion?: Tween<{ x: 0; y: 0 }> | Spring<{ x: 0; y: 0 }>;
    }) {
      this.#options = options;
      for (const zone of options.zones) {
        this.zones.set(zone, new SvelteSet());
      }
      let off = browser && this.#container(document.documentElement);
      this.#subscribe = createSubscriber(() => {
        off && off();
        return () => {
          off = this.#container(document.documentElement);
        };
      });
      onMount(() => {
        return off;
      });
    }

    get items() {
      return this.#options.items;
    }

    #container(node: HTMLElement) {
      const offpointerdown = on(node, 'pointerdown', (e) => {
        if (e.defaultPrevented) return;
        this.selection.clear();
      });
      const offpointerup = on(node, 'pointerup', (e) => {
        if (e.defaultPrevented) return;
        this.#current = undefined;
        this.#start = undefined;
      });
      const offpointermove = on(node, 'pointermove', (e) => {
        if (!this.#start) return;
        if (!this.#current) {
          this.#current = { x: e.pageX, y: e.pageY };
          return;
        }
        this.#current.x = e.pageX;
        this.#current.y = e.pageY;
      });
      const offpointerleave = on(node, 'pointerleave', (e) => {
        if (this.#start && this.#current) {
          Object.assign(this.#current, this.#start);
          tick().then(() => {
            this.#current = undefined;
            this.#start = undefined;
          });
        }
      });
      const offpointercancel = on(node, 'pointercancel', (e) => {
        if (this.#start && this.#current) {
          Object.assign(this.#current, this.#start);
          tick().then(() => {
            this.#current = undefined;
            this.#start = undefined;
          });
        }
      });
      return () => {
        offpointerdown();
        offpointerup();
        offpointermove();
        offpointerleave();
        offpointercancel();
      };
    }

    getContainerAttributes() {
      this.#subscribe();
      return {
        [createAttachmentKey()]: this.#container,
      } satisfies HTMLAttributes<HTMLElement>;
    }

    getZoneAttributes(id: Z) {
      return {
        onpointerenter: (e) => {
          if (this.#start) {
            this.#zone = id;
          }
        },
        onpointerleave: (e) => {
          if (this.#start && this.#zone === id) {
            this.#zone = undefined;
          }
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    getItemAttributes(id: I) {
      return {
        [createAttachmentKey()]: (node) => {
          if (this.#start) return;
          console.log('stopping', id);
          node.style.left = `${node.offsetLeft + this.#d.x}px`;
          node.style.top = `${node.offsetTop + this.#d.y}px`;
          node.style.translate = '';
        },
        [createAttachmentKey()]: (node) => {
          if (!this.selection.has(id) || !this.#start) return;
          node.style.translate = `${this.#d.x}px ${this.#d.y}px`;
        },
        onpointerdown: (e) => {
          if (e.defaultPrevented) return;
          e.stopPropagation();
          if (!this.#options.multiple || !e.shiftKey) this.selection.clear();
          this.selection.add(id);
          this.#start = { x: e.pageX, y: e.pageY };
        },
        'data-dropzone': this.selection.has(id) ? this.#zone : undefined,
        'aria-grabbed': this.selection.has(id) || undefined,
        'aria-pressed': this.selection.has(id) || undefined,
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }
</script>

<script
  lang="ts"
  generics="I extends string | number | symbol, Z extends string | number | symbol"
>
  import { onMount, tick, type Snippet } from 'svelte';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import { on } from 'svelte/events';
  import { createSubscriber, SvelteMap, SvelteSet } from 'svelte/reactivity';

  let {
    children,
    ...options
  }: {
    children: Snippet<[InstanceType<typeof Dragndrop<I, Z>>]>;
  } & ConstructorParameters<typeof Dragndrop<I, Z>>[0] = $props();

  const dragndrop = new Dragndrop(options);
</script>

{@render children(dragndrop)}
