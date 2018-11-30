import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const isEmpty = value => value === null || value === undefined || Number.isNaN(value) || value === '';

const ViewOnlyText = ({ value }) => {
  const className = classNames({
    'gray-secondary': isEmpty(value),
  });

  const text = isEmpty(value) ? 'N/A' : value;

  return <div className={className}>{text}</div>;
};

ViewOnlyText.displayName = 'ViewOnlyText';

ViewOnlyText.defaultProps = {
  value: null,
};

ViewOnlyText.propTypes = {
  /** Text value */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewOnlyText;
