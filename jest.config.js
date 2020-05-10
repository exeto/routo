'use strict';

module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)'],
  projects: [
    '<rootDir>/packages/core',
    '<rootDir>/packages/link',
    '<rootDir>/packages/react',
    '<rootDir>/packages/redux',
  ],
};
