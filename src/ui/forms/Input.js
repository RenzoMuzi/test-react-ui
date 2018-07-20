import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ViewOnlyInput from './ViewOnlyInput';

export const IntegerRegex = /^\d{0,9}$/;

class Input extends Component {
  handleOnBlur = e => {
    const { target: { value } } = e;

    this.props.onBlur(value);
  };

  handleOnChange = e => {
    const { target: { value } } = e;
    const { validRegex, onChange } = this.props;

    if (!validRegex || value.match(validRegex) !== null) {
      onChange(value);
    }
  };

  handleOnKeyDown = e => {
    const { onSubmit } = this.props;

    const { key, target: { value } } = e;

    if (key === 'Enter') {
      onSubmit(value);
    }
  };

  render() {
    const { viewOnly, prefix } = this.props;

    if (viewOnly) {
      return this.renderAsViewOnly();
    }

    return prefix ? this.renderWithPrefix() : this.renderInput();
  }

  renderWithPrefix() {
    const { prefix } = this.props;

    return [
      <span className="center width-32px input-prefix">{prefix}</span>,
      this.renderInput(),
    ];
  }

  renderInput() {
    const {
      placeholder,
      className,
      inputRef,
      maxLength,
      value,
      autoFocus,
      prefix,
    } = this.props;

    const inputClassName = classNames(
      'input col-12 mb0 field',
      className,
      { 'with-prefix': !!prefix },
    );

    return (
      <input
        type="text"
        ref={inputRef}
        className={inputClassName}
        maxLength={maxLength}
        onBlur={this.handleOnBlur}
        onKeyDown={this.handleOnKeyDown}
        onChange={this.handleOnChange}
        placeholder={placeholder}
        value={value || ''}
        autoFocus={autoFocus}
      />
    );
  }

  renderAsViewOnly() {
    const { value } = this.props;

    return <ViewOnlyInput value={value} />;
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  autoFocus: false,
  className: '',
  inputRef: () => {},
  maxLength: null,
  placeholder: '',
  validRegex: null,
  value: '',
  viewOnly: false,
  prefix: null,
  onBlur: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

Input.propTypes = {
  /** CSS class to customize the component */
  className: PropTypes.string,
  /** Reference to be handled from parent */
  inputRef: PropTypes.func,
  /** Maximum amount of characters */
  maxLength: PropTypes.number,
  /** Placeholder value */
  placeholder: PropTypes.string,
  /** Input value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Regex to be satisfied */
  validRegex: PropTypes.object,
  /** Enables or disables the Input */
  viewOnly: PropTypes.bool,
  /** Input's onBlur handler */
  onBlur: PropTypes.func,
  /** Input's onChange handler */
  onChange: PropTypes.func,
  /** Submit callback funciton */
  onSubmit: PropTypes.func,
  /** Input's autofocus */
  autoFocus: PropTypes.bool,
  /** Renders a prefix */
  prefix: PropTypes.string,
};

export default Input;
