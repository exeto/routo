import { createMemoryHistory } from 'history';

import { createRouter } from '../index';

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
});
