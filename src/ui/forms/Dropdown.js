import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import classNames from 'classnames';
import find from 'lodash/find';
import flatMap from 'lodash/flatMap';
import flatMapDeep from 'lodash/flatMapDeep';
import get from 'lodash/get';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import invoke from 'lodash/invoke';
import { withPopover } from '../Popover';
import ViewOnlyText from './ViewOnlyText';

const txCreator = (key, length, ctx) => prevState => {
  const delta = key === 'ArrowDown' ? 1 : -1;
  const isIncrement = delta > 0;
  const newIndex = prevState.activeOption + delta;
  const condition = isIncrement ? newIndex > length - 1 : newIndex < 0;
  const resetValue = isIncrement ? 0 : length - 1;

  const activeOption = prevState.activeOption === null || condition ? resetValue : newIndex;

  invoke(ctx[`option${activeOption}`], 'scrollIntoView', {
    behavior: 'instant',
    block: 'nearest',
    inline: 'center',
  });
  return { activeOption, isOpen: true };
};

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeOption: null,
    };
  }

  handleOnChange = option => {
    const { options, onChange } = this.props;

    const hasCode = !isEmpty(options) && has(options[0], 'code');
    this.setState({ isOpen: false });
    if (option && hasCode) {
      onChange(option.value, option.code);
    } else if (option && !hasCode) {
      onChange(option.value);
    } else if (!option && hasCode) {
      onChange(null, null);
    } else {
      onChange(null);
    }
  };

  render() {
    const {
      inputRef,
      viewOnly,
      className,
      containerClass,
    } = this.props;
    const { isOpen } = this.state;

    if (viewOnly) {
      return this.renderAsViewOnly();
    }

    return (
      <div ref={inputRef} className={classNames('relative full-width fs12', containerClass)}>
        <div
          ref={ref => {
            this.selectDiv = ref;
          }}
          className={classNames('flex flex-center justify-between border rounded pointer', className)}
          onFocus={() => this.setState({ isOpen: true })}
          onMouseDown={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
          onKeyDown={this.handleKeyPress}
        >
          {this.renderSelectedValue()}
          <i className="inline-block fa fa-caret-down fa-lg pl1" />
        </div>
        {isOpen && (
          <div className="absolute bg-white z3 full-width border border-gray gray-primary rounded max-height-4 overflow-y-scroll">
            {this.renderDropdown()}
          </div>
        )}
      </div>
    );
  }

  renderSeparator(index) {
    const className = classNames('dropdown-hr');
    return <hr key={index} className={className} />;
  }

  renderDropdownTitle() {
    const { title } = this.props;
    return title || 'Select...';
  }

  renderTitle(title, index) {
    const className = classNames('dropdown-title p1');
    return (
      <div key={index} className={className}>
        {title.toUpperCase()}
      </div>
    );
  }

  renderOption(option, index, indented) {
    const {
      separator, title, label, optionLabel, disabled,
    } = option;
    const { activeOption } = this.state;
    const isActive = activeOption === index;
    const optionClassName = classNames(
      'p1',
      { 'custom-select-option pointer': !disabled },
      { gray: disabled },
      { pl3: indented },
      { active: isActive },
    );

    if (separator) {
      return this.renderSeparator(index);
    }

    if (title) {
      return this.renderTitle(title, index);
    }

    return (
      <div
        ref={ref => {
          this[`option${index}`] = ref;
        }}
        key={index}
        className={optionClassName}
        onClick={() => !disabled && this.handleOnChange(option)}
        onMouseMove={() => this.setState({ activeOption: index })}
      >
        {!optionLabel ? (
          <span>{label}</span>
        ) : (
          optionLabel.map((optionText, i) => (
            <div key={i} className={classNames({ fs12: i > 0 })}>
              {optionText}
            </div>
          ))
        )}
      </div>
    );
  }

  renderSelectedValue() {
    const { value, options } = this.props;

    const allOptions = flatMapDeep(options, option => option.value);
    const selectedOption =
      options instanceof Array
        ? find(options, ['value', value])
        : find(allOptions, ['value', value]) || find(allOptions, ['label', value]);

    return selectedOption ? selectedOption.label : this.renderDropdownTitle();
  }

  renderDropdown() {
    const { options, includeBlank } = this.props;
    const headerOption = label => ({ label, value: label, disabled: true });

    const dropdownOptions = Array.isArray(options)
      ? options.map((option, i) => this.renderOption(option, i + 1))
      : flatMap(options, ({ label, value }, i) => [
        this.renderOption(headerOption(label), i + 1),
        ...value.map((option, ndex) => this.renderOption(option, i + ndex + 1, true)),
      ]);
    const blankOption = includeBlank ?
      this.renderOption({ label: this.renderDropdownTitle(), value: null, code: null }, 0)
      : [];

    return [
      ...blankOption,
      ...dropdownOptions,
    ];
  }

  renderAsViewOnly() {
    const { options, value } = this.props;

    const selectedOption = options.find(option => isEqual(option.value, value));

    const selectedLabel = get(selectedOption, 'label');

    return <ViewOnlyText value={selectedLabel} />;
  }

  handleClickOutside() {
    this.setState({ isOpen: false });
  }

  handleKeyPress = event => {
    const { options, includeBlank } = this.props;
    const blankOption = includeBlank ? { label: 'Select...', value: null, code: null } : {};
    const allOptions = [...blankOption, ...options];

    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.setState(txCreator(event.key, allOptions.length, this));
        break;
      case 'Tab':
      case 'Escape':
        this.setState({ isOpen: false });
        break;
      case 'Enter': {
        event.preventDefault();
        const { activeOption } = this.state;
        const option = allOptions[activeOption];
        if (!option.disabled) this.handleOnChange(option);
        break;
      }
      default:
        event.preventDefault();
        break;
    }
  };
}

Dropdown.defaultProps = {
  inputRef: () => {},
  onChange: () => {},
  className: '',
  containerClass: '',
  title: null,
  value: null,
  includeBlank: true,
  viewOnly: false,
};

Dropdown.propTypes = {
  inputRef: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        title: PropTypes.string,
        separator: PropTypes.bool,
        optionLabel: PropTypes.array,
        value: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.object,
          PropTypes.string,
          PropTypes.bool,
        ]),
      }),
    ),
    PropTypes.object,
  ]).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  title: PropTypes.string,
  includeBlank: PropTypes.bool,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  viewOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default withPopover(enhanceWithClickOutside(Dropdown));
