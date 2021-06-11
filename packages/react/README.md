![routo](../../media/logo.svg)

# @routo/react

[![npm](https://flat.badgen.net/npm/v/@routo/react)](https://www.npmjs.com/package/@routo/react)
[![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/react)](https://bundlephobia.com/result?p=@routo/react)
[![coverage](https://flat.badgen.net/codecov/c/github/exeto/routo)](https://codecov.io/gh/exeto/routo)
[![license](https://flat.badgen.net/github/license/exeto/routo)](LICENSE.md)

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
