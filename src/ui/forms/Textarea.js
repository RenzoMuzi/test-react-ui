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
      showLimit,
      limitClassName,
      containerClassName,
    } = this.props;

    if (viewOnly) {
      return this.renderAsViewOnly();
    }

    const textAreaClassName = classNames('textarea', className);

    return (
      <div className={classNames('full-width', containerClassName)}>
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
        {maxLength && !viewOnly && showLimit && (
          <div className="flex justify-end">
            <span className={limitClassName}>{maxLength - value.length} characters remaining</span>
          </div>
        )}
      </div>
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
  containerClassName: '',
  limitClassName: 'fs-12 red p1/2',
  maxLength: 120,
  placeholder: '',
  value: '',
  validRegex: null,
  viewOnly: false,
  autoFocus: false,
  showLimit: false,
  inputRef: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

Textarea.propTypes = {
  /** CSS class to customize the component */
  className: PropTypes.string,
  /** CSS class to customize the container component */
  containerClassName: PropTypes.string,
  /** CSS class to customize the limit counter */
  limitClassName: PropTypes.string,
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
  /** Enables limit counter for number of characters */
  showLimit: PropTypes.bool,
};

const TextareaWithPopover = withPopover(Textarea);
TextareaWithPopover.displayName = 'Textarea';

export default TextareaWithPopover;
