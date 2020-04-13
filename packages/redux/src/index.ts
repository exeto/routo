import { Middleware, Reducer } from 'redux';
import { Router, State } from '@routo/core';

export const SYNC = '@@routo/SYNC';

export const MARK_AS_NOT_FOUND = '@@routo/MARK_AS_NOT_FOUND';

export const markAsNotFound = () => ({ type: MARK_AS_NOT_FOUND });

export const createMiddleware = <S = any>(
  router: Router,
): Middleware<{}, S> => {
  return ({ dispatch }) => {
    router.subscribe((state) => dispatch({ type: SYNC, payload: state }));

    return (next) => (action) => {
      const { type, payload } = action;

      if (type === MARK_AS_NOT_FOUND) {
        router.markAsNotFound();

        return;
      }

      if (!router.hasId(type)) {
        return next(action);
      }

      const routerAction: 'push' | 'replace' = payload?.action || 'push';

      router[routerAction](action.type, {
        params: payload?.params,
        queryParams: payload?.queryParams,
      });
    };
  };
};

export const createReducer = (router: Router): Reducer<State> => (
  state = router.getState(),
  action,
) => (action.type === SYNC ? action.payload : state);
