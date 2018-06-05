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

ToggleSwitch.displayName = 'ToggleSwitch';

ToggleSwitch.defaultProps = {
  value: false,
  viewOnly: false,
  onChange: () => {},
};

ToggleSwitch.propTypes = {
  /** Switch value */
  value: PropTypes.bool,
  /** Disables edition */
  viewOnly: PropTypes.bool,
  /** onChange callback function */
  onChange: PropTypes.func,
};

export default ToggleSwitch;
