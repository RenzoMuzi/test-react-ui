import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from './Button';

const PrimaryButton = props => (
  <Button
    className={classNames('pc-btn-primary', props.className)}
    disabled={props.disabled}
    label={props.label}
    onClick={props.onClick}
  />
);

PrimaryButton.displayName = 'PrimaryButton';

PrimaryButton.defaultProps = {
  className: 'pc-btn-primary',
  disabled: false,
  label: '',
  onClick: () => {},
};

PrimaryButton.propTypes = {
  /** CSS Class names */
  className: PropTypes.string,
  /** Can be clicked or not */
  disabled: PropTypes.bool,
  /** Button label */
  label: PropTypes.string,
  /** onClick event handler */
  onClick: PropTypes.func,
};

export default PrimaryButton;
