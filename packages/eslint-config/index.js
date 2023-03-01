/** @type {import('eslint').Linter.Config} */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    'no-unused-vars': 'off',
    'arrow-parens': 'off',
    'no-console': 'warn',
    eqeqeq: 'warn',
    'no-unneeded-ternary': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
};
