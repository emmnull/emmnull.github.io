import { FileUser, type Icon } from 'lucide-svelte';

export const nav = {
  '': {
    label: 'emmanuel',
    disabled: undefined,
  },
  cv: {
    label: 'cv',
    icon: FileUser,
    disabled: undefined,
  },
  // works: {
  //   label: 'Works',
  // },
  posts: {
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
