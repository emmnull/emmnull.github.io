import { PUBLIC_EMAIL } from '$env/static/public';

let copied = $state<ReturnType<typeof setTimeout>>();

export const email = {
  get copied() {
    return copied;
  },
  copy() {
    navigator.clipboard.writeText(PUBLIC_EMAIL);
    clearTimeout(copied);
    copied = setTimeout(() => {
      copied = undefined;
    }, 1500);
  },
};
