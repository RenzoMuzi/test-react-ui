import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import onClickOutside from 'react-onclickoutside';

import ContextualMenu from './ContextualMenu';
import Icon from './Icon';

export class ActionIcon extends PureComponent {
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
      icon,
      iconSize,
      actions,
      className,
      dropdownClassName,
    } = this.props;

    return (
      <div className="relative">
        <Icon
          className={classNames('inline-block fa-sm gray pl1', className)}
          type={icon}
          size={iconSize}
          onFocus={() => this.setState({ isOpen: true })}
          onMouseDown={() => this.setState(prevState => ({ isOpen: !prevState.isOpen }))}
        />
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

ActionIcon.displayName = 'ActionIcon';

ActionIcon.defaultProps = {
  icon: 'cog',
  iconSize: 16,
  className: '',
  dropdownClassName: '',
};

ActionIcon.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.number,
  className: PropTypes.string,
  dropdownClassName: PropTypes.string,
  actions: PropTypes.array.isRequired,
};

export default onClickOutside(ActionIcon);
