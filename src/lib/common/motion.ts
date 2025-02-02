import { crossfade } from 'svelte/transition';

export function createCrossfadePreset<T extends Parameters<typeof crossfade>>(...params: T) {
  const preset = crossfade(params);
  return {
    send: preset[0],
    receive: preset[1],
  };
}
