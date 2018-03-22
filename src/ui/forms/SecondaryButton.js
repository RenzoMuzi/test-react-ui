import classNames from 'classnames';
import React from 'react';

import Button from './Button';

const SecondaryButton = props => (
  <Button
    {...props}
    className={classNames('pc-btn-secondary', props.className)}
  />
);

SecondaryButton.propTypes = Button.propTypes;

export default SecondaryButton;
