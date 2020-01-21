# @routo/link

> React Link component for @routo/core

## Install

```sh
yarn add @routo/link
```

## Usage

```js
import { createLink } from '@routo/link';

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

const Link = createLink(routes);

const Home = () => (
  <ul>
    {posts.map(post => (
      <li key={post.id}>
        <Link to={{
          type: 'router/POST',
          payload: {
            id: String(post.id),
          },
        }}
      </li>
    ))}
  </ul>
);
```

## Props

| Name            | Type      | Default | Description                                                                                |
| --------------- | --------- | ------- | ------------------------------------------------------------------------------------------ |
| to \*           | object    |         | Redux action. [Details](/packages/core/README.md#navigation).                              |
| children \*     | node      |         | The content of the link.                                                                   |
| className       | string    |         | Applied to the root element.                                                               |
| activeClassName | string    |         | Applied to the root element when current url opened.                                       |
| component       | Component | 'a'     | The component used for the root node. Either a string to use a DOM element or a component. |
| onClick         | function  |         | Called after updating the current route.                                                   |

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
