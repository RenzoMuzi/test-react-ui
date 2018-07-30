import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

class FloatingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: null,
    };
  }

  render() {
    return (
      <div className="ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3">
        {this.renderListItems()}
      </div>
    );
  }

  renderItem(item, index) {
    const { activeItem } = this.state;
    const { onSelect, renderItem } = this.props;
    const itemClassName = classNames('p1 nowrap custom-select-option pointer', {
      active: activeItem === index,
    });

    return (
      <div
        role="button"
        tabIndex={0}
        key={index}
        className={itemClassName}
        onClick={() => onSelect(index, item)}
        onMouseMove={() => this.setState({ activeItem: index })}
      >
        {renderItem(item, index)}
      </div>
    );
  }

  renderListItems() {
    const { items } = this.props;
    return items.map((item, index) => this.renderItem(item, index));
  }
}


const OptionShape = PropTypes.shape({
  label: PropTypes.string,
});

FloatingList.displayName = 'FloatingList';

FloatingList.propTypes = {
  /** Item selection callback function */
  onSelect: PropTypes.func.isRequired,
  /** List's item */
  items: PropTypes.arrayOf(
    PropTypes.shape(OptionShape),
  ).isRequired,
  /** Item render function, use this to cutomize de content of each cell */
  renderItem: PropTypes.func,
};

FloatingList.defaultProps = {
  renderItem: (item) => (<span> {item.label} </span>),
};

export default onClickOutside(FloatingList);

