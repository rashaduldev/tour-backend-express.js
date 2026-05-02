// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  js.configs.recommended,
//   tseslint.configs.recommended,
tseslint.configs.strict,
tseslint.configs.stylistic,
{
    rules: {
      'no-console': 'warn', 
      '@typescript-eslint/no-unused-vars': 'off', 
      '@typescript-eslint/no-explicit-any': 'off',
    },
}
);