import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import PrimaryButton from './forms/PrimaryButton';
import SecondaryButton from './forms/SecondaryButton';

const ConfirmModal = ({
  confirmButtonLabel,
  description,
  isOpen,
  message,
  onClose,
  onConfirm,
  allowScrolling,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} allowScrolling={allowScrolling}>
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
  allowScrolling: false,
};

ConfirmModal.propTypes = {
  /** Label for confirmation button */
  confirmButtonLabel: PropTypes.string,
  /** Text description shown in modal after message */
  description: PropTypes.string,
  /** Modal is open or not */
  isOpen: PropTypes.bool,
  /** Text shown in modal */
  message: PropTypes.string,
  /**  handler when modal closes */
  onClose: PropTypes.func,
  /** handler when confirmation button is clicked */
  onConfirm: PropTypes.func,
  /** Allows scrolling on main container body when modal is open */
  allowScrolling: PropTypes.bool,
};

export default ConfirmModal;
