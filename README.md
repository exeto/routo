# routo

> Simple router for Redux

## Install

```sh
yarn add @routo/core
```

## Usage

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createRouter } from '@routo/core';

const routes = [
  {
    type: 'router/HOME',
    path: '/',
  },
  {
    type: 'router/POST',
    path: '/posts/:id',
  },
];

const { reducer, middleware } = createRouter(routes);
const rootReducer = combineReducers({ router: reducer });
const store = createStore(rootReducer, applyMiddleware(middleware));
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me/)
