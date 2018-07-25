import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Icon from './Icon';
import PrimaryButton from './forms/PrimaryButton';

const ErrorModal = ({
  isOpen, message, title, onClose, allowScrolling,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} allowScrolling={allowScrolling}>
    <div className="p2 bg-gray flex justify-between">
      <span className="fs24 weight-600 gray-primary">{title}</span>
      <Icon
        type="times"
        className="gray-primary opacity-80 right pointer"
        size={24}
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

ErrorModal.displayName = 'ErrorModal';

ErrorModal.defaultProps = {
  isOpen: true,
  message: '',
  title: '',
  onClose: () => {},
  allowScrolling: false,
};

ErrorModal.propTypes = {
  /** Modal is shown or not */
  isOpen: PropTypes.bool,
  /** content shown in modal */
  message: PropTypes.node,
  /** Modal title */
  title: PropTypes.string,
  /** Handler when modal closes */
  onClose: PropTypes.func,
  /** Allows scrolling on main container body when modal is open */
  allowScrolling: PropTypes.bool,
};

export default ErrorModal;
