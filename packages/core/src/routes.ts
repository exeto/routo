import { pathToRegexp, compile, Key } from 'path-to-regexp';

import { Route, ExtendedRoute, RouteStorage } from './types';

export const createRoute = (route: Route): ExtendedRoute => {
  const keys: Key[] = [];
  const regexp = pathToRegexp(route.path, keys, { strict: true });

  return {
    ...route,

    test(pathname: string): boolean {
      return regexp.test(pathname);
    },

    createPathname: compile(route.path),

    getParams(pathname: string): object {
      const params = pathname.match(regexp)?.slice(1);

      if (!params) {
        return {};
      }

      return keys.reduce((acc: { [key: string]: string }, key, index) => {
        acc[key.name] = params[index];

        return acc;
      }, {});
    },
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
        extendedRoutes.find(({ test }) => test(pathname)) ||
        extendedNotFoundRoute
      );
    },
  };
};
