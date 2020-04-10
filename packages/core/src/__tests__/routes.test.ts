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
  const simpleRoute = createRoute(routes[0]);
  const parameterizedRoute = createRoute(routes[1]);

  it('should extend simple route', () => {
    expect(simpleRoute).toMatchSnapshot();
  });

  it('should extend parameterized route', () => {
    expect(parameterizedRoute).toMatchSnapshot();
  });

  describe('test', () => {
    it('should test pathname for simple route', () => {
      expect(simpleRoute.test('/')).toBeTruthy();
      expect(simpleRoute.test('/posts')).toBeFalsy();
      expect(simpleRoute.test('/posts/42')).toBeFalsy();
    });

    it('should test pathname for parameterized route', () => {
      expect(parameterizedRoute.test('/posts/42')).toBeTruthy();
      expect(parameterizedRoute.test('/')).toBeFalsy();
      expect(parameterizedRoute.test('/posts')).toBeFalsy();
    });
  });

  describe('createPathname', () => {
    it('should return pathname for simple route', () => {
      expect(simpleRoute.createPathname({})).toBe('/');
    });

    it('should return pathname for parameterized route', () => {
      expect(parameterizedRoute.createPathname({ id: 42 })).toBe('/posts/42');
    });
  });

  describe('getParams', () => {
    it('should return params for simple route', () => {
      expect(simpleRoute.getParams('/')).toEqual({});
    });

    it('should return params for parameterized route', () => {
      expect(parameterizedRoute.getParams('/posts/42')).toEqual({ id: '42' });
    });

    it('should return empty params for wrong pathname', () => {
      expect(simpleRoute.getParams('/something')).toEqual({});
    });
  });
});

describe('createRouteStorage', () => {
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
