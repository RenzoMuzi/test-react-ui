import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import ContextualMenu from './ContextualMenu';
import Icon from './Icon';

class ActionButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleOnActionClicked = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    const {
      title,
      actions,
      className,
      dropdownClassName,
    } = this.props;

    return (
      <div className="relative">
        <div
          className={classNames('flex justify-center items-center pointer action-button', className)}
          onFocus={() => this.setState({ isOpen: true })}
          onMouseDown={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
        >
          {title}
          <Icon className="inline-block fa-sm gray pl1" type="caret-down" size={16} />
        </div>
        <ContextualMenu
          actions={actions}
          isOpen={isOpen}
          className={dropdownClassName}
          onActionClicked={this.handleOnActionClicked}
        />
      </div>
    );
  }

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
