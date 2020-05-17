import '@testing-library/jest-dom';

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createRouter } from '@routo/core';
import { Provider } from '@routo/react';

import Link from '../src';

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

  const createCustomRouter = () => {
    const history = createMemoryHistory();

    return createRouter(routes, { history });
  };

  it('should render simple link', () => {
    const router = createCustomRouter();

    const { getByText } = render(
      <Provider router={router}>
        <Link to={HOME}>Home</Link>
      </Provider>,
    );

    const link = getByText('Home');

    expect(link).toHaveAttribute('href', '/');
  });

  it('should render parameterized link', () => {
    const router = createCustomRouter();

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
    const router = createCustomRouter();

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

  it('should change router state after click', () => {
    const router = createCustomRouter();

    expect(router.getState()).toMatchSnapshot();

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POSTS}>Posts</Link>
      </Provider>,
    );

    fireEvent.click(getByText('Posts'));

    expect(router.getState()).toMatchSnapshot();
  });

  it('should change router state after click with replace action', () => {
    const router = createCustomRouter();

    expect(router.getState()).toMatchSnapshot();

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POSTS} action="replace">
          Posts
        </Link>
      </Provider>,
    );

    fireEvent.click(getByText('Posts'));

    expect(router.getState()).toMatchSnapshot();
  });

  it('should render custom component', () => {
    const router = createCustomRouter();

    const Component = (props: any) => <span {...props} data-testid="button" />;

    const { getByTestId } = render(
      <Provider router={router}>
        <Link to={POSTS} component={Component}>
          Posts
        </Link>
      </Provider>,
    );

    const button = getByTestId('button');

    expect(button.tagName).toBe('SPAN');
    expect(button).toHaveAttribute('href', '/posts');
  });

  it('should check className prop', () => {
    const router = createCustomRouter();

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POSTS} className="foo">
          Posts
        </Link>
      </Provider>,
    );

    expect(getByText('Posts')).toHaveClass('foo');
  });

  it('should add class when route is active', () => {
    const router = createCustomRouter();

    router.push(POSTS);

    const { getByText, rerender } = render(
      <Provider router={router}>
        <Link to={HOME} activeClassName="foo">
          Home
        </Link>
      </Provider>,
    );

    const link = getByText('Home');

    expect(link).not.toHaveClass('foo');

    rerender(
      <Provider router={router}>
        <Link to={POSTS} activeClassName="foo">
          Posts
        </Link>
      </Provider>,
    );

    expect(link).toHaveClass('foo');
  });

  it('should run onClick prop after click on link', () => {
    const handleClick = jest.fn();
    const router = createCustomRouter();

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POSTS} onClick={handleClick}>
          Posts
        </Link>
      </Provider>,
    );

    expect(handleClick).not.toBeCalled();
    fireEvent.click(getByText('Posts'));
    expect(handleClick).toBeCalledTimes(1);
  });

  it('should not handle click when metaKey is pressed', () => {
    const handleClick = jest.fn();
    const router = createCustomRouter();

    const { getByText } = render(
      <Provider router={router}>
        <Link to={POSTS} onClick={handleClick}>
          Posts
        </Link>
      </Provider>,
    );

    const routerState = router.getState();
    const link = getByText('Posts');

    // For prevent errors because jsdom does not support navigation
    link.addEventListener('click', (event) => event.preventDefault());

    fireEvent.click(link, { metaKey: true });
    fireEvent.click(link, { altKey: true });
    fireEvent.click(link, { ctrlKey: true });
    fireEvent.click(link, { shiftKey: true });

    expect(handleClick).not.toBeCalled();
    expect(routerState).toMatchSnapshot();
  });
});
