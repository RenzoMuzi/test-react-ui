import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeOption: null,
    };
  }

  handleOnChange = option => {
    this.props.onChange(option);
    this.setState({ isOpen: false });
  };

  render() {
    const { className, label } = this.props;
    const { isOpen } = this.state;

    const selectClassName = classNames(
      ' pt0 pb0 flex flex-center justify-between orange-primary px1 rounded pointer border-none',
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
          onMouseDown={() =>
            this.setState(prevState => ({ isOpen: !prevState.isOpen }))
          }
        >
          {label}
        </div>
        {isOpen && (
          <div className="absolute bg-white width-150px z3 border border-gray rounded max-height-4">
            {this.renderDropdown()}
          </div>
        )}
      </div>
    );
  }

  renderOption(key, label, index) {
    const { activeOption } = this.state;
    const optionClassName = classNames('p1 custom-select-option pointer', {
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

CustomDropdown.defaultProps = {
  className: '',
  label: '',
};

CustomDropdown.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
};

export default onClickOutside(CustomDropdown);
