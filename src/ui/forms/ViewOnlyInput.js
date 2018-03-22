import PropTypes from 'prop-types';
import React, { Component } from 'react';

import * as valuesUtils from 'utils/values';

class ViewOnlyInput extends Component {
  render() {
    const { value } = this.props;

    const text = valuesUtils.isEmpty(value) ? 'N/A' : value;

    return (
      <input
        className="input col-12 mb0 field bg-gray gray-secondary"
        value={text}
        disabled
      />
    );
  }
}

ViewOnlyInput.defaultProps = { value: null };

ViewOnlyInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ViewOnlyInput;
