module.exports = {
  env: {
    es2021: true,
    browser: true,
    commonjs: true,
    node: true,
    mocha: true,
    jasmine: true,
  },
  extends: ['eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
