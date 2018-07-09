import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';

export default class ShowMore extends React.Component {
  state = { open: false };

  render() {
    const { open } = this.state;
    const {
      children, iconClassName, className, showLessText, showMoreText,
    } = this.props;
    const type = open ? 'minus-square-o' : 'plus-square-o';

    return (
      <div>
        <div
          className={classNames(className, 'pointer')}
          onClick={this.toggle}
        >
          <Icon
            type={type}
            className={classNames('fa-fw', iconClassName)}
          />
          {open ? showLessText : showMoreText}
        </div>
        {open && children}
      </div>
    );
  }

  toggle = () => this.setState(state => ({ open: !state.open }))
}

ShowMore.defaultProps = {
  className: '',
  iconClassName: '',
  showMoreText: 'Show More',
  showLessText: 'Show Less',
  children: null,
};
ShowMore.propTypes = {
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  showMoreText: PropTypes.string,
  showLessText: PropTypes.string,
  children: PropTypes.node,
};
