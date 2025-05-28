export const tag_scopes = ['frontend', 'backend', 'design'] as const;
export type TagScope = (typeof tag_scopes)[number];

export const tag_types = [
  'language',
  'library',
  'framework',
  'software',
  'runtime',
] as const;
export type TagType = (typeof tag_types)[number];

export const tags_details = {
  svelte: {
    label: 'Svelte',
    type: 'language',
    scopes: ['frontend'],
  },
  sveltekit: {
    label: 'SvelteKit',
    type: 'framework',
    scopes: ['frontend', 'backend'],
  },
  html: {
    label: 'HTML',
    type: 'language',
  },
  css: {
    label: 'CSS',
    type: 'language',
  },
  scss: {
    label: 'SCSS/SASS',
    type: 'language',
  },
  postcss: {
    label: 'PostCSS',
    type: 'library',
  },
  tailwind: {
    label: 'TailwindCSS',
    type: 'library',
    scopes: ['frontend'],
  },
  javascript: {
    label: 'JavaScript',
    type: 'language',
  },
  typescript: {
    label: 'TypeScript',
    type: 'language',
  },
  nodejs: {
    label: 'Node.js',
    type: 'runtime',
  },
  react: {
    label: 'React',
    type: 'library',
  },
  nextjs: {
    label: 'Next.js',
    type: 'framework',
  },
  sql: {
    label: 'SQL',
    type: 'language',
  },
  postgres: {
    label: 'PostgreSQL',
    type: 'language',
  },
  drizzle: {
    label: 'Drizzle ORM',
    type: 'library',
  },
  zod: {
    label: 'Zod',
    type: 'library',
  },
  figma: {
    label: 'Figma',
    type: 'software',
  },
  photoshop: {
    label: 'Photoshop',
    type: 'software',
  },
  illustrator: {
    label: 'Illustrator',
    type: 'software',
  },
  indesign: {
    label: 'InDesign',
    type: 'software',
  },
  premierepro: {
    label: 'Premiere Pro',
    type: 'software',
  },
  aftereffects: {
    label: 'After Effects',
    type: 'software',
  },
  svg: {
    label: 'SVG',
    type: 'language',
  },
  remix: {
    label: 'Remix',
    type: 'framework',
  },
  solid: {
    label: 'Solid JS',
    type: 'language',
  },
  reactnative: {
    label: 'React Native',
    type: 'framework',
  },
  reactrouter: {
    label: 'React Router',
    type: 'framework',
  },
} as const satisfies Record<
  string,
  {
    label: string;
    url?: URL;
    type: TagType;
    scopes?: TagScope[];
  }
>;

export const tags = Object.keys(tags_details) as Tag[];
export type Tag = keyof typeof tags_details;
