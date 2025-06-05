import type { Locale } from './generated/runtime';

export const locales_names = {
  en: 'English',
  fr: 'Français',
} as const satisfies Record<Locale, string>;
