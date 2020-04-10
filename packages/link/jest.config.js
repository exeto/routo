'use strict';

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!src/**/__tests__/**/*.ts?(x)',
    '!src/**/*.test.ts?(x)',
  ],
};
