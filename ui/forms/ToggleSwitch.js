import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ToggleSwitch extends Component {
  render() {
    const { value, viewOnly, onChange } = this.props;

    const sliderClassName = classNames('slider', {
      'cursor-default': viewOnly,
      pointer: !viewOnly,
    });

    const onChangeHandler = viewOnly
      ? null
      : ({ target: { checked } }) => onChange(checked);

    return (
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={onChangeHandler}
          readOnly={viewOnly}
        />
        <span className={sliderClassName} />
      </label>
    );
  }
}

ToggleSwitch.defaultProps = {
  value: false,
  viewOnly: false,
  onChange: () => {},
};

ToggleSwitch.propTypes = {
  value: PropTypes.bool,
  viewOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default ToggleSwitch;
