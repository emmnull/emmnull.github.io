/**
 * @todo Rename to Lockscroll.
 */
export class Lockscroll {
  static readonly attr = 'data-scroll-lock';
  static #locks = new Map<HTMLElement, { overflow: string; active: Set<Lockscroll> }>();

  #element;
  #active = $state(false);

  constructor(element: HTMLElement, active?: boolean) {
    this.#element = element;
    if (active) {
      this.active = true;
    }

    $effect.root(() => {
      return () => {
        this.active = false;
      };
    });
  }

  get element() {
    return this.#element;
  }

  get active() {
    return this.#active;
  }

  set active(value) {
    if (value === this.#active) {
      return;
    }
    this.#active = value;
    const existing = Lockscroll.#locks.get(this.#element);
    if (value) {
      if (existing) {
        existing.active.add(this);
      } else {
        const overflow = this.#element.style.overflow;
        const active = new Set([this]);
        Lockscroll.#locks.set(this.#element, { overflow, active });
        this.#element.setAttribute(Lockscroll.attr, 'true');
        this.#element.style.overflow = 'hidden';
      }
    } else {
      if (existing) {
        if (existing.active.has(this)) {
          existing.active.delete(this);
        }
        if (!existing.active.size) {
          this.#element?.removeAttribute(Lockscroll.attr);
          this.#element.style.overflow = existing.overflow;
          Lockscroll.#locks.delete(this.#element);
        }
      }
    }
  }
}
