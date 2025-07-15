/* eslint-disable unicorn/prefer-module */
module.exports = {
  excludes: [
    // Configuration modules
    '*/config/**/*'
  ],
  reporters: ['json', ['lcov', { projectRoot: '../../' }], 'html'],
  useBabelInstrumenter: true
};
