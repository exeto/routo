import { createMemoryHistory } from 'history';
import {
  stringifyQueryParams,
  parseQueryParams,
  createState,
} from '../src/utils';

const queryParamsString = '?sort=name&filters[age][eq]=25';

const queryParams = {
  sort: 'name',
  filters: {
    age: {
      eq: '25',
    },
  },
};

test('stringify query params', () => {
  expect(stringifyQueryParams(queryParams)).toBe(queryParamsString);
});

test('parse query params', () => {
  expect(parseQueryParams(queryParamsString)).toEqual(queryParams);
});

describe('createState', () => {
  const extendedRoute = {
    id: 'router/POST',
    path: '/posts/:id',
    getParams: () => ({ id: '42' }),
    test: () => true,
    createPathname: () => '/posts/42',
  };

  const routeStorage = {
    getByPathname: () => extendedRoute,
    getById: () => extendedRoute,
  };

  const history = createMemoryHistory();

  it('should create state', () => {
    const state = createState(routeStorage, history.location);

    expect(state).toMatchSnapshot();
  });

  it('should create state with query params', () => {
    history.push(`/posts/42${queryParamsString}`);

    const state = createState(routeStorage, history.location);

    expect(state).toMatchSnapshot();
  });
});
