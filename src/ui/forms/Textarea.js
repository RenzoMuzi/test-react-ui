import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withPopover } from '../Popover';
import ViewOnlyText from './ViewOnlyText';

export class Textarea extends Component {
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
    const {
      placeholder,
      className,
      inputRef,
      maxLength,
      value,
      viewOnly,
      autoFocus,
    } = this.props;

    if (viewOnly) {
      return this.renderAsViewOnly();
    }

    const textAreaClassName = classNames('textarea', className);

    return (
      <textarea
        ref={inputRef}
        className={textAreaClassName}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value || ''}
        autoFocus={autoFocus}
        onChange={this.handleOnChange}
        onKeyDown={this.handleOnKeyDown}
      />
    );
  }

  renderAsViewOnly() {
    const { value } = this.props;

    return <ViewOnlyText value={value} />;
  }
}

Textarea.displayName = 'Textarea';

Textarea.defaultProps = {
  className: '',
  maxLength: 120,
  placeholder: '',
  value: '',
  validRegex: null,
  viewOnly: false,
  autoFocus: false,
  inputRef: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

Textarea.propTypes = {
  /** CSS class to customize the component */
  className: PropTypes.string,
  /** Reference to be handled from parent */
  inputRef: PropTypes.func,
  /** Maximum characters count */
  maxLength: PropTypes.number,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Text value */
  value: PropTypes.string,
  /** Regex to be satisfied */
  validRegex: PropTypes.object,
  /** Disables edition */
  viewOnly: PropTypes.bool,
  /** onChange textarea's handler */
  onChange: PropTypes.func,
  /** onSubmit textarea's handler */
  onSubmit: PropTypes.func,
  /** Enables auto focus */
  autoFocus: PropTypes.bool,
};

const TextareaWithPopover = withPopover(Textarea);
TextareaWithPopover.displayName = 'Textarea';

export default TextareaWithPopover;
