import { isLocale } from '$lib/i18n/generated/runtime';
import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param) => isLocale(param)) satisfies ParamMatcher;
