import { all } from '$lib/api/ui';

export async function load() {
  return {
    ui: await all(),
  };
}
