const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['prettier'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.ts?(x)'],
      rules: {'prettier/prettier': ['warn', prettierOptions]},
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
};
