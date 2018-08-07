module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  globals: {
    document: true,
    window: true,
  },
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'node',
    'promise',
    'react',
    // 'prettier',
  ],
  rules: {
    camelcase: 'off',
    'arrow-parens': ['off'],
    'class-methods-use-this': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'import/extensions': ['off'],
    'no-mixed-operators': ['error', { allowSamePrecedence: true }],
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^__' }],
    'no-underscore-dangle': 'off',
    'no-use-before-define': ['error', { functions: false }],
    'prefer-const': 'off',
    'function-paren-newline': 'off',
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/no-array-index-key': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/jsx-wrap-multilines': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'lifecycle',
          '/^handleOn.+$/',
          'render',
          '/^render.+$/',
          'everything-else',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
