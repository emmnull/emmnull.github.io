import { shuffle } from '$lib/common/array';
import { all } from 'virtual:works';

export async function load() {
  const works = all().map(({ metadata, slug }) => ({ metadata, slug }));
  return {
    // works,
    images: shuffle(
      works.flatMap(({ metadata, slug }) => {
        const { images, ...meta } = metadata;
        return images.map((image, i) => {
          return {
            meta,
            image,
            slug,
            isBanner: !i,
          };
        });
      }),
    ),
  };
}
