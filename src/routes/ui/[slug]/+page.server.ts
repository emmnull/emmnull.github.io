import { one } from '$lib/api/ui';

export async function load(event) {
  return {
    ...(await one(event.params.slug)),
  };
}
