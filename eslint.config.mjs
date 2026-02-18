import nextVitals from 'eslint-config-next/core-web-vitals';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  ...nextVitals,
  reactPlugin.configs.flat['jsx-runtime'],
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: ['public/webforms/*'],
  },
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      '@next/next/no-img-element': 'off',
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];

export default eslintConfig;
