![routo](../../media/logo.svg)

# @routo/redux

[![npm](https://flat.badgen.net/npm/v/@routo/redux)](https://www.npmjs.com/package/@routo/redux)
[![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/redux)](https://bundlephobia.com/result?p=@routo/redux)
[![coverage](https://flat.badgen.net/codecov/c/github/exeto/routo)](https://codecov.io/gh/exeto/routo)
[![license](https://flat.badgen.net/github/license/exeto/routo)](LICENSE.md)

> Redux bindings package for @routo/core

# THIS PACKAGE IS NO LONGER MAINTAINED

## Install

```sh
yarn add @routo/core @routo/redux
```

## Usage

```js
import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { createRouter } from '@routo/core';
import {
  createReducer,
  createMiddleware,
  Provider as RoutoProvider,
} from '@routo/redux';

const routes = [
  {
    id: 'router/HOME',
    path: '/',
  },
  {
    id: 'router/POST',
    path: '/posts/:id',
  },
];

const router = createRouter(routes);

const rootReducer = combineReducers({
  router: createReducer(router),
});

const routoMiddleware = createMiddleware(router);
const middlewares = applyMiddleware(routoMiddleware);
const store = createStore(rootReducer, middlewares);

const Root = () => (
  <ReduxProvider store={store}>
    <RoutoProvider router={router}>
      <App />
    </RoutoProvider>
  </ReduxProvider>
);
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
