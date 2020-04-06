export type Route = {
  id: string;
  path: string;
};

export type ExtendedRoute = Route & {
  test(pathname: string): boolean;
  createPathname(params: object): string;
  getParams(pathname: string): object;
};

export type RouteStorage = {
  getById(id: string): ExtendedRoute;
  getByPathname(pathname: string): ExtendedRoute;
};

export type State = {
  id: string;
  pathname: string;
  search: string;
  queryParams: object;
  action: 'PUSH' | 'POP' | 'REPLACE' | null;
  params: object;
  prev: State | null;
};
