import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import FloatingList from './FloatingList';

class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeOption: null,
    };
  }

  handleOnChange = (option, index) => {
    this.props.onChange(index);
    this.setState({ isOpen: false });
  };

  render() {
    const { className, label, options } = this.props;
    const { isOpen } = this.state;

    const selectClassName = classNames(
      'pt0 pb0 flex flex-center justify-between orange-primary no-outline rounded pointer border-none',
      { 'orange-primary-active': isOpen },
      className,
    );

    return (
      <div className="relative full-width fs-12">
        <div
          role="button"
          tabIndex={0}
          className={selectClassName}
          onFocus={() => this.setState({ isOpen: true })}
          onMouseDown={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
        >
          {label}
        </div>
        {isOpen &&
          <FloatingList
            items={Array.isArray(options) ? options : [options]}
            onSelect={this.handleOnChange}
          />
        }
      </div>
    );
  }

  renderOption(key, label, index) {
    const { activeOption } = this.state;
    const optionClassName = classNames('p1 nowrap custom-select-option pointer', {
      active: activeOption === index,
    });

    return (
      <div
        role="button"
        tabIndex={0}
        key={index}
        className={optionClassName}
        onClick={() => this.handleOnChange(key)}
        onMouseMove={() => this.setState({ activeOption: index })}
      >
        <span>{label}</span>
      </div>
    );
  }

  renderDropdown() {
    const { options } = this.props;

    return Object.keys(options).map((key, i) => {
      const optionLabel = options[key].label;
      return this.renderOption(key, optionLabel, i + 1);
    });
  }

  handleClickOutside() {
    this.setState({ isOpen: false });
  }
}

CustomDropdown.displayName = 'CustomDropdown';

CustomDropdown.defaultProps = {
  className: '',
  label: 'add sorting',
};

CustomDropdown.propTypes = {
  /** Dropdown's label */
  label: PropTypes.string,
  /** Dropdown's onChange callback function */
  onChange: PropTypes.func.isRequired,
  /** Dropdown's options */
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  /** CSS classes for custom styles */
  className: PropTypes.string,
};

export default onClickOutside(CustomDropdown);
