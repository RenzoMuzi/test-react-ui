import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import loadingGif from 'images/loading.gif';

const LoadingModal = ({ text, className }) => (
  <div className={classNames('center', className)}>
    <img src={loadingGif} alt="loading" />
    <div className="weight-700 fs17 py1">
      {text}
    </div>
  </div>
);

LoadingModal.displayName = 'LoadingModal';

LoadingModal.defaultProps = {
  text: 'Loading...',
  className: '',
};

LoadingModal.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

export default LoadingModal;
