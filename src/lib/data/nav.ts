import { Blocks, CircleUser, NotebookText, type Icon } from 'lucide-svelte';

export const nav = {
  '': {
    label: 'emmanuel',
    disabled: undefined,
  },
  cv: {
    label: 'cv',
    icon: CircleUser,
    disabled: true,
  },
  works: {
    icon: Blocks,
    label: 'works',
    disabled: true,
  },
  posts: {
    icon: NotebookText,
    label: 'posts',
    disabled: true,
  },
} as const satisfies Record<
  string,
  {
    label: string;
    title?: string;
    icon?: typeof Icon;
    disabled: true | undefined;
  }
>;
