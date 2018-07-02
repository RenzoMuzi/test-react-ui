import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import Icon from './Icon';

export class ActionButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleOnActionSelected = action => () => {
    this.setState({ isOpen: false });
    action();
  };

  render() {
    const { isOpen } = this.state;
    const { className, dropdownClassName } = this.props;

    return (
      <div className="relative btn-group">
        <div
          className={classNames('flex flex-center justify-between border rounded pointer btn', className)}
          onFocus={() => this.setState({ isOpen: true })}
          onMouseDown={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
        >
          {this.renderActionButtonTitle()}
          <Icon className="inline-block fa-sm gray pl1" type="caret-down" size={16} />
        </div>
        {isOpen && (
          <div
            className={classNames(
              'absolute border-bottom-shadow bg-white min-full-width flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3',
              dropdownClassName,
            )}
          >
            {this.renderDropdown()}
          </div>
        )}
      </div>
    );
  }

  renderSeparator = () => <div className="action-button-separator" />;

  renderActionButtonTitle = () => this.props.title;

  renderTitle = title => (
    <div key={title} className="sky-blue py1/2 pl1 fs12 weight-600">
      {title.toUpperCase()}
    </div>
  );

  renderAction = (action, index, count) => {
    const { title, items } = action;

    const actionItems = items.map(item => (
      <div
        key={item.name}
        onClick={this.handleOnActionSelected(item.onSelect)}
        className="p1 nowrap fs12 pl1 py1/2 pointer action-button-item"
      >
        <span>{item.name}</span>
      </div>
    ));

    return (
      <div key={action.title}>
        {this.renderTitle(title)}
        {actionItems}
        {index !== count - 1 && this.renderSeparator()}
      </div>
    );
  };

  renderDropdown = () =>
    this.props.actions.map((action, i, arr) => this.renderAction(action, i, arr.length));

  handleClickOutside = () => this.setState({ isOpen: false });
}

ActionButton.displayName = 'ActionButton';

ActionButton.defaultProps = {
  title: 'Actions',
  className: '',
  dropdownClassName: '',
};

ActionButton.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  dropdownClassName: PropTypes.string,
  actions: PropTypes.array.isRequired,
};

export default onClickOutside(ActionButton);
