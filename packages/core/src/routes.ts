import { pathToRegexp, compile, Key } from 'path-to-regexp';

import { Route, ExtendedRoute, RouteStorage } from './types';

export const createRoute = (route: Route): ExtendedRoute => {
  const keys: Key[] = [];
  const regexp = pathToRegexp(route.path, keys, { strict: true });

  return {
    ...route,
    regexp,
    keys,
    createPathname: compile(route.path),
  };
};

export const createRouteStorage = (
  notFoundRoute: Route,
  routes: Route[],
): RouteStorage => {
  const extendedRoutes = [...routes, notFoundRoute].map(createRoute);
  const extendedNotFoundRoute = extendedRoutes[extendedRoutes.length - 1];

  return {
    getById(id) {
      return (
        extendedRoutes.find((route) => id === route.id) || extendedNotFoundRoute
      );
    },

    getByPathname(pathname) {
      return (
        extendedRoutes.find(({ regexp }) => regexp.test(pathname)) ||
        extendedNotFoundRoute
      );
    },
  };
};
