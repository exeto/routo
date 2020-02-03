import { History } from 'history';
import { parse, stringify } from 'qs';

import { RouteStorage, ExtendedRoute, State } from './types';

export const getParams = (route: ExtendedRoute, pathname: string): object => {
  const params = pathname.match(route.regexp)?.slice(1);

  if (!params) {
    return {};
  }

  return route.keys.reduce((acc: { [key: string]: string }, key, index) => {
    acc[key.name] = params[index];

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
    id: route.id,
    pathname,
    search,
    queryParams: parseQueryParams(search),
    action: null,
    params: getParams(route, pathname),
    prev: null,
  };
};
