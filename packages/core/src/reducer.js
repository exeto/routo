import { omit, pick } from 'ramda';

export const createReducer = ({ routes, initialState }) => {
  return (state = initialState, action) => {
    const route = routes.getByType(action.type);

    if (route) {
      return {
        type: route.type,
        ...pick(['pathname', 'search', 'queryParams', 'action'], action.meta),
        params: action.payload || {},
        prev: omit(['prev'], state),
      };
    }

    return state;
  };
};
