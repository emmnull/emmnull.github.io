import type { AvailableLocale } from './generated/runtime';

export const LOCALES = {
  en: 'English',
  fr: 'Français',
} as const satisfies Record<AvailableLocale, string>;
