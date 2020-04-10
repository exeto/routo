import '@testing-library/jest-dom';

import React from 'react';
import { render } from '@testing-library/react';
import { createRouter } from '@routo/core';
import { Provider } from '@routo/react';

import Link from '../index';

describe('Link', () => {
  const HOME = 'router/HOME';
  const POSTS = 'router/POSTS';
  const POST = 'router/POST';

  const routes = [
    {
      id: HOME,
      path: '/',
    },
    {
      id: POSTS,
      path: '/posts',
    },
    {
      id: POST,
      path: '/posts/:id',
    },
  ];

  it('should render simple link', () => {
    const router = createRouter(routes);

    const { getByText } = render(
      <Provider router={router}>
        <Link to={HOME}>Home</Link>
      </Provider>,
    );

    const link = getByText('Home');

    expect(link).toHaveAttribute('href', '/');
  });

  it('should render parameterized link', () => {
    const router = createRouter(routes);

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POST} params={{ id: '42' }}>
          Post
        </Link>
      </Provider>,
    );

    const link = getByText('Post');

    expect(link).toHaveAttribute('href', '/posts/42');
  });

  it('should render simple link with query params', () => {
    const router = createRouter(routes);

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POSTS} queryParams={{ sort: 'date' }}>
          Posts
        </Link>
      </Provider>,
    );

    const link = getByText('Posts');

    expect(link).toHaveAttribute('href', '/posts?sort=date');
  });
});
