# @routo/core

> Simple framework-agnostic router

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

const unsubscribe = router.subscribe(state => console.log(state.pathname));

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
