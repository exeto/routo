# @routo/redux

> Redux bindings package for @routo/core

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
