import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../fonts/style.css';
import Icon from './Icon';

class DropdownHeader extends Component {
  render() {
    const {
      containerClassName,
      selectIcon,
      isOpen,
    } = this.props;
    return (
      <div
        className={containerClassName}
      >
        <span className="inline-block">{this.renderText()}</span>
        {selectIcon && <Icon
          type={isOpen ? 'caret-up' : 'caret-down'}
          size={16}
          className="inline-block fa-lg gray-border-color"
        />}
      </div>
    );
  }

  renderText() {
    const {
      placeholder,
      label,
    } = this.props;
    if (label) {
      return label;
    }
    return placeholder;
  }
}

DropdownHeader.defaultProps = {
  placeholder: 'Select',
  label: null,
  containerClassName: 'flex justify-between border border-silver rounded pointer fs12 pointer p1',
  selectIcon: true,
  isOpen: false,
};

DropdownHeader.propTypes = {
  /** DropdownHeader placeholder */
  placeholder: PropTypes.string,
  /** DropdownHeader label when selected */
  label: PropTypes.string,
  /** CSS Class names for the dropdown container */
  containerClassName: PropTypes.string,
  /** Show select icon or not */
  selectIcon: PropTypes.bool,
  /** Dropdown is open or not */
  isOpen: PropTypes.bool,
};

export default DropdownHeader;
