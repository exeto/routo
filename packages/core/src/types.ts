import { Key } from 'path-to-regexp';

export type Route = {
  id: string;
  path: string;
};

export type ExtendedRoute = Route & {
  keys: Key[];
  regexp: RegExp;
};

export type RouteStorage = {
  getById(id: string): ExtendedRoute | null;
  getByPathname(pathname: string): ExtendedRoute | null;
};

export type State = {
  id: string;
  pathname: string;
  search: string;
  queryParams: object;
  action: 'push' | 'replace' | 'pop' | null;
  params: object;
  prev: State | null;
};
