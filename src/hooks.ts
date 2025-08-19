import { deLocalizeUrl } from '$lib/i18n/generated/runtime';
import type { Reroute } from '@sveltejs/kit';

export const reroute: Reroute = (request) => {
  // const change = request.url.searchParams.get('locale');
  // if (change && isLocale(change) && change !== getLocale()) {
  //   cookie.set('locale', change);
  // }
  return deLocalizeUrl(request.url).pathname;
};
