import { one } from '$lib/data/works';

export async function load(e) {
  return {
    work: await one(e.params.slug),
  };
}
