import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withPopover } from 'lib/ui/Popover';

import ViewOnlyText from './ViewOnlyText';

class Textarea extends Component {
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
  className: PropTypes.string,
  inputRef: PropTypes.func,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  validRegex: PropTypes.object,
  viewOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,
};

export default withPopover(Textarea);
