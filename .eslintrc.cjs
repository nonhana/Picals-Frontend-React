module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
  rules: {
    'react/jsx-use-react': 0,
    'react/react-in-jsx-scope': 0,
    'import/first': 2,
    'import/order': [
      2,
      {
        groups: [['builtin', 'external', 'internal']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-debugger': 2,
    'space-infix-ops': 2,
    'space-before-blocks': 2,
    quotes: [2, 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 0, // 禁止函数必须要定义返回类型
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-vars': [2, { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
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
}
