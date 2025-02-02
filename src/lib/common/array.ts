export function pickRandom<T>(array: T[]) {
  const i = ~~(Math.random() * array.length);
  return array[i];
}
