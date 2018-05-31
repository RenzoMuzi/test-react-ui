import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Chicklet = ({ children, className, onClick }) => (
  <div
    onClick={() => onClick()}
    className={classNames('mr1 rounded', className)}
  >
    {children}
  </div>
);

Chicklet.displayName = 'Chicklet';

Chicklet.propTypes = {
  /** Chicklet Content */
  children: PropTypes.node.isRequired,
  /** onClick Handler */
  onClick: PropTypes.func,
  /** Custom CSS class name */
  className: PropTypes.string,
};

Chicklet.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Chicklet;
