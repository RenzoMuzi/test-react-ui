import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import PrimaryButton from './forms/PrimaryButton';

const ErrorModal = ({ message, title, onClose }) => (
  <Modal isOpen onClose={onClose}>
    <div className="p2 m1 flex justify-between">
      <span className="fs20 weight-700 gray-primary">{title}</span>
      <i
        className="fa fa-times gray-primary opacity-80 right pointer"
        onClick={onClose}
      />
    </div>
    <div className="center border-top border-gray-50">
      <div className="mt3 mx2 fs14 weight-300 gray-primary">{message}</div>
      <div className="pb1 pt2 my3 flex justify-around">
        <PrimaryButton label="Close" onClick={onClose} />
      </div>
    </div>
  </Modal>
);

ErrorModal.defaultProps = {
  message: '',
  title: '',
  onClose: () => {},
};

ErrorModal.propTypes = {
  message: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorModal;
