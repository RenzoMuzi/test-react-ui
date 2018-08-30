import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import find from 'lodash/find';

import { withPopover } from './Popover';
import DropdownHeader from './DropdownHeader';
import FloatingList from './FloatingList';

class CustomDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const {
      options,
      viewOnly,
      containerClassName,
      optionsContainerClassName,
      optionClassName,
      disabledOptionClassName,
      headerComponent,
      listContainerClassName,
      itemClassName,
      titleClassName,
      separatorClassName,
      labelClassName,
      customItemClassName,
      placeholder,
      headerContainerClassName,
    } = this.props;
    const { isOpen } = this.state;

    const Header = headerComponent;

    return (
      <div
        className={containerClassName}
        onClick={() => (!viewOnly ? this.setState({ isOpen: !isOpen }) : null)}
      >
        <Header
          placeholder={placeholder}
          isOpen={isOpen}
          label={this.getSelectedLabel()}
          containerClassName={headerContainerClassName}
        />
        {isOpen && (
          <FloatingList
            items={options}
            containerClassName={listContainerClassName}
            itemClassName={itemClassName}
            handleSelect={this.handleSelect}
            optionsContainerClassName={optionsContainerClassName}
            optionClassName={optionClassName}
            disabledOptionClassName={disabledOptionClassName}
            titleClassName={titleClassName}
            separatorClassName={separatorClassName}
            labelClassName={labelClassName}
            customItemClassName={customItemClassName}
          />
        )}
      </div>
    );
  }

  getSelectedLabel() {
    const { value, options } = this.props;
    const selectedOption = find(options, ['value', value]);
    return selectedOption ? selectedOption.label : null;
  }

  handleSelect = (value, item) => {
    const { handleSelect } = this.props;
    this.setState({ isOpen: false });
    handleSelect(value, item);
  };

  handleClickOutside = () => {
    this.setState({ isOpen: false });
  }
}

CustomDropdown.defaultProps = {
  containerClassName: undefined,
  optionsContainerClassName: undefined,
  optionClassName: undefined,
  disabledOptionClassName: undefined,
  listContainerClassName: undefined,
  itemClassName: undefined,
  titleClassName: undefined,
  separatorClassName: undefined,
  labelClassName: undefined,
  customItemClassName: undefined,
  headerContainerClassName: undefined,
  handleSelect: () => { },
  viewOnly: false,
  headerComponent: DropdownHeader,
  value: null,
  options: [],
  placeholder: null,
};

CustomDropdown.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  /** CustomDropdown options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      handleItemSelect: PropTypes.func,
      title: PropTypes.string,
      separator: PropTypes.bool,
      customItem: PropTypes.object,
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        PropTypes.string,
        PropTypes.bool,
      ]),
    }),
  ),
  /** Placeholder for the dropdown header */
  placeholder: PropTypes.string,
  /** CSS Class names for the dropdown container */
  containerClassName: PropTypes.string,
  /** CSS Class names for the list container */
  listContainerClassName: PropTypes.string,
  /** CSS Class names for the floating list container */
  itemClassName: PropTypes.string,
  /** CSS Class names for each item of the floating list */
  optionsContainerClassName: PropTypes.string,
  /** CSS Class names for default header container */
  headerContainerClassName: PropTypes.string,
  /** CSS Class names for each option item */
  optionClassName: PropTypes.string,
  /** CSS Class names for each disabled option item */
  disabledOptionClassName: PropTypes.string,
  /** CSS Class names for title option */
  titleClassName: PropTypes.string,
  /** CSS Class names for separator option */
  separatorClassName: PropTypes.string,
  /** CSS Class names for label option */
  labelClassName: PropTypes.string,
  /** CSS Class names for custom item option container */
  customItemClassName: PropTypes.string,
  /** onChange event handler */
  handleSelect: PropTypes.func,
  /** Value can be modified or not */
  viewOnly: PropTypes.bool,
  /** Component to be used as the header of the dropdown */
  headerComponent: PropTypes.func,
};

const enhancedCustomDropdown = withPopover(onClickOutside(CustomDropdown));
enhancedCustomDropdown.displayName = 'CustomDropdown';

export default enhancedCustomDropdown;
