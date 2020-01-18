import { createBrowserHistory, History } from 'history';

import { Route, State } from './types';
import { createRouteStorage } from './routes';
import { getInitialState } from './utils';

export { NOT_FOUND } from './consts';

export type Router = {
  getState(): State;
};

type Options = {
  history?: History;
};

export const createRouter = (routes: Route[], options?: Options): Router => {
  const history = options?.history || createBrowserHistory();
  const routeStorage = createRouteStorage(routes);
  const state = getInitialState(routeStorage, history);

  return {
    getState(): State {
      return state;
    },
  };
};
