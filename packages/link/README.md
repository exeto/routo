# @routo/link

> React Link component for @routo/core

## Install

```sh
yarn add @routo/core @routo/react @routo/link
```

## Usage

The `Link` component must have access to the router context, see [@routo/react](/packages/react/README.md) for details.

```js
import Link from '@routo/link';

const Home = () => (
  <Link to="router/POST" params={{ id: '42' }}>
    Post #42
  </Link>
);
```

## Props

| Name            | Type                | Default | Description                                                                                |
| --------------- | ------------------- | ------- | ------------------------------------------------------------------------------------------ |
| to \*           | string              |         | Route ID.                                                                                  |
| params          | object              |         |                                                                                            |
| queryParams     | object              |         |                                                                                            |
| action          | 'push' \| 'replace' | 'push'  |                                                                                            |
| children        | node                |         | The content of the link.                                                                   |
| className       | string              |         | Applied to the root element.                                                               |
| activeClassName | string              |         | Applied to the root element when current url opened.                                       |
| component       | elementType         | 'a'     | The component used for the root node. Either a string to use a DOM element or a component. |
| onClick         | function            |         | Called after updating the current route.                                                   |

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
