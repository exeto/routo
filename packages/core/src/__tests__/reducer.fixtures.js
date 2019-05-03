import { NOT_FOUND } from '../consts';
import { notFoundRoute, simpleRoute, withParamsRoute } from './fixtures';

export const initialState = {
  action: null,
  params: {},
  pathname: '/',
  prev: null,
  queryParams: {},
  search: '',
  type: 'router/HOME',
};

export const createRoutes = () => {
  const mapping = {
    [NOT_FOUND]: notFoundRoute,
    'router/HOME': simpleRoute,
    'router/POST': withParamsRoute,
  };

  return {
    getByType: type => mapping[type] || null,
  };
};
