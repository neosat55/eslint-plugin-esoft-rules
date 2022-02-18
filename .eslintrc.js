'use strict';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  env: {
    node: true
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        mocha: true
      }
    }
  ],
  rules: {
    'no-console': 'error',
    // Отключаем из-за eslint-docgen
    'node/no-unpublished-require': 'off'
  }
};
