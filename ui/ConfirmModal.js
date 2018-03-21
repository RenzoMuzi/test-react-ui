import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'lib/ui/Modal';
import PrimaryButton from 'lib/ui/forms/PrimaryButton';
import SecondaryButton from 'lib/ui/forms/SecondaryButton';

const ConfirmModal = ({
  confirmButtonLabel,
  description,
  isOpen,
  message,
  onClose,
  onConfirm,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p2 m1 flex justify-between">
      <span className="fs20 weight-700 gray-primary">Are you sure?</span>
      <i
        className="fa fa-times gray-primary opacity-80 right pointer"
        onClick={onClose}
      />
    </div>
    <div className="center border-top border-gray-50">
      <div className="mt3 fs16 weight-700 gray-primary opacity-80 px1">
        {message}
      </div>
      <div className="mt3 fs14 weight-300 gray-primary">{description}</div>
      <div className="pb1 pt2 my3 flex justify-around">
        <SecondaryButton label="Cancel" onClick={onClose} />
        <PrimaryButton label={confirmButtonLabel} onClick={onConfirm} />
      </div>
    </div>
  </Modal>
);

ConfirmModal.defaultProps = {
  confirmButtonLabel: '',
  description: '',
  isOpen: false,
  message: '',
  onClose: () => {},
  onConfirm: () => {},
};

ConfirmModal.propTypes = {
  confirmButtonLabel: PropTypes.string,
  description: PropTypes.string,
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
