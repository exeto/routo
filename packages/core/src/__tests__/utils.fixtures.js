import { notFoundRoute, simpleRoute, withParamsRoute } from './fixtures';

export const queryParamsString = '?sort=name&filters[age][eq]=25';

export const queryParams = {
  sort: 'name',
  filters: {
    age: {
      eq: '25',
    },
  },
};

export const createHistory = (pathname, search = '') => ({
  location: {
    pathname,
    search,
  },
});

export const createRoutes = () => ({
  getByPathname(pathname) {
    const mapping = {
      '/users/300': notFoundRoute,
      '/': simpleRoute,
      '/posts/42': withParamsRoute,
    };

    return mapping[pathname];
  },
});
