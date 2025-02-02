<script module lang="ts">
  import { attrSelector, isHTMLElement } from '$lib/builders/utils';
  import { randomId } from '$lib/common/string';
  import type { HTMLAttributes } from 'svelte/elements';
  import { on } from 'svelte/events';

  class Wave {
    #context;
    #x;
    #y;
    #d;
    #done = $state(false);
    #abort = $state(false);
    #outside = $state(false);
    #animations = 0;
    #bindings: (() => void)[] = [];

    constructor(host: HTMLElement, event: PointerEvent, context: Ripple) {
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

      $effect.root(() => {
        return () => {
          this.cleanup();
        };
      });
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
      this.cleanup();
      this.#done = true;
      if (e.type === 'pointercancel' || this.#outside) {
        this.#abort = true;
      }
    }

    #destroy() {
      this.cleanup();
      this.#context.waves.splice(this.#context.waves.indexOf(this), 1);
    }

    cleanup() {
      for (const unbind of this.#bindings) {
        unbind();
      }
    }

    getRootAttributes() {
      const spreadDuration =
        typeof this.#context.spreadDuration === 'function'
          ? this.#context.spreadDuration(this.#d)
          : this.#context.spreadDuration;
      const outroDuration =
        typeof this.#context.outroDuration === 'function'
          ? this.#context.outroDuration(this.#d)
          : this.#context.outroDuration;
      return {
        [Ripple.attr.wave]: '',
        [Ripple.attr.abort]: this.#abort || undefined,
        [Ripple.attr.hide]: this.#outside || undefined,
        [Ripple.attr.hold]: !this.#done || undefined,
        style:
          `${Ripple.cssvars.x}:${Math.round(this.#x)}px;` +
          `${Ripple.cssvars.y}:${Math.round(this.#y)}px;` +
          `${Ripple.cssvars.d}:${Math.ceil(this.#d)}px;` +
          `${Ripple.cssvars.spreadDuration}:${spreadDuration}${typeof spreadDuration === 'string' ? '' : 'ms'};` +
          `${Ripple.cssvars.outroDuration}:${outroDuration}${typeof outroDuration === 'string' ? '' : 'ms'};` +
          `left: ${this.#x}px;` +
          `top: ${this.#y}px;` +
          `position: absolute;` +
          `aspect-ratio: 1 / 1;` +
          `translate: -50% -50%;` +
          `border-radius: calc(infinity * 1px);`,
        onanimationendcapture: (e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          this.#animations++;
          // 2 animations (spread and outro)
          if (this.#animations >= 2) {
            this.#destroy();
          }
          console.log(e);
        },
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }

  export class Ripple {
    static attr = {
      host: 'data-ripple-host',
      root: 'data-ripple-root',
      wave: 'data-ripple-wave',
      abort: 'data-ripple-abort',
      hold: 'data-ripple-hold',
      hide: 'data-ripple-hide',
    } as const;

    static cssvars = {
      x: '--ripple-x',
      y: '--ripple-y',
      d: '--ripple-d',
      spreadDuration: '--ripple-spread-duration',
      outroDuration: '--ripple-outro-duration',
      spreadEasing: '--ripple-spread-easing',
      outroEasing: '--ripple-outro-easing',
    } as const;

    #id = randomId(8);
    #options;
    #waves = $state<Wave[]>([]);

    constructor(options: {
      spreadDuration?: string | number | ((diameter: number) => string | number);
      spreadEasing?: string;
      outroDuration?: string | number | ((diameter: number) => string | number);
      outroEasing?: string;
    }) {
      this.#options = options;
      $effect.root(() => {
        return () => {
          for (const wave of this.#waves) {
            wave.cleanup();
          }
        };
      });
    }

    get waves() {
      return this.#waves;
    }

    get spreadDuration() {
      return this.#options.spreadDuration ?? ((d) => 150 + d * 0.25);
    }

    get outroDuration() {
      return this.#options.outroDuration ?? 1000;
    }

    getRootAttributes() {
      $effect(() => {
        const rootEl = document.querySelector(attrSelector(Ripple.attr.root, this.#id));
        if (!isHTMLElement(rootEl)) {
          return;
        }
        const hostEl = rootEl.parentElement;
        if (!hostEl) {
          return;
        }
        hostEl.setAttribute(Ripple.attr.host, '');
        const unpointerdown = on(hostEl, 'pointerdown', (e) => {
          // Catching only the directly descending events, prevents conflict between nested ripple triggers.
          if (
            e.target instanceof Element &&
            e.target.closest(attrSelector(Ripple.attr.host)) === e.currentTarget
          ) {
            this.#waves.push(new Wave(hostEl, e, this));
          }
        });
        return () => {
          unpointerdown();
          hostEl.removeAttribute(Ripple.attr.host);
        };
      });
      const outroEasing = this.#options.outroEasing
        ? `${Ripple.cssvars.outroEasing}:${this.#options.outroEasing}`
        : '';
      const spreadEasing = this.#options.spreadEasing
        ? `${Ripple.cssvars.spreadEasing}:${this.#options.spreadEasing}`
        : '';
      return {
        [Ripple.attr.root]: this.#id,
        style:
          `pointer-events: none;` +
          `position: absolute;` +
          `top: 0;` +
          `left: 0;` +
          `bottom: 0;` +
          `right: 0;` +
          `overflow: hidden;` +
          `border-radius: inherit;` +
          outroEasing +
          spreadEasing,
      } satisfies HTMLAttributes<HTMLElement>;
    }
  }
</script>

<script lang="ts">
  let {
    class: className,
    ...rippleProps
  }: {
    class?: string;
  } & ConstructorParameters<typeof Ripple>[0] = $props();

  const ripple = new Ripple(rippleProps);
</script>

<div class={className} {...ripple.getRootAttributes()}>
  {#each ripple.waves as wave (wave)}
    <div {...wave.getRootAttributes()}></div>
  {/each}
</div>

<style>
  @layer components {
    [data-ripple-wave] {
      --ripple-spread-easing: cubic-bezier(0, 0, 0, 1);
      --ripple-outro-easing: cubic-bezier(0, 0, 0.5, 1);
      /* background: radial-gradient(
			circle at center,
			var(--ripple-color),
			transparent calc(1.25 * var(--ripple-d))
		); */
      width: 0;
      opacity: 25%;
      background: radial-gradient(circle at center, transparent -25%, currentColor 100%);
      filter: blur(6px);
      transition: opacity calc(var(--ripple-outro-duration) * 0.25) var(--ripple-outro-easing);
      animation:
        var(--ripple-spread-duration) var(--ripple-spread-easing) 0s 1 forwards ripple-spread,
        var(--ripple-outro-duration) var(--ripple-outro-easing) var(--ripple-spread-duration) 1
          forwards ripple-outro;
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
        width: var(--ripple-d);
      }
    }
  }
</style>
