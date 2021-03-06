import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
    const { prefix } = this.props;

    return prefix ? this.renderWithPrefix() : this.renderInput();
  }

  renderWithPrefix() {
    const { prefix, prefixClassName } = this.props;

    const prefixStyles = classNames(
      'center width-32px input-prefix',
      prefixClassName,
    );

    return (
      <div className="flex flex-row">
        <span className={prefixStyles}>{prefix}</span>
        {this.renderInput()}
      </div>
    );
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
      type,
      viewOnly,
    } = this.props;

    const inputClassName = classNames(
      'input flex mb0 field',
      className,
      { 'with-prefix': !!prefix },
    );

    const disabledClassName = 'input flex mb0 field bg-gray gray-secondary';

    return (
      <input
        type={type}
        ref={inputRef}
        className={viewOnly ? disabledClassName : inputClassName}
        maxLength={maxLength}
        onBlur={this.handleOnBlur}
        onKeyDown={this.handleOnKeyDown}
        onChange={this.handleOnChange}
        placeholder={placeholder}
        value={value || ''}
        autoFocus={autoFocus}
        disabled={viewOnly}
      />
    );
  }
}

Input.displayName = 'Input';

Input.defaultProps = {
  type: 'text',
  autoFocus: false,
  className: '',
  prefixClassName: '',
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
  /** Input type. Could be either text or password */
  type: PropTypes.oneOf(['text', 'password']),
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
  /** Css class to customize the prefix */
  prefixClassName: PropTypes.string,
};

export default Input;
