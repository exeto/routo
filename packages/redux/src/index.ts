import { Middleware, Reducer } from 'redux';
import { Router } from '@routo/core';

export const SYNC_TYPE = '@@routo/SYNC';

export const createMiddleware = (router: Router): Middleware => {
  return ({ dispatch, getState }) => {
    router.subscribe(state => dispatch({ type: SYNC_TYPE, payload: state }));

    return next => action => {
      const { type, payload } = action;

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
) => (action.type === SYNC_TYPE ? action.payload : state);
