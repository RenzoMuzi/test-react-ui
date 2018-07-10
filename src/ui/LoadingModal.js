import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Modal from './Modal';

const LoadingModal = ({ isLoading, text }) => (
  <Modal isOpen={isLoading}>
    <Loading text={text} className="pt1" />
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
