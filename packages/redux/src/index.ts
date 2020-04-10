import { Middleware, Reducer } from 'redux';
import { Router } from '@routo/core';

export const SYNC = '@@routo/SYNC';

export const MARK_AS_NOT_FOUND = '@@routo/MARK_AS_NOT_FOUND';

export const markAsNotFound = () => ({ type: MARK_AS_NOT_FOUND });

export const createMiddleware = (router: Router): Middleware => {
  return ({ dispatch, getState }) => {
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

export const createReducer = (router: Router): Reducer => (
  state = router.getState(),
  action,
) => (action.type === SYNC ? action.payload : state);
