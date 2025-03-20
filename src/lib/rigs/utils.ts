export function emptyAttribute<T extends boolean | null>(value: T) {
  return value ? '' : undefined;
}

export function trueAttribute<T extends boolean | null>(value: T) {
  return value ? true : undefined;
}

export function assignNotNullish<T>(field: T, option: T | null | undefined) {
  if (option != null) {
    field = option;
  }
}

export function assignNotNull<T>(field: T, option: T | null) {
  if (option !== null) {
    field = option;
  }
}

export function isHTMLElement<T extends typeof HTMLElement>(
  node: Element | EventTarget | null,
  type: T = HTMLElement as T,
): node is InstanceType<T> {
  if (!node) {
    return false;
  }
  return node instanceof type;
}

export function attrSelector<A extends string, V extends string | boolean | undefined = undefined>(
  attribute: A,
  value?: V,
) {
  return (
    value === undefined ? `[${attribute}]` : `[${attribute}='${value}']`
  ) as V extends undefined ? `[${A}]` : `[${A}='${V}']`;
}

export function asGetSet<S extends Record<string | number | symbol, unknown>, P extends keyof S>(
  source: S,
  prop: P,
) {
  const descriptor = Object.getOwnPropertyDescriptor(source, prop);
  const get = descriptor && 'get' in descriptor ? (descriptor.get as () => S[P]) : source[prop];
  const set =
    descriptor && 'set' in descriptor
      ? (descriptor.set as (value: Exclude<S[P], undefined>) => void)
      : undefined;
  return { get, set };
}
