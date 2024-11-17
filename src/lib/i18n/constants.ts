import type { AvailableLanguageTag } from './generated/runtime';

export const LANGUAGES = {
	en: 'English',
	fr: 'Français'
} as const satisfies Record<AvailableLanguageTag, string>;
