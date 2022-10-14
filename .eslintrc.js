module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: '2020',
  },
  plugins: ['@typescript-eslint', 'unicorn', 'prettier', 'node'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'import/no-relative-parent-imports': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          pascalCase: true,
          kebabCase: true,
        },
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-reduce': 'off',
    'class-methods-use-this': ['error', { exceptMethods: ['map'] }],
    complexity: ['error', 5],
    'max-params': ['error', 8],
    curly: 'error',
    'no-console': 'warn',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'error',
    'class-methods-use-this': 'off',
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, -1],
      },
    ],
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'prefer-named-capture-group': 'error',
    'require-unicode-regexp': 'error',
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true,
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: [],
        allowAfterThis: true,
        allowAfterSuper: true,
        allowAfterThisConstructor: true,
        enforceInMethodNames: false,
        allowFunctionParams: false,
      },
    ],
    'no-duplicate-imports': 'error',
    'node/no-process-env': 'error',
    'node/callback-return': 'error',
    'node/global-require': 'error',
    'node/no-mixed-requires': 'error',
    'node/no-new-require': 'error',
    'node/no-sync': 'error',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    'import/extensions': 'off',
    'import/order': 'off',
    "import/no-relative-parent-imports": "off",
    "import/no-extraneous-dependencies": "off",
    "no-magic-numbers": "off",
  },
  overrides: [
    {
      files: ['test/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-magic-numbers': 'off',
      },
    },
    {
      files: ['migrations/**/*.ts'],
      rules: {
        'class-methods-use-this': 'off',
      },
    },
    {
      files: ['seed-script.ts'],
      rules: {
        'unicorn/no-process-exit': 'off',
        'no-console': 'off',
      },
    },
  ],
};
