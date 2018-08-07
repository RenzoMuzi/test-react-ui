import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Checkbox({
  value, viewOnly, onChange, className, blackCheckbox,
}) {
  const classes = classNames('checkbox', 'inline', className, {
    'black-checkbox': blackCheckbox,
  });

  return (
    <input
      type="checkbox"
      className={classes}
      checked={value}
      disabled={viewOnly}
      onChange={({ target: { checked } }) => onChange(checked)}
    />
  );
}

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  value: false,
  viewOnly: false,
  onChange: () => {},
  className: '',
  blackCheckbox: false,
};

Checkbox.propTypes = {
  /** Checked value */
  value: PropTypes.bool,
  /** Specifies whether is checkeable or not */
  viewOnly: PropTypes.bool,
  /** onChange event handler */
  onChange: PropTypes.func,
  /** CSS classes names */
  className: PropTypes.string,
  /** Specifies whether is a black checkbox or not */
  blackCheckbox: PropTypes.bool,
};
