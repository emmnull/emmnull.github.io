import 'vfile';

declare module 'vfile' {
  interface DataMap {
    /** Frontmatter metadata parsed by mdsvex. */
    fm?: Record<string, unknown>;
    /**
     * - Key: path.
     * - Value: name.
     */
    imports?: Map<string, string>;
  }
}
