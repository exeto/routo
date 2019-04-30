import { createBrowserHistory } from 'history';

import { createMiddleware } from './middleware';
import { createReducer } from './reducer';
import { createRoutes } from './routes';
import { getInitialState, createToPath } from './utils';
import { NOT_FOUND } from './consts';

export { createToPath, NOT_FOUND };

export const createRouter = (rawRoutes, options = {}) => {
  const routes = createRoutes(rawRoutes);
  const basename = options.basename || '';
  const history = options.history || createBrowserHistory({ basename });
  const initialState = getInitialState({ routes, history });

  return Object.freeze({
    middleware: createMiddleware({ routes, history }),
    reducer: createReducer({ routes, initialState }),
  });
};
