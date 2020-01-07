import React, { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { createToPath } from '@routo/core';
import { useSelector, useDispatch } from 'react-redux';

import { getPathname } from './selectors';
import { clsx } from './utils';

export const createLink = routes => {
  const getUrl = (type, params) => {
    const route = routes.find(item => item.type === type);
    const toPath = createToPath(route.path);

    return toPath(params);
  };

  const Link = forwardRef(function Link(props, ref) {
    const {
      to,
      children,
      className,
      activeClassName,
      component,
      onClick,
    } = props;

    const Component = component;
    const href = getUrl(to.type, to.payload);
    const dispatch = useDispatch();
    const pathname = useSelector(getPathname);
    const activeClass = href === pathname ? activeClassName : null;

    const handleClick = useCallback(
      event => {
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
          return;
        }

        event.preventDefault();
        dispatch(to);
        onClick();
      },
      [to, dispatch, onClick],
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

  Link.propTypes = {
    to: PropTypes.shape({
      type: PropTypes.string.isRequired,
      payload: PropTypes.object,
    }).isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    component: PropTypes.elementType,
    onClick: PropTypes.func,
  };

  Link.defaultProps = {
    className: null,
    activeClassName: null,
    component: 'a',
    onClick: () => {},
  };

  return Link;
};
