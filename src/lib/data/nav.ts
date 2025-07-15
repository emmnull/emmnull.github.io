import { FileUser, type Icon } from 'lucide-svelte';

export const nav = {
  '': {
    label: 'emmanuel',
  },
  cv: {
    label: 'cv',
    icon: FileUser,
  },
  // works: {
  //   label: 'Works',
  // },
  posts: {
    label: 'posts',
  },
} as const satisfies Record<
  string,
  { label: string; title?: string; icon?: typeof Icon }
>;
