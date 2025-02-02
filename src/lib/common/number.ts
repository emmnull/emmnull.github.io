export function isNumeric(input: string | number): input is number {
  return Number.isFinite(+input);
}

export function random(a: number, b?: number) {
  if (b === undefined) {
    return Math.random() * a;
  }
  return a + Math.random() * (b - a);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
