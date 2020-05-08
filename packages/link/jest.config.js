'use strict';

module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
  collectCoverageFrom: ['src/**/*.ts?(x)'],
};
