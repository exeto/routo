'use strict';

module.exports = {
  displayName: 'react',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@routo/(.*)$': '<rootDir>/../$1/src',
  },
};
