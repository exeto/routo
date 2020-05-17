![routo](/media/logo.svg)

# @routo/react

> React bindings package for @routo/core

## Install

```sh
yarn add @routo/core @routo/react
```

## Usage

```js
import { createRouter, NOT_FOUND } from '@routo/core';
import { Provider, useRouterState } from '@routo/react';

const HOME = 'router/HOME';
const POST = 'router/POST';

const routes = [
  {
    id: HOME,
    path: '/',
  },
  {
    id: POST,
    path: '/posts/:id',
  },
];

const router = createRouter(routes);

const mapping = {
  [HOME]: () => 'Home',
  [POST]: () => 'Post',
  [NOT_FOUND]: () => 'Not Found',
};

const Router = () => {
  const state = useRouterState();
  const Component = mapping[state.id];

  return <Component />;
};

const Root = () => (
  <Provider router={router}>
    <Router />
  </Provider>
);
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
