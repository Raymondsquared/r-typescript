module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // We overwrite rules here
    '@typescript-eslint/no-explicit-any': 'off',

    // FIXME: Mainly to satisfy interface for not implemented method
    '@typescript-eslint/no-unused-vars': 'off',

    // Mainly for new relic
    '@typescript-eslint/no-var-requires': 'off',
  },
};
