import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

const SubtabTitle = ({ title, active, onClick }) => (
  <li
    onClick={onClick}
    className={classNames(
      'flex flex-center mr1 pc-px2 pt2 py1 inline-block fs13 pointer',
      { 'border-bottom-medium border-bottom-orange orange-primary': active },
    )}
  >
    {title}
  </li>
);

const TabTitle = ({ title, active, onClick }) => (
  <li
    onClick={onClick}
    className={classNames(
      'flex flex-center mr1 p1 inline-block rounded-top weight-400 fs13 pointer',
      {
        'border border-top border-gray border-bottom-white weight-700': active,
      },
    )}
  >
    {title}
  </li>
);

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    const { children, active } = props;
    this.tabNames = children.map(tab => tab.props.name);

    this.state = {
      activeTab: active ? Math.max(this.tabNames.indexOf(active), 0) : 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { children, active } = nextProps;
    this.tabNames = children.map(tab => tab.props.name);

    if (active) {
      this.setState({ activeTab: Math.max(this.tabNames.indexOf(active), 0) });
    }
  }

  handleOnTabClicked = (index, name) => {
    const { onTabChange } = this.props;

    if (onTabChange) {
      onTabChange(index, name);
    } else {
      this.setState({ activeTab: index });
    }
  };

  render() {
    const { children, spaced } = this.props;
    const { activeTab } = this.state;

    const tabs = React.Children.toArray(children);

    const activeChildrenTab = React.cloneElement(tabs[activeTab]);
    const tabTitles = tabs.map(this.renderTabTitle);

    return (
      <div>
        <ul className="m0 list-reset flex border-bottom border-gray">
          <div
            className={classNames('flex inline-block full-width', {
              'justify-between': spaced,
            })}
            style={{ marginBottom: '-1px' }}
          >
            {tabTitles}
          </div>
        </ul>
        {activeChildrenTab}
      </div>
    );
  }

  renderTabTitle = (tab, index) => {
    const { activeTab } = this.state;
    const { className, subtab } = this.props;

    const Component = subtab ? SubtabTitle : TabTitle;

    return (
      <Component
        key={index}
        title={tab.props.title}
        active={activeTab === index}
        to={tab.props.to}
        className={className}
        onClick={() => this.handleOnTabClicked(index, tab.props.name)}
      />
    );
  };
}

export const Tab = ({ className, children }) => (
  <div className={className}>{React.Children.toArray(children)}</div>
);

SubtabTitle.defaultProps = { onClick: () => {} };

SubtabTitle.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Tabs.defaultProps = {
  className: null,
  subtab: false,
  spaced: false,
  children: null,
  onTabChange: () => {},
};

Tabs.propTypes = {
  active: PropTypes.string.isRequired,
  className: PropTypes.string,
  subtab: PropTypes.bool,
  spaced: PropTypes.bool,
  children: PropTypes.node,
  onTabChange: PropTypes.func,
};

TabTitle.defaultProps = { onClick: () => {} };

TabTitle.defaultProps = { onClick: () => {} };

TabTitle.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Tab.defaultProps = {
  children: null,
  className: null,
};

Tab.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Tabs;
