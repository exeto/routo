import React, { useCallback, forwardRef, ReactNode, ElementType } from 'react';
import { useRouterState, useRouter } from '@routo/react';

import { clsx } from './utils';

type Props = {
  id: string;
  params?: object;
  queryParams?: object;
  action?: 'push' | 'replace';
  children?: ReactNode;
  className?: string;
  activeClassName?: string;
  component?: ElementType;
  onClick?(): void;
};

const Link = forwardRef(function Link(props: Props, ref) {
  const {
    id,
    params,
    queryParams,
    action = 'push',
    children,
    className,
    activeClassName,
    component = 'a',
    onClick = () => {},
  } = props;

  const router = useRouter();
  const { pathname } = useRouterState();
  const Component = component;
  const href = router.createHref(id, { params, queryParams });
  const activeClass = href === pathname ? activeClassName : null;

  const handleClick = useCallback(
    event => {
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      event.preventDefault();
      router[action](id, { params, queryParams });

      onClick();
    },
    [action, id, onClick, params, queryParams, router],
  );

  return (
    <Component
      ref={ref}
      href={href}
      className={clsx(className, activeClass)}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
});

export default Link;
