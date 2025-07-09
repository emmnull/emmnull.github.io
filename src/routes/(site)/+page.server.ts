import { all } from '$lib/data/works';

export async function load(e) {
  return {
    works: all().map(({ metadata, slug }) => ({ metadata, slug })),
  };
}
