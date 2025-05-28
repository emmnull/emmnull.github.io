import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { schema } from './plugins/schema';
import { postSchema, workSchema } from './src/lib/common/schemas';

// const registry = z.registry<{ id: string }>();
// registry.add(tagScopeSchema, { id: 'tagScope' });
// registry.add(tagTypeSchema, { id: 'tagType' });
// registry.add(tagSchema, { id: 'tag' });
// registry.add(profileSchema, { id: 'profile' });
// registry.add(postMetadataSchema, { id: 'postMetadata' });
// registry.add(postFrontmatterSchema, { id: 'postFrontmatter' });

export default defineConfig({
  plugins: [
    schema({
      // './schema.json': registry,
      // './content/profile/schema.json': profileSchema.partial(),
      './content/work/schema.json': workSchema.partial(),
      './content/posts/schema.json': postSchema.partial(),
    }),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/i18n/generated',
      strategy: ['url', 'cookie', 'baseLocale'],
    }),
    tailwindcss(),
    sveltekit(),
  ],
  server: {
    port: 9000,
    fs: {
      // allow importing from ../content
      allow: ['..'],
    },
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
