'use strict';

module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)'],
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
  projects: [
    '<rootDir>/packages/core',
    '<rootDir>/packages/link',
    '<rootDir>/packages/react',
    '<rootDir>/packages/redux',
  ],
};
