'use strict';

module.exports = {
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/__tests__/**/*.js',
    '!src/**/*.test.js',
  ],
};
