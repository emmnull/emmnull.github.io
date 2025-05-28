import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';
import Github from '$lib/components/github.svelte';
import * as m from '$messages';
import type { Component } from 'svelte';
import type { Tag } from './meta';

export const skills = [
  'html',
  'css',
  'postcss',
  'scss',
  'tailwind',
  'javascript',
  'typescript',
  'nodejs',
  'svelte',
  'sveltekit',
  'react',
  'nextjs',
  'sql',
  'postgres',
  'drizzle',
  'zod',
  'figma',
  'photoshop',
  'illustrator',
  'indesign',
  'premierepro',
  'aftereffects',
] satisfies Tag[];

export const want = [
  'solid',
  'remix',
  'reactnative',
  'reactrouter',
] satisfies Tag[];

export const education = [
  {
    start: new Date(2016, 9, 1),
    end: new Date(2019, 12, 1),
    program: {
      name: m['education.desco'](),
      title: m['education.msc'](),
      degree: m['education.master'](),
    },
    school: {
      name: 'University de Montréal',
      abbreviation: 'UdeM',
      city: 'Montréal',
    },
  },
  {
    start: new Date(2011, 9, 1),
    end: new Date(2015, 5, 1),
    program: {
      name: m['education.graphic'](),
      title: m['education.ba'](),
      degree: m['education.bachelor'](),
    },
    school: {
      name: 'University du Québec à Montréal',
      abbreviation: 'UQAM',
      city: 'Montréal',
    },
  },
] satisfies {
  start: Date;
  end: Date;
  program: {
    name: string;
    title: string;
    degree: string;
  };
  school: {
    name: string;
    abbreviation: string;
    city: string;
  };
}[];

export const links = {
  github: {
    label: 'GitHub',
    url: new URL(PUBLIC_GITHUB_USERNAME, 'https://github.com/'),
    icon: Github,
  },
} satisfies Record<
  string,
  {
    label: string;
    url: URL;
    icon?: Component;
  }
>;
