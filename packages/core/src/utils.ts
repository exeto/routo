import { History } from 'history';
import { parse, stringify } from 'qs';

import { RouteStorage, ExtendedRoute, State } from './types';
import { NOT_FOUND } from './consts';

export const getParams = (
  route: ExtendedRoute | null,
  pathname: string,
): object => {
  if (!route) {
    return {};
  }

  const params = route.regexp.exec(pathname)?.slice(1);

  return route.keys.reduce((acc, { name }, index) => {
    acc[name] = params[index];

    return acc;
  }, {});
};

export const parseQueryParams = (search: string): object =>
  parse(search, { ignoreQueryPrefix: true });

export const stringifyQueryParams = (queryParams: object): string =>
  stringify(queryParams, { addQueryPrefix: true, encode: false });

export const getInitialState = (
  routeStorage: RouteStorage,
  history: History,
): State => {
  const { pathname, search } = history.location;
  const route = routeStorage.getByPathname(pathname);

  return {
    id: route?.id || NOT_FOUND,
    pathname,
    search,
    queryParams: parseQueryParams(search),
    action: null,
    params: getParams(route, pathname),
    prev: null,
  };
};
