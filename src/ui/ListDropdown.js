import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Icon from './Icon';

class ListDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;
    const { value } = this.props;
    return (
      <div>
        {value}
        <div className="inline-block">
          <div
            onClick={() => {
              this.setState({ isOpen: !isOpen });
            }}
          >
            <Icon className="inline-block fa-sm gray pl1" type="caret-down" size={20} />
          </div>
          {isOpen && (
            <div className="ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3">
              {this.renderDropdownOptions()}
            </div>
          )}
        </div>
      </div>
    );
  }

  renderDropdownOptions = () => {
    const { dropdown, record } = this.props;
    return dropdown.map(item => (
      <div
        key={item.name}
        onClick={() => item.onSelect(record)}
        className="p1 nowrap fs12 pl1 py1/2 pointer action-button-item"
      >
        {item.name}
      </div>
    ));
  };

  handleClickOutside = () => this.setState({ isOpen: false });
}

ListDropdown.defaultProps = {
  value: '',
};

ListDropdown.propTypes = {
  value: PropTypes.string,
  dropdown: PropTypes.array.isRequired,
  record: PropTypes.object.isRequired,
};

export default onClickOutside(ListDropdown);
