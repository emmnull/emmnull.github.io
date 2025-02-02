export function readingDuration(
  content: string,
  {
    speed = 200,
    pattern = /\w+/g,
  }: {
    /**
     * Reading speed, typically in words per minute when pattern corresponds to words.
     */
    speed?: number;
    pattern?: RegExp;
  } = {},
) {
  const count = content.match(pattern)?.length || 0;
  return count / speed;
}

/**
 * @see https://sentry.io/answers/generate-random-string-characters-in-javascript/
 */
export function randomId(
  length = 6,
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
) {
  let result = '';
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  arr.forEach((n) => {
    result += alphabet[n % alphabet.length];
  });
  return result;
}
