import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { createToPath } from '@routo/core';

import withData from './withData';
import { clsx } from './utils';

export const createLink = routes => {
  const getUrl = (type, params) => {
    const route = routes.find(item => item.type === type);
    const toPath = createToPath(route.path);

    return toPath(params);
  };

  const Link = props => {
    const {
      to,
      pathname,
      children,
      dispatch,
      className,
      activeClassName,
      component,
      onClick,
    } = props;

    const Component = component;
    const href = getUrl(to.type, to.payload);
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
        href={href}
        className={clsx(className, activeClass)}
        onClick={handleClick}
      >
        {children}
      </Component>
    );
  };

  Link.propTypes = {
    to: PropTypes.shape({
      type: PropTypes.string.isRequired,
      payload: PropTypes.object,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
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

  return withData(Link);
};
