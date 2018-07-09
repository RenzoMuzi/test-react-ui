import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ContextualMenu extends PureComponent {
  handleOnClick = action => () => {
    this.props.onActionClicked();
    action();
  };

  render() {
    const { isOpen, actions, className } = this.props;

    if (!isOpen) return null;

    return (
      <div
        className={classNames(
          'absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3',
          className,
        )}
      >
        {actions.map((action, i, arr) => this.renderAction(action, i, arr.length))}
      </div>
    );
  }

  renderSeparator = () => <div className="action-button-separator" />;

  renderTitle = title => {
    if (!title) return null;

    return (
      <div key={title} className="sky-blue py1/2 pl1 fs12 weight-600">
        {title.toUpperCase()}
      </div>
    );
  };

  renderAction = (action, index, count) => {
    const { title, items } = action;

    const actionItems = items.map(item => (
      <div
        key={item.name}
        onClick={this.handleOnClick(item.onSelect)}
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
}

ContextualMenu.displayName = 'ContextualMenu';

ContextualMenu.defaultProps = {
  isOpen: false,
  className: '',
  onActionClicked: () => {},
};

ContextualMenu.propTypes = {
  isOpen: PropTypes.bool,
  className: PropTypes.string,
  actions: PropTypes.array.isRequired,
  onActionClicked: PropTypes.func,
};

export default ContextualMenu;
