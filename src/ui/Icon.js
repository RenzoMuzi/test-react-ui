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

Icon.defaultProps = {
  className: '',
  style: {},
};

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Icon;
