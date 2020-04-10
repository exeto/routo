'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/__tests__/**/*.ts',
    '!src/**/*.test.ts',
  ],
};
