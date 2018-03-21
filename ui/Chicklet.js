import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Chicklet = ({ children, className, onClick }) => (
  <div
    onClick={() => onClick()}
    className={classNames('mr1 rounded', className)}
    style={{ padding: 2 }}
  >
    {children}
  </div>
);

Chicklet.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Chicklet.defaultProps = {
  className: '',
  onClick: () => {},
};

export default Chicklet;
