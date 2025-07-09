import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';
import Github from '$lib/components/github.svelte';
import Instagram from '$lib/components/instagram.svelte';
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

export const education = [
  {
    start: new Date(2016, 9, 1),
    end: new Date(2019, 12, 1),
    program: {
      name: m.education_desco(),
      title: m.education_msc(),
      degree: m.education_master(),
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
      name: m.education_graphic_design(),
      title: m.education_ba(),
      degree: m.education_bachelor(),
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
    href: `https://github.com/${PUBLIC_GITHUB_USERNAME}`,
    icon: Github,
  },
  instagram: {
    label: 'Instagram',
    href: `https://www.instagram.com/itsemmanuelio/`,
    icon: Instagram,
  },
} satisfies Record<
  string,
  {
    label: string;
    href: string;
    icon?: Component;
  }
>;
