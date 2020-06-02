import { pathToRegexp, compile, Key } from 'path-to-regexp';

import { Route, ExtendedRoute, RouteStorage, Params } from './types';
import { NOT_FOUND } from './consts';

export const createRoute = (route: Route): ExtendedRoute => {
  const keys: Key[] = [];
  const regexp = pathToRegexp(route.path, keys, { strict: true });

  return {
    ...route,

    test(pathname: string): boolean {
      return regexp.test(pathname);
    },

    createPathname: compile(route.path),

    getParams(pathname: string): Params {
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

const createWithBasename = (basename: string) => {
  const getPath = (path: string) => {
    if (basename === '/') {
      return path;
    }

    if (path === '/') {
      return basename;
    }

    return `${basename}${path}`;
  };

  return (route: Route) => ({ ...route, path: getPath(route.path) });
};

type RouteStorageOptions = {
  routes: Route[];
  basename: string;
  notFoundPath: string;
};

export const createRouteStorage = (
  options: RouteStorageOptions,
): RouteStorage => {
  const { routes, basename, notFoundPath } = options;
  const withBasename = createWithBasename(basename);

  const notFoundRoute = {
    id: NOT_FOUND,
    path: notFoundPath,
  };

  const extendedRoutes = [...routes, notFoundRoute]
    .map(withBasename)
    .map(createRoute);

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
