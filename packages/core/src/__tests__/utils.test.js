import {
  prepareRoutes,
  getParams,
  parseQueryParams,
  stringifyQueryParams,
  getInitialState,
  getHistoryMethod,
  createToPath,
  isActive,
} from '../utils';
import { NOT_FOUND } from '../consts';
import {
  rawRoutes,
  notFoundRoute,
  simpleRoute,
  withParamsRoute,
  queryParamsString,
  queryParams,
  createHistory,
  createRoutes,
} from './utils.fixtures';

test('prepare routes', () => {
  expect(
    prepareRoutes([
      {
        type: NOT_FOUND,
        path: null,
      },
      {
        type: 'router/HOME',
        path: '/',
      },
      {
        type: 'router/POST',
        path: '/posts/:id',
      },
    ]),
  ).toEqual(rawRoutes);
});

test('get params from pathname', () => {
  expect(getParams(notFoundRoute, '/users/300')).toEqual({});
  expect(getParams(simpleRoute, '/')).toEqual({});
  expect(getParams(withParamsRoute, '/posts/42')).toEqual({ id: '42' });
});

test('parse query params', () => {
  expect(parseQueryParams(queryParamsString)).toEqual(queryParams);
});

test('stringify query params', () => {
  expect(stringifyQueryParams(queryParams)).toBe(queryParamsString);
});

test('initial state', () => {
  const routes = createRoutes();

  expect(
    getInitialState({ routes, history: createHistory('/users/300') }),
  ).toEqual({
    action: null,
    params: {},
    pathname: '/users/300',
    prev: null,
    queryParams: {},
    search: '',
    type: NOT_FOUND,
  });

  expect(getInitialState({ routes, history: createHistory('/') })).toEqual({
    action: null,
    params: {},
    pathname: '/',
    prev: null,
    queryParams: {},
    search: '',
    type: 'router/HOME',
  });

  expect(
    getInitialState({
      routes,
      history: createHistory('/posts/42', '?sort=name'),
    }),
  ).toEqual({
    action: null,
    params: { id: '42' },
    pathname: '/posts/42',
    prev: null,
    queryParams: { sort: 'name' },
    search: '?sort=name',
    type: 'router/POST',
  });
});

test('get history method name by action name', () => {
  expect(getHistoryMethod()).toBe('push');
  expect(getHistoryMethod('POP')).toBe('goBack');
  expect(getHistoryMethod('REPLACE')).toBe('replace');
});

test('create path string', () => {
  expect(createToPath('/')()).toBe('/');
  expect(createToPath('/posts')()).toBe('/posts');
  expect(createToPath('/posts/:id')({ id: '42' })).toBe('/posts/42');
});

test('check that route is active', () => {
  expect(
    isActive({ pathname: '/', search: '' }, { pathname: '/', search: '' }),
  ).toBe(true);

  expect(
    isActive({ pathname: '/posts', search: '' }, { pathname: '/', search: '' }),
  ).toBe(false);

  expect(
    isActive(
      { pathname: '/', search: '?sort=name' },
      { pathname: '/', search: '' },
    ),
  ).toBe(false);

  expect(
    isActive(
      { pathname: '/posts', search: '?sort=name' },
      { pathname: '/', search: '' },
    ),
  ).toBe(false);
});
