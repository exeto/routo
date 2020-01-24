import { createBrowserHistory, History } from 'history';

import { Route, State } from './types';
import { createRouteStorage } from './routes';
import {
  getInitialState,
  getParams,
  parseQueryParams,
  stringifyQueryParams,
} from './utils';
import { NOT_FOUND } from './consts';

export { NOT_FOUND };

type Options = {
  history?: History;
  notFoundPath?: string;
};

type Listener = (state: State) => void;

type Unsubscribe = () => void;

type LocationDescriptor = {
  params?: object;
  queryParams?: object;
};

export type Router = {
  getState(): State;
  subscribe(listener: Listener): Unsubscribe;
  push(id: string, data?: LocationDescriptor): void;
  replace(id: string, data?: LocationDescriptor): void;
  createHref(id: string, data?: LocationDescriptor): string;
};

export const createRouter = (routes: Route[], options?: Options): Router => {
  const notFoundRoute = {
    id: NOT_FOUND,
    path: options?.notFoundPath || '/404',
  };

  const history = options?.history || createBrowserHistory();
  const routeStorage = createRouteStorage(notFoundRoute, routes);
  let state = getInitialState(routeStorage, history);
  let listeners: Listener[] = [];

  const notify = () => {
    const currentListeners = listeners.slice();

    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i];

      listener(state);
    }
  };

  history.listen((location, action) => {
    const { pathname, search } = location;
    const route = routeStorage.getByPathname(pathname);

    state = {
      id: route?.id || NOT_FOUND,
      pathname,
      search,
      queryParams: parseQueryParams(search),
      action,
      params: getParams(route, pathname),
      prev: {
        ...state,
        prev: null,
      },
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

    createHref(id, data) {
      const { pathname, search } = getLocationData(id, data);

      return `${pathname}${search}`;
    },
  };
};
