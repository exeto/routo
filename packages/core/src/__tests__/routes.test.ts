import { NOT_FOUND } from '../consts';
import { createRoute, createRouteStorage } from '../routes';

const notFoundRoute = {
  id: NOT_FOUND,
  path: '/404',
};

const HOME = 'router/HOME';

const POST = 'router/POST';

const routes = [
  {
    id: HOME,
    path: '/',
  },
  {
    id: POST,
    path: '/posts/:id',
  },
];

describe('createRoute', () => {
  it('should extend simple route', () => {
    const extendedRoute = createRoute(routes[0]);

    expect(extendedRoute).toMatchSnapshot();
  });

  it('should extend parameterized route', () => {
    const extendedRoute = createRoute(routes[1]);

    expect(extendedRoute).toMatchSnapshot();
  });

  describe('createPathname', () => {
    it('should return pathname for simple route', () => {
      const extendedRoute = createRoute(routes[0]);

      expect(extendedRoute.createPathname({})).toBe('/');
    });

    it('should return pathname for parameterized route', () => {
      const extendedRoute = createRoute(routes[1]);

      expect(extendedRoute.createPathname({ id: 42 })).toBe('/posts/42');
    });
  });
});

describe('RouteStorage instance', () => {
  const routeStorage = createRouteStorage(notFoundRoute, routes);

  describe('getById', () => {
    it('should return not found route', () => {
      expect(routeStorage.getById('router/SOMETHING')).toMatchSnapshot();
      expect(routeStorage.getById(NOT_FOUND)).toMatchSnapshot();
    });

    it('should return simple route', () => {
      expect(routeStorage.getById(HOME)).toMatchSnapshot();
    });

    it('should return parameterized route', () => {
      expect(routeStorage.getById(POST)).toMatchSnapshot();
    });
  });

  describe('getByPathname', () => {
    it('should return not found route', () => {
      expect(routeStorage.getByPathname('/something')).toMatchSnapshot();
      expect(routeStorage.getByPathname('/something/42')).toMatchSnapshot();
      expect(routeStorage.getByPathname('/posts')).toMatchSnapshot();
    });

    it('should return simple route', () => {
      expect(routeStorage.getByPathname('/')).toMatchSnapshot();
    });

    it('should return parameterized route', () => {
      expect(routeStorage.getByPathname('/posts/42')).toMatchSnapshot();
    });
  });
});
