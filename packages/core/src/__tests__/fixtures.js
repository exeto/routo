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
      modifier: '',
      name: 'id',
      pattern: '[^\\/#\\?]+?',
      prefix: '/',
      suffix: '',
    },
  ],
  path: '/posts/:id',
  // eslint-disable-next-line no-useless-escape
  regexp: /^\/posts(?:\/([^\/#\?]+?))$/i,
  type: 'router/POST',
};

export const rawRoutes = [notFoundRoute, simpleRoute, withParamsRoute];

const typeMapping = {
  [NOT_FOUND]: notFoundRoute,
  'router/HOME': simpleRoute,
  'router/POST': withParamsRoute,
};

const pathnameMapping = {
  '/users/300': notFoundRoute,
  '/': simpleRoute,
  '/posts/42': withParamsRoute,
};

export const routes = {
  getByType: type => typeMapping[type] || null,
  getByPathname: pathname => pathnameMapping[pathname] || null,
};
