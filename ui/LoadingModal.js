import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'lib/ui/Modal';
import loadingGif from 'images/loading.gif';

const LoadingModal = ({ isLoading, text }) => (
  <Modal isOpen={isLoading}>
    <div className="center p1">
      <img src={loadingGif} alt="loading" />
      <span className="weight-700 fs17 pl2">{text}</span>
    </div>
  </Modal>
);

LoadingModal.defaultProps = { isLoading: true };

LoadingModal.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default LoadingModal;
