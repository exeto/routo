import {
  markAsNotFound,
  createMiddleware,
  createReducer,
  SYNC,
  MARK_AS_NOT_FOUND,
} from '../src';

describe('markAsNotFound', () => {
  it('should create `mark as not found` action', () => {
    expect(markAsNotFound()).toEqual({ type: MARK_AS_NOT_FOUND });
  });
});

describe('createMiddleware', () => {
  const createData = () => {
    let listener: any = null;

    const router: any = {
      markAsNotFound: jest.fn(),

      push: jest.fn(),

      replace: jest.fn(),

      hasId(id: any) {
        return id !== 'not_existing_route';
      },

      getState() {
        return 'initial-state';
      },

      subscribe: jest.fn((fn: any) => {
        listener = fn;
      }),
    };

    const runListener = () => listener('new-state');

    return { router, runListener };
  };

  it('should subscribe to change router state', () => {
    const { router } = createData();

    createMiddleware(router)({ dispatch: () => {} } as any);
    expect(router.subscribe).toBeCalledTimes(1);
  });

  it('should dispatch action after change state', () => {
    const dispatch = jest.fn();
    const { router, runListener } = createData();

    createMiddleware(router)({ dispatch } as any);
    runListener();

    expect(dispatch).toBeCalledWith({
      payload: 'new-state',
      type: SYNC,
    });
  });

  it('should mark route as not found for MARK_AS_NOT_FOUND action', () => {
    const { router } = createData();
    const middleware = createMiddleware(router)({ dispatch: () => {} } as any);
    const next = jest.fn();

    middleware(next)({ type: MARK_AS_NOT_FOUND });

    expect(next).not.toBeCalled();
    expect(router.push).not.toBeCalled();
    expect(router.replace).not.toBeCalled();
    expect(router.markAsNotFound).toBeCalledTimes(1);
  });

  it('should run next action if route not exist', () => {
    const { router } = createData();
    const middleware = createMiddleware(router)({ dispatch: () => {} } as any);
    const next = jest.fn();

    middleware(next)({ type: 'not_existing_route' });

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({ type: 'not_existing_route' });
    expect(router.push).not.toBeCalled();
    expect(router.replace).not.toBeCalled();
    expect(router.markAsNotFound).not.toBeCalled();
  });

  it('should push route', () => {
    const { router } = createData();
    const middleware = createMiddleware(router)({ dispatch: () => {} } as any);

    middleware((() => {}) as any)({ type: 'router/HOME' });
    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith('router/HOME', {
      params: undefined,
      queryParams: undefined,
    });
    expect(router.replace).not.toBeCalled();

    router.push.mockClear();
    middleware((() => {}) as any)({
      type: 'router/HOME',
      payload: { action: 'push', params: 'params', queryParams: 'queryParams' },
    });
    expect(router.push).toBeCalledTimes(1);
    expect(router.push).toBeCalledWith('router/HOME', {
      params: 'params',
      queryParams: 'queryParams',
    });
    expect(router.replace).not.toBeCalled();
  });

  it('should replace route', () => {
    const { router } = createData();
    const middleware = createMiddleware(router)({ dispatch: () => {} } as any);

    middleware((() => {}) as any)({
      type: 'router/HOME',
      payload: { action: 'replace' },
    });
    expect(router.replace).toBeCalledTimes(1);
    expect(router.replace).toBeCalledWith('router/HOME', {
      params: undefined,
      queryParams: undefined,
    });
    expect(router.push).not.toBeCalled();

    router.replace.mockClear();
    middleware((() => {}) as any)({
      type: 'router/HOME',
      payload: {
        action: 'replace',
        params: 'params',
        queryParams: 'queryParams',
      },
    });
    expect(router.replace).toBeCalledTimes(1);
    expect(router.replace).toBeCalledWith('router/HOME', {
      params: 'params',
      queryParams: 'queryParams',
    });
    expect(router.push).not.toBeCalled();
  });
});

describe('createReducer', () => {
  const router: any = { getState: () => 'default-state' };

  it('should return default state', () => {
    const reducer = createReducer(router);

    expect(reducer(undefined, { type: 'foo' })).toBe('default-state');
  });

  it('should return state from action', () => {
    const reducer = createReducer(router);

    expect(reducer(undefined, { type: SYNC, payload: 'action-state' })).toBe(
      'action-state',
    );
  });

  it('should return previous state if not matched action', () => {
    const reducer = createReducer(router);

    expect(reducer('new-state' as any, { type: 'foo' })).toBe('new-state');
  });
});
