import { Middleware, Reducer } from 'redux';
import { Router, State, LocationDescriptor } from '@routo/core';

export type ActionPayload = LocationDescriptor & {
  action?: 'push' | 'replace';
};

export type Action = {
  type: string;
  payload?: ActionPayload;
};

export const SYNC = '@@routo/SYNC';

export const MARK_AS_NOT_FOUND = '@@routo/MARK_AS_NOT_FOUND';

export const markAsNotFound = () => ({ type: MARK_AS_NOT_FOUND });

export const createMiddleware = <S = any>(
  router: Router,
): Middleware<{}, S> => {
  return ({ dispatch }) => {
    router.subscribe((state) => dispatch({ type: SYNC, payload: state }));

    return (next) => (action: Action) => {
      const { type, payload } = action;

      if (type === MARK_AS_NOT_FOUND) {
        router.markAsNotFound();

        return;
      }

      if (!router.hasId(type)) {
        // eslint-disable-next-line consistent-return
        return next(action);
      }

      const routerAction = payload?.action || 'push';

      router[routerAction](action.type, {
        params: payload?.params,
        queryParams: payload?.queryParams,
      });
    };
  };
};

export const createReducer =
  (router: Router): Reducer<State> =>
  // eslint-disable-next-line @typescript-eslint/default-param-last
  (state = router.getState(), action) =>
    action.type === SYNC ? action.payload : state;
