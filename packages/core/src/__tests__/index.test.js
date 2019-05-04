import { createBrowserHistory } from 'history';

import { createRouter } from '../index';
import { createMiddleware } from '../middleware';
import { createReducer } from '../reducer';
import { createRoutes } from '../routes';
import { getInitialState } from '../utils';

jest.mock('history', () => ({
  createBrowserHistory: jest.fn(() => 'createBrowserHistoryResult'),
}));

jest.mock('../middleware', () => ({
  createMiddleware: jest.fn(() => 'createMiddlewareResult'),
}));

jest.mock('../reducer', () => ({
  createReducer: jest.fn(() => 'createReducerResult'),
}));

jest.mock('../routes', () => ({
  createRoutes: jest.fn(() => 'createRoutesResult'),
}));

jest.mock('../utils', () => ({
  getInitialState: jest.fn(() => 'getInitialStateResult'),
}));

test('without options', () => {
  const { middleware, reducer } = createRouter('routes');

  expect(createRoutes).toBeCalledWith('routes');
  expect(createBrowserHistory).toBeCalledWith({ basename: '' });
  expect(getInitialState).toBeCalledWith({
    history: 'createBrowserHistoryResult',
    routes: 'createRoutesResult',
  });
  expect(createMiddleware).toBeCalledWith({
    history: 'createBrowserHistoryResult',
    routes: 'createRoutesResult',
  });
  expect(createReducer).toBeCalledWith({
    initialState: 'getInitialStateResult',
    routes: 'createRoutesResult',
  });
  expect(middleware).toBe('createMiddlewareResult');
  expect(reducer).toBe('createReducerResult');

  jest.clearAllMocks();
});

test('with basename option', () => {
  const { middleware, reducer } = createRouter('routes', { basename: '/foo' });

  expect(createRoutes).toBeCalledWith('routes');
  expect(createBrowserHistory).toBeCalledWith({ basename: '/foo' });
  expect(getInitialState).toBeCalledWith({
    history: 'createBrowserHistoryResult',
    routes: 'createRoutesResult',
  });
  expect(createMiddleware).toBeCalledWith({
    history: 'createBrowserHistoryResult',
    routes: 'createRoutesResult',
  });
  expect(createReducer).toBeCalledWith({
    initialState: 'getInitialStateResult',
    routes: 'createRoutesResult',
  });
  expect(middleware).toBe('createMiddlewareResult');
  expect(reducer).toBe('createReducerResult');

  jest.clearAllMocks();
});

test('with history option', () => {
  const { middleware, reducer } = createRouter('routes', {
    history: 'history',
  });

  expect(createRoutes).toBeCalledWith('routes');
  expect(createBrowserHistory.mock.calls.length).toBe(0);
  expect(getInitialState).toBeCalledWith({
    history: 'history',
    routes: 'createRoutesResult',
  });
  expect(createMiddleware).toBeCalledWith({
    history: 'history',
    routes: 'createRoutesResult',
  });
  expect(createReducer).toBeCalledWith({
    initialState: 'getInitialStateResult',
    routes: 'createRoutesResult',
  });
  expect(middleware).toBe('createMiddlewareResult');
  expect(reducer).toBe('createReducerResult');

  jest.clearAllMocks();
});
