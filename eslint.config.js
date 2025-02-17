import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'

export default [
  {
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      prettier,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'react/jsx-use-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/first': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-debugger': 'error',
      'space-infix-ops': 'error',
      'space-before-blocks': 'error',
      quotes: ['error', 'single', { avoidEscape: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['.eslintrc.{js,cjs}'],
    languageOptions: {
      parserOptions: {
        sourceType: 'script',
      },
    },
    ignores: ['dist/', 'node_modules/'],
  },
]
