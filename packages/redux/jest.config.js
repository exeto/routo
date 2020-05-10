'use strict';

module.exports = {
  displayName: 'redux',
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
};
