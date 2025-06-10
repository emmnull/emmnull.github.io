import type { Tag } from '$lib/data/meta';
import { getLocale } from '$lib/i18n/generated/runtime';

export async function all(options?: {
  page?: number;
  size?: number;
  filter?: Tag;
}) {
  const locale = getLocale();
  const files = import.meta.glob('/content/posts/**/*.md', { eager: true });
  const data: Record<string, string> = {};
  for (const f in files) {
    //
  }
}

export async function one(slug: string) {}
