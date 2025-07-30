import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import svelteEslintParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      'better-tailwindcss': betterTailwindcss,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app.css',
      },
    },
    rules: {
      ...betterTailwindcss.configs['recommended-warn'].rules,
      ...betterTailwindcss.configs['recommended-error'].rules,
      curly: ['error', 'all'],
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          destructuredArrayIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'import/newline-after-import': [
        'error',
        { count: 1, exactCount: true, considerComments: true },
      ],
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    ignores: ['eslint.config.js', 'svelte.config.js'],
    languageOptions: {
      parser: svelteEslintParser,
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
);
