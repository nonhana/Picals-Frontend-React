import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  unocss: true,
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
})
