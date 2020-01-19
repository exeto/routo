import { createBrowserHistory, History } from 'history';

import { Route, State } from './types';
import { createRouteStorage } from './routes';
import { getInitialState, getParams, parseQueryParams } from './utils';
import { NOT_FOUND } from './consts';

export { NOT_FOUND };

type Options = {
  history?: History;
};

type Listener = (state: State) => void;

type Unsubscribe = () => void;

export type Router = {
  getState(): State;
  subscribe(listener: Listener): Unsubscribe;
};

export const createRouter = (routes: Route[], options?: Options): Router => {
  const history = options?.history || createBrowserHistory();
  const routeStorage = createRouteStorage(routes);
  let state = getInitialState(routeStorage, history);
  let listeners: Listener[] = [];

  const notify = () => {
    listeners.forEach(listener => listener(state));
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
      prev: null,
    };

    notify();
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
  };
};
