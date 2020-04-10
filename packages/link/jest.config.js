'use strict';

module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!src/**/__tests__/**/*.ts?(x)',
    '!src/**/*.test.ts?(x)',
  ],
};
