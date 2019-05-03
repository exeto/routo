import { NOT_FOUND } from '../consts';

import { createRoutes } from '../routes';
import { notFoundRoute, simpleRoute, withParamsRoute } from './fixtures';

const rawRoutes = [simpleRoute, withParamsRoute];

test('routes - getByType method', () => {
  const routes = createRoutes(rawRoutes);

  expect(routes.getByType(NOT_FOUND)).toEqual(notFoundRoute);
  expect(routes.getByType(simpleRoute.type)).toEqual(simpleRoute);
  expect(routes.getByType(withParamsRoute.type)).toEqual(withParamsRoute);
});

test('routes - getByPathname method', () => {
  const routes = createRoutes(rawRoutes);

  expect(routes.getByPathname('/users/300')).toEqual(notFoundRoute);
  expect(routes.getByPathname('/')).toEqual(simpleRoute);
  expect(routes.getByPathname('/posts/42')).toEqual(withParamsRoute);
});
