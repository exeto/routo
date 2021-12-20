/* eslint-disable no-console */
import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { Provider, useRouter, useRouterState } from '../src';

describe('useRouter', () => {
  it('should throw error if no router instance in context', () => {
    const { result } = renderHook(() => useRouter());

    expect(result.error).toEqual(
      Error(
        'Could not find @routo/react context value; please ensure the component is wrapped in a <Provider>',
      ),
    );
  });

  it('should return router instance', () => {
    const router = 'router-context';
    const wrapper: FC = ({ children }) => (
      <Provider router={router as any}>{children}</Provider>
    );
    const { result } = renderHook(() => useRouter(), { wrapper });

    expect(result.current).toBe(router);
  });
});

describe('useRouterState', () => {
  const createData = () => {
    const unsubscribe = jest.fn();
    let listener: any = null;

    const router = {
      getState() {
        return 'initial-state';
      },

      subscribe: jest.fn((fn: any) => {
        listener = fn;

        return unsubscribe;
      }),
    };

    const wrapper: FC = ({ children }) => (
      <Provider router={router as any}>{children}</Provider>
    );

    const runListener = () => listener('new-state');

    return { router, wrapper, runListener, unsubscribe };
  };

  it('should return router state', () => {
    const { wrapper } = createData();
    const { result } = renderHook(() => useRouterState(), { wrapper });

    expect(result.current).toBe('initial-state');
  });

  it('should subscribe to change router state', () => {
    const { router, wrapper, runListener } = createData();
    const { result } = renderHook(() => useRouterState(), { wrapper });

    act(runListener);

    expect(result.current).toBe('new-state');
    expect(router.subscribe).toBeCalledTimes(1);
  });

  it('should unsubscribe from change router state', () => {
    const { wrapper, unsubscribe } = createData();
    const { unmount } = renderHook(() => useRouterState(), { wrapper });

    expect(unsubscribe).not.toBeCalled();

    unmount();
    expect(unsubscribe).toBeCalledTimes(1);
  });

  it('should prevent setState on unmounted component', async () => {
    const { wrapper, runListener } = createData();
    const { unmount } = renderHook(() => useRouterState(), { wrapper });
    const actualError = console.error;

    console.error = jest.fn();

    unmount();
    act(runListener);

    expect(console.error).not.toBeCalled();

    console.error = actualError;
  });
});
