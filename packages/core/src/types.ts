import { History } from 'history';

export type Route = {
  id: string;
  path: string;
};

export type Params = { [key: string]: string };

export type QueryParams = { [key: string]: any };

export type ExtendedRoute = Route & {
  test(pathname: string): boolean;
  createPathname(params: Params): string;
  getParams(pathname: string): Params;
};

export type RouteStorage = {
  getById(id: string): ExtendedRoute;
  getByPathname(pathname: string): ExtendedRoute;
};

export type State = {
  id: string;
  pathname: string;
  search: string;
  queryParams: QueryParams;
  action: 'PUSH' | 'POP' | 'REPLACE' | null;
  params: Params;
  prev: State | null;
};

export type Options = {
  basename?: string;
  history?: History;
  notFoundPath?: string;
};

export type Listener = (state: State) => void;

export type LocationDescriptor = {
  params?: Params;
  queryParams?: QueryParams;
};

type Unsubscribe = () => void;

export type Router = {
  getState(): State;
  subscribe(listener: Listener): Unsubscribe;
  push(id: string, data?: LocationDescriptor): void;
  replace(id: string, data?: LocationDescriptor): void;
  markAsNotFound(): void;
  createHref(id: string, data?: LocationDescriptor): string;
  hasId(id: string): boolean;
};
