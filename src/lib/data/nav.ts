import { FileUser, type Icon } from 'lucide-svelte';

export const nav = {
  '': {
    label: 'emmanuel',
  },
  cv: {
    label: 'CV',
    icon: FileUser,
  },
  works: {
    label: 'Works',
  },
  posts: {
    label: 'Posts',
  },
} as const satisfies Record<
  string,
  { label: string; title?: string; icon?: typeof Icon }
>;
