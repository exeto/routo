import { compile } from 'path-to-regexp';
import { omit, path } from 'ramda';

import { NOT_FOUND } from './consts';
import {
  isActive,
  getParams,
  parseQueryParams,
  stringifyQueryParams,
  getHistoryMethod,
} from './utils';

export const createMiddleware = ({ routes, history }) => {
  return ({ dispatch, getState }) => {
    history.listen((location, action) => {
      if (isActive(location, getState().router)) {
        return;
      }

      const { pathname, search } = location;
      const route = routes.getByPathname(pathname);

      dispatch({
        type: route.type,
        payload: getParams(route, pathname),
        meta: {
          action,
          silent: true,
          queryParams: parseQueryParams(search),
        },
      });
    });

    return next => action => {
      const route = routes.getByType(action.type);

      if (!route) {
        return next(action);
      }

      const queryParams = path(['meta', 'queryParams'], action) || {};

      const meta = {
        action: 'PUSH',
        ...omit(['silent'], action.meta),
        queryParams,
        search: stringifyQueryParams(queryParams),
        pathname:
          route.type === NOT_FOUND
            ? history.location.pathname
            : compile(route.path)(action.payload),
      };

      const result = next({ ...action, meta });
      const isSilent = path(['meta', 'silent'], action);

      if (!isSilent && route.type !== NOT_FOUND) {
        const method = getHistoryMethod(meta.action);

        history[method]({
          pathname: meta.pathname,
          search: meta.search,
        });
      }

      return result;
    };
  };
};
