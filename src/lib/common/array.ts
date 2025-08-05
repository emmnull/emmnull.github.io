export function pickRandom<T>(array: T[]) {
  const i = ~~(Math.random() * array.length);
  return array[i];
}

/** Simple Fisher-Yates shuffle implementation. */
export function shuffle<T>(array: T[]) {
  const shuffled = array.slice();
  let i = shuffled.length;
  while (i--) {
    const j = ~~(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
