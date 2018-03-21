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

Checkbox.defaultProps = {
  value: false,
  viewOnly: false,
  onChange: () => {},
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  viewOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Checkbox;
