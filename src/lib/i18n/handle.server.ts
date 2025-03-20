import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from './generated/server';

export default (function handle({ event, resolve }) {
  return paraglideMiddleware(event.request, ({ locale }) => {
    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%lang%', locale),
    });
  });
} satisfies Handle);
