![routo](../../media/logo.svg)

# @routo/core

[![npm](https://flat.badgen.net/npm/v/@routo/core)](https://www.npmjs.com/package/@routo/core)
[![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/core)](https://bundlephobia.com/result?p=@routo/core)
[![coverage](https://flat.badgen.net/codecov/c/github/exeto/routo)](https://codecov.io/gh/exeto/routo)
[![license](https://flat.badgen.net/github/license/exeto/routo)](LICENSE.md)

> Simple framework-agnostic router

# THIS PACKAGE IS NO LONGER MAINTAINED

## Install

```sh
yarn add @routo/core
```

## Usage

```js
import { createRouter } from '@routo/core';

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

const unsubscribe = router.subscribe((state) => console.log(state.pathname));

router.replace(POST, { params: { id: '42' } });
// /posts/42

unsubscribe();
```

## State

```js
{
  id: 'router/POST',
  pathname: '/posts/42',
  search: '',
  queryParams: {},
  action: 'PUSH',
  params: { id: '42' },
  prev: {
    id: 'router/HOME',
    pathname: '/',
    search: '',
    queryParams: {},
    action: null,
    params: {}
    prev: null,
  }
}
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
