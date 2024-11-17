import { i18n } from '$lib/i18n/adapter';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(
	i18n.handle({
		langPlaceholder: '%lang%',
		textDirectionPlaceholder: '%dir%'
	})
);
