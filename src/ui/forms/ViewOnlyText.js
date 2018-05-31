import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as valuesUtils from 'utils/values';

class ViewOnlyText extends Component {
  render() {
    const { value } = this.props;

    const className = classNames('pl1', {
      'gray-secondary': valuesUtils.isEmpty(value),
    });

    const text = valuesUtils.isEmpty(value) ? 'N/A' : value;

    return <div className={className}>{text}</div>;
  }
}

ViewOnlyText.displayName = 'ViewOnlyText';

ViewOnlyText.defaultProps = { value: null };

ViewOnlyText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewOnlyText;
