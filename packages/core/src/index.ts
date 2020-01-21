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
};

type Listener = (state: State) => void;

type Unsubscribe = () => void;

type LocationDescriptor = {
  params?: object;
  queryParams?: object;
  action?: 'PUSH' | 'REPLACE';
};

export type Router = {
  getState(): State;
  subscribe(listener: Listener): Unsubscribe;
  transitionTo(id: string, data?: LocationDescriptor): void;
};

export const createRouter = (routes: Route[], options?: Options): Router => {
  const history = options?.history || createBrowserHistory();
  const routeStorage = createRouteStorage(routes);
  let state = getInitialState(routeStorage, history);
  let listeners: Listener[] = [];

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
      prev: null,
    };

    listeners.forEach(listener => listener(state));
  });

  return {
    getState() {
      return state;
    },

    subscribe(fn) {
      listeners = [...listeners, fn];

      const unsubscribe = () => {
        listeners = listeners.filter(listener => listener !== fn);
      };

      return unsubscribe;
    },

    transitionTo(id, data) {
      const route = routeStorage.getById(id);
      const params = data?.params || {};
      const pathname = route ? route.createPathname(params) : '/404';
      const search = stringifyQueryParams(data?.queryParams || {});
      const options = { pathname, search };
      const action = data?.action || 'PUSH';

      if (action === 'PUSH') {
        history.push(options);
      } else if (action === 'REPLACE') {
        history.replace(options);
      }
    },
  };
};
