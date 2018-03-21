import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ className, disabled, label, onClick }) => (
  <button
    disabled={disabled}
    className={classNames('pc-btn', className)}
    onClick={onClick}
  >
    <span className="mx1">{label}</span>
  </button>
);

Button.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
