import React, { useCallback, forwardRef, ReactNode, ElementType } from 'react';
import { useRouterState, useRouter } from '@routo/react';

import { clsx } from './utils';

type Props = {
  to: string;
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
    to,
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
  const href = router.createHref(to, { params, queryParams });
  const activeClass = href === pathname ? activeClassName : null;

  const handleClick = useCallback(
    event => {
      if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      event.preventDefault();
      router[action](to, { params, queryParams });

      onClick();
    },
    [action, to, onClick, params, queryParams, router],
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
