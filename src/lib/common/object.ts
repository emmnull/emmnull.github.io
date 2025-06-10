export function isObject<T>(value: T) {
  return value !== null && typeof value === 'object';
}
