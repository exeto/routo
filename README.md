![routo](./media/logo.svg)

[![npm](https://flat.badgen.net/npm/v/@routo/core)](https://www.npmjs.com/package/@routo/core)
[![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/core)](https://bundlephobia.com/result?p=@routo/core)
[![coverage](https://flat.badgen.net/codecov/c/github/exeto/routo)](https://codecov.io/gh/exeto/routo)
[![license](https://flat.badgen.net/github/license/exeto/routo)](LICENSE.md)

> Simple framework-agnostic router

# THIS PACKAGE IS NO LONGER MAINTAINED

Example of use - [react-starter](https://github.com/exeto/react-starter)

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

## Packages

| Package                          | Size                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [`@routo/core`](packages/core)   | [![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/core)](https://bundlephobia.com/result?p=@routo/core)   |
| [`@routo/link`](packages/link)   | [![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/link)](https://bundlephobia.com/result?p=@routo/link)   |
| [`@routo/react`](packages/react) | [![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/react)](https://bundlephobia.com/result?p=@routo/react) |
| [`@routo/redux`](packages/redux) | [![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/@routo/redux)](https://bundlephobia.com/result?p=@routo/redux) |

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
