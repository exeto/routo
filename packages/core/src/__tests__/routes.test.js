import { NOT_FOUND } from '../consts';

import { createRoutes } from '../routes';
import { notFoundRoute, simpleRoute, withParamsRoute } from './fixtures';

const rawRoutes = [simpleRoute, withParamsRoute];

describe('routes', () => {
  it('should find route by type', () => {
    const routes = createRoutes(rawRoutes);

    expect(routes.getByType('foo')).toBe(null);
    expect(routes.getByType(NOT_FOUND)).toEqual(notFoundRoute);
    expect(routes.getByType(simpleRoute.type)).toEqual(simpleRoute);
    expect(routes.getByType(withParamsRoute.type)).toEqual(withParamsRoute);
  });

  it('should find route by pathname', () => {
    const routes = createRoutes(rawRoutes);

    expect(routes.getByPathname('/users/300')).toEqual(notFoundRoute);
    expect(routes.getByPathname('/')).toEqual(simpleRoute);
    expect(routes.getByPathname('/posts/42')).toEqual(withParamsRoute);
  });
});
