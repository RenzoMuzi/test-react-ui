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

const TabTitle = ({
  title, active, onClick, className, activeClassname,
}) => (
  <li
    onClick={onClick}
    className={classNames('flex flex-center p1 inline-block pointer', className, { [activeClassname]: active })}
  >
    {title}
  </li>
);

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    const { active } = props;
    this.tabNames = this.getTabs().map(tab => tab.props.name);

    this.state = {
      activeTab: active ? Math.max(this.tabNames.indexOf(active), 0) : 0,
    };
  }


  componentWillReceiveProps(nextProps) {
    const { active } = nextProps;
    this.tabNames = this.getTabs().map(tab => tab.props.name);

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
    const { spaced, containerClassname } = this.props;
    const { activeTab } = this.state;

    const tabs = this.getTabs();
    const activeChildrenTab = React.cloneElement(tabs[activeTab]);
    const leftTabTitles = tabs
      .filter(tab => !tab.props.right)
      .map(this.renderTabTitle);

    const rightTabTitles = tabs
      .filter(tab => tab.props.right)
      .map((tab, index) => this.renderTabTitle(tab, index + leftTabTitles.length));

    return (
      <div>
        <ul className={classNames('m0 list-reset flex justify-between', containerClassname)}>
          <div
            className={classNames('flex inline-block full-width', {
              'justify-between': spaced,
            })}
            style={{ marginBottom: '-1px' }}
          >
            {leftTabTitles}
          </div>
          <div
            className={classNames('flex inline-block full-width justify-end', {
              'justify-between': spaced,
            })}
            style={{ marginBottom: '-1px' }}
          >
            {rightTabTitles}
          </div>
        </ul>
        {activeChildrenTab}
      </div>
    );
  }

  renderTabTitle = (tab, index) => {
    const { activeTab } = this.state;
    const { className, subtab, activeClassname } = this.props;

    const Component = subtab ? SubtabTitle : TabTitle;

    return (
      <Component
        key={index}
        title={tab.props.title}
        active={activeTab === index}
        to={tab.props.to}
        className={className}
        activeClassname={activeClassname}
        onClick={() => this.handleOnTabClicked(index, tab.props.name)}
      />
    );
  };

  getTabs = () => {
    const children = React.Children.toArray(this.props.children)
      .filter(child => (child && child.type && child.type.displayName === 'Tab'));
    const rightTabs = children.filter(tab => tab.props.right);
    const leftTabs = children.filter(tab => !tab.props.right);
    return leftTabs.concat(rightTabs);
  };
}

export const Tab = ({ className, children }) => (
  <div className={className}>{React.Children.toArray(children)}</div>
);

SubtabTitle.displayName = 'SubtabTitle';

SubtabTitle.defaultProps = { onClick: () => {} };

SubtabTitle.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Tabs.displayName = 'Tabs';

Tabs.defaultProps = {
  className: 'rounded-top weight-400 fs13 mr1',
  activeClassname: 'border border-top border-gray border-bottom-white weight-700',
  containerClassname: 'border-bottom border-gray',
  subtab: false,
  spaced: false,
  children: null,
  onTabChange: () => { },
};

Tabs.propTypes = {
  /** Active tab */
  active: PropTypes.string.isRequired,
  /** Custom CSS class name for the tab */
  className: PropTypes.string,
  /** Custom CSS class name for the tab active state */
  activeClassname: PropTypes.string,
  /** Custom CSS class name for the tabs container */
  containerClassname: PropTypes.string,
  /** Has subtabs or not */
  subtab: PropTypes.bool,
  /** Tabs are distributed on the container width */
  spaced: PropTypes.bool,
  /** Tab components */
  children: PropTypes.node,
  /** onchange event handler */
  onTabChange: PropTypes.func,
};

TabTitle.displayName = 'TabTitle';

TabTitle.defaultProps = { onClick: () => {} };

TabTitle.propTypes = {
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string.isRequired,
  activeClassname: PropTypes.string.isRequired,
};

Tab.displayName = 'Tab';

Tab.defaultProps = {
  children: null,
  className: null,
};

Tab.propTypes = {
  /** Custom CSS class name */
  className: PropTypes.string,
  /** Tab content */
  children: PropTypes.node,
};

export default Tabs;
