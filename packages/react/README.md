# @routo/react

> React bindings package for @routo/core

## Install

```sh
yarn add @routo/react
```

## Usage

```js
import { createRouter } from '@routo/core;
import { Provider } from '@routo/react';

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

const Root = () => (
  <Provider router={router}>
    <App />
  </Provider>
);
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
