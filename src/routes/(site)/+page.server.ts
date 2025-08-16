import { shuffle } from '$lib/common/array';
import { getLocale } from '$lib/i18n/generated/runtime';
import { all } from 'virtual:works';

export async function load() {
  const works = all()
    .filter((p) => p.params.locale === getLocale())
    .map(({ metadata, params }) => ({ metadata, params }));
  return {
    // works,
    images: shuffle(
      works.flatMap((w) => {
        return w.metadata.images.map((image, i) => {
          return {
            ...w,
            image,
            isBanner: !i,
          };
        });
      }),
    ),
  };
}
