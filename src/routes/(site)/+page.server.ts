import { all } from 'virtual:works';

export async function load() {
  const works = all().map(({ metadata, slug }) => ({ metadata, slug }));
  return {
    works,
  };
}
