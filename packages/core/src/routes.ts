import { pathToRegexp, compile, Key } from 'path-to-regexp';

import { Route, ExtendedRoute, RouteStorage } from './types';

const createRoute = (route: Route): ExtendedRoute => {
  const keys: Key[] = [];
  const regexp = pathToRegexp(route.path, keys, { strict: true });

  return {
    ...route,
    regexp,
    keys,
    createPathname: compile(route.path),
  };
};

export const createRouteStorage = (routes: Route[]): RouteStorage => {
  const extendedRoutes = routes.map(createRoute);

  return {
    getById(id: string): ExtendedRoute | null {
      return extendedRoutes.find(route => id === route.id) || null;
    },

    getByPathname(pathname: string): ExtendedRoute | null {
      return extendedRoutes.find(({ regexp }) => regexp.test(pathname)) || null;
    },
  };
};
