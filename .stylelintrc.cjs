module.exports = {
  extends: ['stylelint-config-standard-less', 'stylelint-config-recess-order'],
  overrides: [{ files: ['**/*.less'], customSyntax: 'postcss-less' }],
  plugins: [],
  rules: {},
}
