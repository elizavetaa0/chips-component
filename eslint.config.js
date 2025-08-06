import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import testlint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  js.configs.recommended,
  ...testlint.configs.recommended,
  globalIgnores(['node_modules/*', 'dist/*', '*.json', '*.md', '*.yml']),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      js,
    },
    rules: {
      ...pluginReact.configs['recommended'].rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...pluginReactHooks.configs['recommended'].rules,
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'max-len': ['error', { code: 100, tabWidth: 2 }],
      camelcase: 'warn',
      'no-var': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'no-duplicate-imports': ['error', { includeExports: true }],
      'no-unassigned-vars': 'error',
    },
  },
  eslintConfigPrettier,
]);
