import { Location } from 'history';
import { parse, stringify } from 'qs';

import { RouteStorage, State, QueryParams } from './types';

export const parseQueryParams = (search: string): QueryParams =>
  parse(search, { ignoreQueryPrefix: true });

export const stringifyQueryParams = (queryParams: QueryParams): string =>
  stringify(queryParams, { addQueryPrefix: true, encode: false });

export const createState = (
  routeStorage: RouteStorage,
  location: Location,
): State => {
  const { pathname, search } = location;
  const route = routeStorage.getByPathname(pathname);

  return {
    id: route.id,
    pathname,
    search,
    queryParams: parseQueryParams(search),
    action: null,
    params: route.getParams(pathname),
    prev: null,
  };
};
