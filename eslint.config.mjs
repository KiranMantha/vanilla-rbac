import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json']
      }
    },
    ignores: ['dist/*', 'eslint.config.mjs', 'vite.config.js'],
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': ['error'],
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/no-use-before-define': 'error'
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];
