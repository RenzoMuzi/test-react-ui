import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  className, disabled, label, onClick,
}) => (
  <button
    disabled={disabled}
    className={classNames('pc-btn', className)}
    onClick={onClick}
  >
    <span className="mx1">{label}</span>
  </button>
);

Button.displayName = 'Button';

Button.defaultProps = {
  className: 'pc-btn',
  disabled: false,
  label: '',
  onClick: () => {},
};

Button.propTypes = {
  /** CSS Class names */
  className: PropTypes.string,
  /** Can be clicked or not */
  disabled: PropTypes.bool,
  /** Button label */
  label: PropTypes.string,
  /** onClick event handler */
  onClick: PropTypes.func,
};

export default Button;
