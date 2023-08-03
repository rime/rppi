module.exports = {
  env: {
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  rules: {
    'no-unused-expressions': 0,
    'quotes': [2, 'double'],
    'quote-props': [2, 'always']
  }
}
