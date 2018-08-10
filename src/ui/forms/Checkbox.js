import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Checkbox = ({
  value,
  viewOnly,
  onChange,
  className,
}) => (
  <input
    type="checkbox"
    className={classNames('checkbox', 'inline', className)}
    checked={value}
    disabled={viewOnly}
    onChange={({ target: { checked } }) => onChange(checked)}
  />
);

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  value: false,
  viewOnly: false,
  onChange: () => {},
  className: '',
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
};

export default Checkbox;
