import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import valuesUtils from 'utils/values';

const ViewOnlyText = ({ value }) => {
  const className = classNames({
    'gray-secondary': valuesUtils.isEmpty(value),
  });

  const text = valuesUtils.isEmpty(value) ? 'N/A' : value;

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
