module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react-refresh', '@emotion'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-absolute-path': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    "jsx-a11y/aria-role": ['error', { ignoreNonDOM: true }],
    'react/jsx-no-target-blank': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react/require-default-props': 'off',
    '@emotion/pkg-renaming': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
