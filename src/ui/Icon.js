import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = ({
  type, size, className, style = {}, ...otherProps
}) => (
  <i
    className={classNames(`fa fa-${type}`, className)}
    style={{ fontSize: size, ...style }}
    {...otherProps}
  />
);

Icon.displayName = 'Icon';

Icon.defaultProps = {
  className: '',
  style: {},
  size: 12,
};

Icon.propTypes = {
  /** Icon shape/type */
  type: PropTypes.string.isRequired,
  /** Icon size */
  size: PropTypes.number,
  /** CSS classes for custom styles */
  className: PropTypes.string,
  /** Javascript object for custom styles */
  style: PropTypes.object,
};

export default Icon;
