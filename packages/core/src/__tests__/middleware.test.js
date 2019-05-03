import { createMemoryHistory } from 'history';

import { NOT_FOUND } from '../consts';
import { createMiddleware } from '../middleware';
import { routes } from './fixtures';
import { getState } from './middleware.fixtures';

describe('middleware', () => {
  it('should update state when url changed', () => {
    const dispatch = jest.fn();
    const history = createMemoryHistory();
    const middleware = createMiddleware({ routes, history });

    middleware({ dispatch, getState });
    history.push('/posts/42');

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch).toBeCalledWith({
      type: 'router/POST',
      payload: { id: '42' },
      meta: { action: 'PUSH', silent: true, queryParams: {} },
    });
  });

  it('should not update state when url is not changed', () => {
    const dispatch = jest.fn();
    const history = createMemoryHistory();
    const middleware = createMiddleware({ routes, history });

    middleware({ dispatch, getState });
    history.push('/');

    expect(dispatch.mock.calls.length).toBe(0);
  });

  it('should call next nextHandler if route not found', () => {
    const dispatch = jest.fn();
    const history = createMemoryHistory();
    const middleware = createMiddleware({ routes, history });
    const nextHandler = middleware({ dispatch, getState });
    const nextNexthandler = jest.fn();
    const action = { type: 'FOO' };

    nextHandler(nextNexthandler)(action);
    expect(dispatch.mock.calls.length).toBe(0);
    expect(nextNexthandler).toBeCalledWith(action);
  });

  it('should update location and state when dispatched action', () => {
    const dispatch = jest.fn();
    const history = createMemoryHistory();
    const middleware = createMiddleware({ routes, history });
    const nextHandler = middleware({ dispatch, getState });
    const nextNexthandler = jest.fn();
    const action = {
      type: 'router/POST',
      payload: { id: '42' },
      meta: { queryParams: { sort: 'name' } },
    };

    nextHandler(nextNexthandler)(action);

    expect(history.location.pathname).toBe('/posts/42');
    expect(history.location.search).toBe('?sort=name');
    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch).toBeCalledWith({
      type: 'router/POST',
      payload: { id: '42' },
      meta: {
        action: 'PUSH',
        queryParams: { sort: 'name' },
        silent: true,
      },
    });
    expect(nextNexthandler).toBeCalledWith({
      type: 'router/POST',
      payload: { id: '42' },
      meta: {
        action: 'PUSH',
        pathname: '/posts/42',
        queryParams: { sort: 'name' },
        search: '?sort=name',
      },
    });
  });

  it('should not change url when action type equal NOT_FOUND', () => {
    const dispatch = jest.fn();
    const history = createMemoryHistory();
    const middleware = createMiddleware({ routes, history });
    const nextHandler = middleware({ dispatch, getState });
    const nextNexthandler = jest.fn();
    const action = { type: NOT_FOUND };

    nextHandler(nextNexthandler)(action);

    expect(history.location.pathname).toBe('/');
    expect(dispatch.mock.calls.length).toBe(0);
    expect(nextNexthandler).toBeCalledWith({
      type: NOT_FOUND,
      meta: {
        action: 'PUSH',
        pathname: '/',
        queryParams: {},
        search: '',
      },
    });
  });
});
