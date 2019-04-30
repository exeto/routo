import { prepareRoutes } from './utils';
import { NOT_FOUND } from './consts';

export const createRoutes = rawRoutes => {
  const routes = prepareRoutes([
    ...rawRoutes,
    {
      type: NOT_FOUND,
      path: null,
    },
  ]);

  const getByType = type => routes.find(route => type === route.type) || null;
  const notFoundRoute = getByType(NOT_FOUND);

  return Object.freeze({
    getByType,

    getByPathname(pathname) {
      return (
        routes.find(({ regexp }) => regexp && regexp.test(pathname)) ||
        notFoundRoute
      );
    },
  });
};
