import { History } from 'history';

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

export type Options = {
  history?: History;
  notFoundPath?: string;
};

export type Listener = (state: State) => void;

export type LocationDescriptor = {
  params?: object;
  queryParams?: object;
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
