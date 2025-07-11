import { all } from 'virtual:works';

export async function load() {
  return {
    works: all().map(({ metadata, slug }) => ({ metadata, slug })),
  };
}
