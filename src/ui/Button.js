import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({
  btnClassName, labelClassName, disabled, label, onClick,
}) => (
  <button
    disabled={disabled}
    className={classNames('pc-btn', btnClassName)}
    onClick={onClick}
  >
    <span className={labelClassName}>{label}</span>
  </button>
);

Button.displayName = 'Button';

Button.defaultProps = {
  btnClassName: 'pc-btn',
  labelClassName: 'mx1',
  disabled: false,
  label: '',
  onClick: () => {},
};

Button.propTypes = {
  /** CSS Class names for the button  */
  btnClassName: PropTypes.string,
  /** CSS Class names for the button content */
  labelClassName: PropTypes.string,
  /** Can be clicked or not */
  disabled: PropTypes.bool,
  /** Button label */
  label: PropTypes.string,
  /** onClick event handler */
  onClick: PropTypes.func,
};

export default Button;
