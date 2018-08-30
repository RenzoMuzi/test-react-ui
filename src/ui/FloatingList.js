import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FloatingList extends Component {
  render() {
    const { containerClassName } = this.props;
    return (
      <div className={containerClassName}>
        {this.renderListItems()}
      </div>
    );
  }

  renderItem(item, index) {
    const { itemClassName } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        key={index}
        className={itemClassName}
      >
        {item.title && this.renderTitle(item.title)}
        {item.label && this.renderLabel(item)}
        {item.separator && this.renderSeparator()}
        {item.customItem && this.renderCustomItem(item)}
      </div>
    );
  }

  renderLabel(item) {
    const { labelClassName } = this.props;
    return (
      <div
        onClick={() => (this.handleSelect(item))}
        className={labelClassName}
      >
        <span>{item.label}</span>
      </div>
    );
  }

  renderCustomItem(item) {
    const { customItemClassName } = this.props;
    const Item = item.customItem;
    return (
      <div
        onClick={() => (this.handleSelect(item))}
        className={customItemClassName}
      >
        {Item}
      </div>
    );
  }

  renderListItems() {
    const { items } = this.props;
    return items.map((item, index) => this.renderItem(item, index));
  }

  renderSeparator() {
    const { separatorClassName } = this.props;
    return <div className={separatorClassName} />;
  }

  renderTitle(title) {
    const { titleClassName } = this.props;
    return (
      <div className={titleClassName}>
        {title.toUpperCase()}
      </div>
    );
  }

  handleSelect(item) {
    const { handleSelect } = this.props;
    const { value, handleItemSelect } = item;
    if (!item.disabled || !value) {
      if (handleItemSelect) {
        handleItemSelect();
      } else {
        handleSelect(value, item);
      }
    }
  }
}


const OptionShape = PropTypes.shape({
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
});

FloatingList.displayName = 'FloatingList';

FloatingList.propTypes = {
  /** Function to be call when selecting an item */
  handleSelect: PropTypes.func,
  /** List's item */
  items: PropTypes.arrayOf(
    PropTypes.shape(OptionShape),
  ),
  /** CSS Class names for the list container */
  containerClassName: PropTypes.string,
  /** CSS Class names for each item on the list */
  itemClassName: PropTypes.string,
  /** CSS Class names for the titel row */
  titleClassName: PropTypes.string,
  /** CSS Class names for the separator row */
  separatorClassName: PropTypes.string,
  /** CSS Class names for the label row */
  labelClassName: PropTypes.string,
  /** CSS Class names for the cutomItem row */
  customItemClassName: PropTypes.string,
};

FloatingList.defaultProps = {
  handleSelect: () => {},
  items: [],
  titleClassName: 'dropdown-title p1',
  separatorClassName: 'action-button-separator',
  labelClassName: 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item',
  itemClassName: '',
  customItemClassName: '',
  containerClassName: 'ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll ',
};

export default FloatingList;
