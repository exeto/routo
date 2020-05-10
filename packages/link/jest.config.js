'use strict';

module.exports = {
  displayName: 'link',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
};
