<script module lang="ts">
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import { on } from 'svelte/events';

  class Ripple {
    #context;
    #x;
    #y;
    #d;
    #done = $state(false);
    #abort = $state(false);
    #outside = $state(false);
    #animations = 0;
    #bindings: (() => void)[] = [];

    constructor(host: HTMLElement, event: PointerEvent, context: Ripples) {
      this.#context = context;
      // Using bounding client rect, even if a bit more expensive, to account for
      // child element event targets that steal the offsetX and offsetY value referentials.
      const rect = host.getBoundingClientRect();
      this.#x = event.clientX - rect.left;
      this.#y = event.clientY - rect.top;
      const rx = Math.max(this.#x, rect.right - event.clientX);
      const ry = Math.max(this.#y, rect.bottom - event.clientY);
      this.#d = 2 * Math.hypot(rx, ry);

      this.#bindings.push(
        on(document, 'pointerup', this.#end.bind(this)),
        on(document, 'pointercancel', this.#end.bind(this)),
        on(host, 'pointerenter', this.#enter.bind(this)),
        on(host, 'pointerleave', this.#leave.bind(this)),
      );
    }

    #enter(e: PointerEvent) {
      this.#outside = false;
      return e;
    }

    #leave(e: PointerEvent) {
      this.#outside = true;
      return e;
    }

    #end(e: PointerEvent) {
      this.#cleanup();
      this.#done = true;
      if (e.type === 'pointercancel' || this.#outside) {
        this.#abort = true;
      }
    }

    #destroy() {
      this.#cleanup();
      this.#context.ripples.splice(this.#context.ripples.indexOf(this), 1);
    }

    #cleanup() {
      for (const unbind of this.#bindings) {
        unbind();
      }
    }

    rippleAttributes() {
      return {
        [Ripples.attributes.ripple]: '',
        [Ripples.attributes.abort]: this.#abort || undefined,
        [Ripples.attributes.hide]: this.#outside || undefined,
        [Ripples.attributes.hold]: !this.#done || undefined,
        style:
          `--ripple-x: ${Math.round(this.#x)};` +
          `--ripple-y: ${Math.round(this.#y)};` +
          `--ripple-d: ${Math.ceil(this.#d)};`,
        onanimationendcapture: (e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          this.#animations++;
          // track 2 animations (spread and outro)
          if (this.#animations >= 2) {
            this.#destroy();
          }
        },
        [createAttachmentKey()]: () => {
          return () => {
            this.#cleanup();
          };
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }

  class Ripples {
    static readonly attributes = {
      host: 'data-ripple-host',
      container: 'data-ripple-container',
      ripple: 'data-ripple',
      abort: 'data-ripple-abort',
      hold: 'data-ripple-hold',
      hide: 'data-ripple-hide',
    } as const;

    ripples = $state<Ripple[]>([]);

    containerAttributes() {
      return {
        [Ripples.attributes.container]: '',
        [createAttachmentKey()]: (node) => {
          const host = node.parentElement;
          if (!host) {
            return;
          }
          host.setAttribute(Ripples.attributes.host, '');
          const unpointerdown = on(host, 'pointerdown', (e) => {
            // Catching only the directly descending events,
            // prevents conflict between nested ripple triggers.
            if (
              e.target instanceof Element &&
              e.target.closest(`[${Ripples.attributes.host}]`) ===
                e.currentTarget
            ) {
              this.ripples.push(new Ripple(host, e, this));
            }
          });
          return () => {
            unpointerdown();
            host.removeAttribute(Ripples.attributes.host);
          };
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }
</script>

<script lang="ts">
  const ripples = new Ripples();
</script>

<div {...ripples.containerAttributes()}>
  {#each ripples.ripples as wave (wave)}
    <div {...wave.rippleAttributes()}></div>
  {/each}
</div>

<style>
  [data-ripple-container] {
    --ripple-spread-easing: cubic-bezier(0, 0, 0, 1);
    --ripple-outro-easing: cubic-bezier(0, 0, 0.5, 1);
    /* container-type: size;
    container-name: ripples; */
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    border-radius: inherit;
  }

  [data-ripple] {
    --ripple-d: ;
    --ripple-x: ;
    --ripple-y: ;
    --ripple-outro-duration: 1s;
    --ripple-spread-duration: calc(150ms + var(--ripple-d) * 0.25ms);
    width: 0;
    left: calc(1px * var(--ripple-x));
    top: calc(1px * var(--ripple-y));
    position: absolute;
    aspect-ratio: 1;
    translate: -50% -50%;
    border-radius: calc(infinity * 1px);
    opacity: 25%;
    background: radial-gradient(
      circle at center,
      transparent -25%,
      currentColor 100%
    );
    filter: blur(6px);
    transition: opacity calc(var(--ripple-outro-duration) * 0.25)
      var(--ripple-outro-easing);
    animation:
      var(--ripple-spread-duration) var(--ripple-spread-easing) 0s 1 forwards
        ripple-spread,
      var(--ripple-outro-duration) var(--ripple-outro-easing)
        var(--ripple-spread-duration) 1 forwards ripple-outro;
  }

  [data-ripple-abort] {
    animation-delay: 0s;
  }

  [data-ripple-hide] {
    transition: opacity var(--ripple-outro-duration) var(--ripple-outro-easing);
    opacity: 0;
  }

  [data-ripple-hold] {
    animation-play-state: running, paused;
  }

  @keyframes ripple-outro {
    to {
      opacity: 0;
    }
  }

  @keyframes ripple-spread {
    to {
      width: calc(1px * var(--ripple-d));
    }
  }
</style>
