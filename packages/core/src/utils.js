import pathToRegexp from 'path-to-regexp';
import { parse, stringify } from 'qs';

import { NOT_FOUND } from './consts';

export const prepareRoutes = routes =>
  routes.map(({ type, path }) => {
    const keys = [];
    const regexp = path ? pathToRegexp(path, keys, { strict: true }) : null;

    return {
      type,
      path,
      regexp,
      keys,
    };
  });

export const getParams = (route, pathname) => {
  if (route.type === NOT_FOUND) {
    return {};
  }

  const params = route.regexp.exec(pathname).slice(1);

  return route.keys.reduce((acc, { name }, index) => {
    acc[name] = params[index];

    return acc;
  }, {});
};

export const parseQueryParams = search =>
  parse(search, { ignoreQueryPrefix: true });

export const stringifyQueryParams = queryParams =>
  stringify(queryParams, { addQueryPrefix: true });

export const getInitialState = ({ routes, history }) => {
  const { pathname, search } = history.location;
  const route = routes.getByPathname(pathname);

  return {
    type: route.type,
    pathname,
    search,
    queryParams: parseQueryParams(search),
    action: null,
    params: getParams(route, pathname),
    prev: null,
  };
};

export const getHistoryMethod = action => {
  const mapping = {
    POP: 'goBack',
    REPLACE: 'replace',
  };

  return mapping[action] || 'push';
};

export const createToPath = path => pathToRegexp.compile(path);

export const isActive = (location, state) =>
  location.pathname === state.pathname && location.search === state.search;
