import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    const { value, viewOnly, onChange } = this.props;

    return (
      <input
        type="checkbox"
        className="checkbox inline"
        checked={value}
        disabled={viewOnly}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
    );
  }
}

Checkbox.displayName = 'Checkbox';

Checkbox.defaultProps = {
  value: false,
  viewOnly: false,
  onChange: () => {},
};

Checkbox.propTypes = {
  /** Checked value */
  value: PropTypes.bool,
  /** Specifies wether is checkeable or not */
  viewOnly: PropTypes.bool,
  /** onChange event handler */
  onChange: PropTypes.func,
};

export default Checkbox;
