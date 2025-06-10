export const disciplines_details = {
  frontend: {
    label: 'Frontend',
  },
  backend: {
    label: 'Backend',
  },
  design: {
    label: 'Design',
  },
  cognition: {
    label: 'Cognition',
  },
  ix: {
    label: 'Interaction',
  },
  ux: {
    label: 'User Experience',
  },
  research: {
    label: 'Research',
  },
} as const satisfies Record<string, { label: string }>;

export const disciplines = Object.keys(disciplines_details) as Discipline[];
export type Discipline = keyof typeof disciplines_details;

export const tag_types_details = {
  language: {
    label: 'Language',
  },
  library: {
    label: 'Library',
  },
  framework: {
    label: 'Framework',
  },
  software: {
    label: 'Software',
  },
  runtime: {
    label: 'Runtime',
  },
} satisfies Record<string, { label: string }>;

export const tag_types = Object.keys(tag_types_details) as TagType[];
export type TagType = keyof typeof tag_types_details;

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
  d3js: {
    label: 'D3.js',
    type: 'library',
  },
  babylonjs: {
    label: 'Babylon.js',
    type: 'library',
  },
  maplibre: {
    label: 'MapLibre',
    type: 'library',
  },
  mapbox: {
    label: 'MapBox',
    type: 'library',
  },
  leaflet: {
    label: 'Leaflet',
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
    scopes?: Discipline[];
  }
>;

export const tags = Object.keys(tags_details) as Tag[];
export type Tag = keyof typeof tags_details;
