<script lang="ts" module>
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';

  export class Sidescroller {
    #options;
    #subscribe;
    #containerTop = $state(0);
    #contentScroll = $state(0);
    #contentHeight = $state(0);
    #contentTop = $state(0);

    constructor(options: { root?: Element } = {}) {
      this.#options = options;
      this.#subscribe = createSubscriber((update) => {
        const unscroll = on(
          this.#root,
          'scroll',
          (e) => {
            if (e.target !== this.#root) {
              return;
            }
            update();
          },
          { passive: true },
        );
        return () => {
          unscroll();
        };
      });
    }

    get #root() {
      return this.#options.root ?? document;
    }

    get #rootScroll() {
      this.#subscribe();
      return this.#root instanceof Document
        ? window.scrollY
        : this.#root.scrollTop;
    }

    /**
     * Make sure you set the appropriate styles yourself:
     *
     * ```css
     * container {
     * 	overflow: hidden;
     * }
     * ```
     *
     * ```html
     *
     * | > <container>
     * |     <content>
     * |       your content
     * |     </content>
     * | > </container>
     * ```
     */
    containerAttributes() {
      return {
        [createAttachmentKey()]: (node) => {
          const observer = new IntersectionObserver(
            ([entry]) => {
              const rootTop =
                this.#root instanceof Document
                  ? untrack(() => -this.#rootScroll)
                  : this.#root.getBoundingClientRect().top;
              this.#containerTop = entry.boundingClientRect.top - rootTop;
            },
            { root: this.#root },
          );
          observer.observe(node);
          return () => {
            observer.disconnect();
          };
        },
        [createAttachmentKey()]: (node) => {
          Object.assign(node.style, {
            height:
              this.#contentScroll +
              this.#contentHeight +
              this.#contentTop +
              'px',
          });
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }

    /**
     * Make sure you set the appropriate styles yourself:
     *
     * ```css
     * content {
     * 	overflow: hidden;
     * 	position: sticky;
     * 	top: 0;
     * 	display: flex;
     * 	flex-diretion: row;
     * }
     * ```
     *
     * ```html
     *
     * |   <container>
     * | >   <content>
     * |       your content
     * | >   </content>
     * |   </container>
     * ```
     */
    contentAttributes() {
      return {
        [createAttachmentKey()]: (node) => {
          Object.assign(node.style, {
            position: 'sticky',
            overflowX: 'hidden',
            display: 'flex',
          });
          const observer = new ResizeObserver(([entry]) => {
            const styles = getComputedStyle(node);
            this.#contentScroll =
              entry.target.scrollWidth - entry.target.clientWidth;
            this.#contentHeight = entry.contentRect.height;
            this.#contentTop = parseFloat(styles.top);
          });
          observer.observe(node);
          return () => {
            observer.disconnect();
          };
        },
        [createAttachmentKey()]: (node) => {
          node.scrollTo({
            left: Math.max(
              0,
              Math.min(
                this.#rootScroll - this.#containerTop + this.#contentTop,
                this.#contentScroll,
              ),
            ),
          });
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }
</script>

<script
  lang="ts"
  generics="T extends ConstructorParameters<typeof Sidescroller>[0]"
>
  import { untrack, type Snippet } from 'svelte';
  import { on } from 'svelte/events';
  import { createSubscriber } from 'svelte/reactivity';

  let { children, ...options }: { children: Snippet<[Sidescroller]> } & T =
    $props();

  const scroller = new Sidescroller(options);
</script>

{@render children(scroller)}
