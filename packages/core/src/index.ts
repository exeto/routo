import { createBrowserHistory } from 'history';

import {
  Route,
  Router,
  State,
  Options,
  Listener,
  LocationDescriptor,
} from './types';
import { createRouteStorage } from './routes';
import { createState, stringifyQueryParams } from './utils';
import { NOT_FOUND } from './consts';

export { NOT_FOUND, Router, State };

export const createRouter = (routes: Route[], options?: Options): Router => {
  const notFoundRoute = {
    id: NOT_FOUND,
    path: options?.notFoundPath || '/404',
  };

  const history = options?.history || createBrowserHistory();
  const routeStorage = createRouteStorage(notFoundRoute, routes);
  let state = createState(routeStorage, history.location);
  let listeners: Listener[] = [];

  const notify = () => {
    const currentListeners = listeners.slice();

    currentListeners.forEach((listener) => listener(state));
  };

  history.listen((location, action) => {
    state = {
      ...createState(routeStorage, location),
      action,
      prev: { ...state, prev: null },
    };

    notify();
  });

  const getLocationData = (id: string, data?: LocationDescriptor) => {
    const route = routeStorage.getById(id);
    const pathname = route.createPathname(data?.params || {});
    const search = stringifyQueryParams(data?.queryParams || {});

    return { pathname, search };
  };

  return {
    getState() {
      return state;
    },

    subscribe(fn) {
      listeners.push(fn);

      const unsubscribe = () => {
        const index = listeners.indexOf(fn);

        listeners.splice(index, 1);
      };

      return unsubscribe;
    },

    push(id, data) {
      history.push(getLocationData(id, data));
    },

    replace(id, data) {
      history.replace(getLocationData(id, data));
    },

    markAsNotFound() {
      state = {
        ...state,
        id: NOT_FOUND,
        action: 'REPLACE',
        prev: { ...state, prev: null },
      };

      notify();
    },

    createHref(id, data) {
      const { pathname, search } = getLocationData(id, data);

      return `${pathname}${search}`;
    },

    hasId(id) {
      if (id === NOT_FOUND) {
        return true;
      }

      const route = routeStorage.getById(id);

      return route.id !== NOT_FOUND;
    },
  };
};
