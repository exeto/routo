import React, { useCallback, forwardRef, ReactNode, ElementType } from 'react';
import { useRouterState, useRouter } from '@routo/react';

import { clsx } from './utils';

type Props = {
  id: string;
  params?: object;
  queryParams?: object;
  action?: 'PUSH' | 'REPLACE';
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
    action,
    children,
    className,
    activeClassName,
    component = 'a',
    onClick = () => {},
  } = props;

  const router = useRouter();
  const { pathname } = useRouterState();
  const Component = component;
  const href = null;
  const activeClass = href === pathname ? activeClassName : null;

  const handleClick = useCallback(
    event => {
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      event.preventDefault();

      router.transitionTo(id, {
        action,
        params,
        queryParams,
      });

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
