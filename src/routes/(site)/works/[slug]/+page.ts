import { one } from 'virtual:works';

export async function load(e) {
  return {
    work: await one(e.params.slug),
  };
}
