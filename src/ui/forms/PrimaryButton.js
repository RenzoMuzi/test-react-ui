import React from 'react';
import classNames from 'classnames';

import Button from './Button';

const PrimaryButton = props => (
  <Button
    {...props}
    className={classNames('pc-btn-primary', props.className)}
  />
);

PrimaryButton.propTypes = Button.propTypes;

export default PrimaryButton;
