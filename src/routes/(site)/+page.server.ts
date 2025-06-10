import * as work from '$lib/api/work.server';

export async function load() {
  return {
    work: await work.all(),
  };
}
