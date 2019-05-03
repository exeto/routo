import { NOT_FOUND } from '../consts';

export const notFoundRoute = {
  keys: [],
  path: null,
  regexp: null,
  type: NOT_FOUND,
};

export const simpleRoute = {
  keys: [],
  path: '/',
  regexp: /^\/$/i,
  type: 'router/HOME',
};

export const withParamsRoute = {
  keys: [
    {
      delimiter: '/',
      name: 'id',
      optional: false,
      pattern: '[^\\/]+?',
      prefix: '/',
      repeat: false,
    },
  ],
  path: '/posts/:id',
  // eslint-disable-next-line no-useless-escape
  regexp: /^\/posts\/([^\/]+?)$/i,
  type: 'router/POST',
};

export const rawRoutes = [notFoundRoute, simpleRoute, withParamsRoute];
