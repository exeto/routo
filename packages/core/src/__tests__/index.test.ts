import { createBrowserHistory } from 'history';
import { mocked } from 'ts-jest/utils';

import { createRouter, NOT_FOUND } from '../index';

jest.mock('history');

const { createMemoryHistory } = jest.requireActual('history');

describe('createRouter', () => {
  const HOME = 'router/HOME';
  const POSTS = 'router/POSTS';
  const POST = 'router/POST';

  const routes = [
    {
      id: HOME,
      path: '/',
    },
    {
      id: POSTS,
      path: '/posts',
    },
    {
      id: POST,
      path: '/posts/:id',
    },
  ];

  mocked(createBrowserHistory).mockImplementation(createMemoryHistory);

  describe('options', () => {
    it('should check custom not found path', () => {
      const router = createRouter(routes, { notFoundPath: '/custom404' });

      router.push(NOT_FOUND);
      expect(router.getState()).toMatchSnapshot();
    });

    it('should check default history', () => {
      mocked(createBrowserHistory).mockClear();
      createRouter(routes);
      expect(mocked(createBrowserHistory)).toBeCalledTimes(1);
    });

    it('should check custom history', () => {
      mocked(createBrowserHistory).mockClear();

      const history = createMemoryHistory();
      const router = createRouter(routes, { history });

      expect(mocked(createBrowserHistory)).not.toBeCalled();
      expect(router.getState()).toMatchSnapshot();
      history.push('/posts');
      expect(router.getState()).toMatchSnapshot();
    });
  });

  describe('getState', () => {
    const history = createMemoryHistory();
    const router = createRouter(routes, { history });

    it('should return initial state', () => {
      expect(router.getState()).toMatchSnapshot();
    });

    it('should return new state after push', () => {
      history.push('/posts/42');
      expect(router.getState()).toMatchSnapshot();
    });

    it('should return new state after replace', () => {
      history.replace('/posts');
      expect(router.getState()).toMatchSnapshot();
    });

    it('should return new state after back', () => {
      history.goBack();
      expect(router.getState()).toMatchSnapshot();
    });

    it('should return new state after forward', () => {
      history.goForward();
      expect(router.getState()).toMatchSnapshot();
    });

    it('should return new state after push with query params', () => {
      history.push('/posts?hello=world');
      expect(router.getState()).toMatchSnapshot();
    });
  });

  describe('subscribe', () => {
    it('should run listener after history change', () => {
      const history = createMemoryHistory();
      const router = createRouter(routes, { history });
      const listener1 = jest.fn();
      const listener2 = jest.fn();

      router.subscribe(listener1);
      router.subscribe(listener2);
      expect(listener1).not.toBeCalled();
      expect(listener2).not.toBeCalled();

      history.push('/posts');
      expect(listener1).toBeCalledTimes(1);
      expect(listener1).toMatchSnapshot();
      expect(listener2).toBeCalledTimes(1);
      expect(listener2).toMatchSnapshot();
    });

    it('should unsubscribe listener', () => {
      const history = createMemoryHistory();
      const router = createRouter(routes, { history });
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      const listener3 = jest.fn();

      router.subscribe(listener1);

      const unsubscribe = router.subscribe(listener2);

      router.subscribe(listener3);

      unsubscribe();
      history.push('/posts');

      expect(listener1).toBeCalledTimes(1);
      expect(listener2).not.toBeCalled();
      expect(listener3).toBeCalledTimes(1);
    });
  });

  describe('push', () => {
    const router = createRouter(routes);

    it('should update state after push for simple route', () => {
      router.push(HOME);
      expect(router.getState()).toMatchSnapshot();
    });

    it('should update state after push for simple route with query params', () => {
      router.push(POSTS, { queryParams: { sort: 'date' } });
      expect(router.getState()).toMatchSnapshot();
    });

    it('should update state after push for parameterized route', () => {
      router.push(POST, { params: { id: '42' } });
      expect(router.getState()).toMatchSnapshot();
    });
  });

  describe('replace', () => {
    const router = createRouter(routes);

    it('should update state after replace for simple route', () => {
      router.replace(HOME);
      expect(router.getState()).toMatchSnapshot();
    });

    it('should update state after replace for simple route with query params', () => {
      router.replace(POSTS, { queryParams: { sort: 'date' } });
      expect(router.getState()).toMatchSnapshot();
    });

    it('should update state after replace for parameterized route', () => {
      router.replace(POST, { params: { id: '42' } });
      expect(router.getState()).toMatchSnapshot();
    });
  });

  describe('markAsNotFound', () => {
    const router = createRouter(routes);

    it('should mark current route as not found', () => {
      router.push(POSTS);
      router.markAsNotFound();
      expect(router.getState()).toMatchSnapshot();
    });
  });

  describe('createHref', () => {
    const router = createRouter(routes);
    const params = { id: '42' };
    const queryParams = { sort: 'date' };

    it('should return href for simple route', () => {
      expect(router.createHref(HOME)).toBe('/');
      expect(router.createHref(POSTS)).toBe('/posts');
    });

    it('should return href for parameterized route', () => {
      expect(router.createHref(POST, { params })).toBe('/posts/42');
    });

    it('should return href for simple route with query params', () => {
      expect(router.createHref(HOME, { queryParams })).toBe('/?sort=date');
      expect(router.createHref(POSTS, { queryParams })).toBe(
        '/posts?sort=date',
      );
    });

    it('should return href for parameterized route with query params', () => {
      expect(router.createHref(POST, { params, queryParams })).toBe(
        '/posts/42?sort=date',
      );
    });

    it('should return href for parameterized route with extra params', () => {
      expect(
        router.createHref(POST, { params: { ...params, extra: 'hello' } }),
      ).toBe('/posts/42');
    });
  });

  describe('hasId', () => {
    const router = createRouter(routes);

    it('should check existing route', () => {
      expect(router.hasId(HOME)).toBeTruthy();
      expect(router.hasId(POSTS)).toBeTruthy();
      expect(router.hasId(POST)).toBeTruthy();
    });

    it('should check not found route', () => {
      expect(router.hasId(NOT_FOUND)).toBeTruthy();
    });

    it('should check not existing route', () => {
      expect(router.hasId('SOMETHING')).toBeFalsy();
    });
  });
});
