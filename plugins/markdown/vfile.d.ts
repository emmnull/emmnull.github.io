import 'vfile';

declare module 'vfile' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface DataMap {
    /** Frontmatter metadata parsed by mdsvex. */
    fm?: Record<string, unknown>;
  }
}
