import classNames from 'classnames';
import React from 'react';

import Button from './Button';

const LinkButton = props => (
  <Button {...props} className={classNames('pc-btn-link', props.className)} />
);

LinkButton.displayName = 'LinkButton';

LinkButton.propTypes = Button.propTypes;

export default LinkButton;
