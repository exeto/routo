'use strict';

module.exports = {
  displayName: 'link',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
};
