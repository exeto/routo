'use strict';

module.exports = {
  '**/*.js': ['eslint --fix', 'git add'],
  '**/*.{json,md,yml}': ['prettier --write', 'git add'],
};
