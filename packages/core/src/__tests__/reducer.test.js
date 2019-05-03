import { NOT_FOUND } from '../consts';
import { createReducer } from '../reducer';
import { initialState } from './reducer.fixtures';
import { routes } from './fixtures';

const reducer = createReducer({ initialState, routes });

test('reducer', () => {
  let state = reducer(undefined, { type: 'INIT' });

  expect(state).toEqual({
    action: null,
    params: {},
    pathname: '/',
    prev: null,
    queryParams: {},
    search: '',
    type: 'router/HOME',
  });

  state = reducer(state, {
    type: 'router/POST',
    payload: { id: '42' },
    meta: {
      pathname: '/posts/42',
      search: '',
      queryParams: {},
      action: 'PUSH',
    },
  });

  expect(state).toEqual({
    type: 'router/POST',
    pathname: '/posts/42',
    search: '',
    queryParams: {},
    action: 'PUSH',
    params: { id: '42' },
    prev: {
      action: null,
      params: {},
      pathname: '/',
      queryParams: {},
      search: '',
      type: 'router/HOME',
    },
  });

  state = reducer(state, {
    type: 'router/HOME',
    meta: {
      pathname: '/',
      search: '?sort=name',
      queryParams: { sort: 'name' },
      action: 'PUSH',
    },
  });

  expect(state).toEqual({
    type: 'router/HOME',
    pathname: '/',
    search: '?sort=name',
    queryParams: { sort: 'name' },
    action: 'PUSH',
    params: {},
    prev: {
      type: 'router/POST',
      pathname: '/posts/42',
      search: '',
      queryParams: {},
      action: 'PUSH',
      params: { id: '42' },
    },
  });

  state = reducer(state, {
    type: NOT_FOUND,
    meta: {
      pathname: '/users/300',
      search: '',
      queryParams: {},
      action: 'PUSH',
    },
  });

  expect(state).toEqual({
    type: NOT_FOUND,
    pathname: '/users/300',
    search: '',
    queryParams: {},
    action: 'PUSH',
    params: {},
    prev: {
      type: 'router/HOME',
      pathname: '/',
      search: '?sort=name',
      queryParams: { sort: 'name' },
      action: 'PUSH',
      params: {},
    },
  });
});
