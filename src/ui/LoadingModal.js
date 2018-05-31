import React from 'react';
import PropTypes from 'prop-types';
import loadingGif from 'images/loading.gif';
import Modal from './Modal';

const LoadingModal = ({ isLoading, text }) => (
  <Modal isOpen={isLoading}>
    <div className="center p1">
      <img src={loadingGif} alt="loading" />
      <span className="weight-700 fs17 pl2 pb1">{text}</span>
    </div>
  </Modal>
);

LoadingModal.displayName = 'LoadingModal';

LoadingModal.defaultProps = { isLoading: true };

LoadingModal.propTypes = {
  /** Show loading modal or not */
  isLoading: PropTypes.bool,
  /** Text in modal */
  text: PropTypes.string.isRequired,
};

export default LoadingModal;
