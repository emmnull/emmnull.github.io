import { crossfade, type TransitionConfig } from 'svelte/transition';

export function viewTransition(node: HTMLElement, state: unknown) {
  if (!document.startViewTransition) {
    return;
  }
  document.startViewTransition();
}

export function createCrossfadePreset<T extends Parameters<typeof crossfade>>(
  ...params: T
) {
  const preset = crossfade(params);
  return {
    send: preset[0],
    receive: preset[1],
  };
}

export function setoff<T extends Node, O>(
  node: T,
  {
    transition,
    ...options
  }: { transition: (transition: T, options: O) => TransitionConfig } & O,
  // node: HTMLElement,
  // {
  //   delay = 0,
  //   duration = 400,
  //   easing = cubicOut,
  // }: {
  //   delay?: number;
  //   duration?: number;
  //   easing?: EasingFunction;
  // } = {},
) {
  return transition(node, options);
  // return {
  //   delay,
  //   duration,
  //   easing,
  //   css(t, u) {
  //     return '';
  //   },
  //   tick(t, u) {},
  // } satisfies TransitionConfig;
}
