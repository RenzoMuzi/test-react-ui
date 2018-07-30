import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Icon from './Icon';
import FloatingList from './FloatingList';

class ListDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { isOpen } = this.state;
    const {
      value,
      url,
      dropdown,
    } = this.props;

    return (
      <div className="no-wrap">
        <a
          className="a-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
        <div className="inline-block pointer">
          <div
            onClick={() => {
              this.setState({ isOpen: !isOpen });
            }}
          >
            <Icon className="inline-block fa-sm gray hover-orange-primary pl1" type="caret-down" size={20} />
          </div>
          {isOpen && (
            <FloatingList
              items={dropdown}
              renderItem={this.renderDropdownOption}
              onSelect={this.handleItemSelection}
            />
          )}
        </div>
      </div>
    );
  }

  renderDropdownOption = (item) => (<span> {item.name} </span>);

  handleItemSelection = (item) => {
    const { record } = this.props;
    item.onSelect(record);
  }

  handleClickOutside = () => this.setState({ isOpen: false });
}

ListDropdown.defaultProps = {
  value: '',
  url: null,
};

ListDropdown.propTypes = {
  value: PropTypes.string,
  url: PropTypes.string,
  dropdown: PropTypes.array.isRequired,
  record: PropTypes.object.isRequired,
};

export default onClickOutside(ListDropdown);
