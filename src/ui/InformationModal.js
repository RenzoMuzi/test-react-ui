import React from 'react';

import PropTypes from 'prop-types';

import Modal from './Modal';
import PrimaryButton from './forms/PrimaryButton';

const InformationModal = ({
  title, body, onClose, allowScrolling,
}) => (
  <Modal isOpen onClose={onClose} allowScrolling={allowScrolling}>
    <div className="p2 flex justify-between">
      <span className="fs16 weight-700 gray-primary">{title}</span>
      <i
        className="fa fa-times gray-primary opacity-80 right pointer"
        onClick={onClose}
      />
    </div>
    <div className="center border-top border-gray-50">
      <div className="mt3 fs16 weight-700 gray-primary opacity-80 px1">
        {body}
      </div>
      <div className="my3 flex justify-around">
        <PrimaryButton label="OK" onClick={onClose} className="pc-btn--big" />
      </div>
    </div>
  </Modal>
);

InformationModal.defaultProps = {
  title: '',
  onClose: () => {},
  allowScrolling: false,
};

InformationModal.propTypes = {
  /** Modal title */
  title: PropTypes.string,
  /** Modal content */
  body: PropTypes.node.isRequired,
  /** Handler when modal closes */
  onClose: PropTypes.func,
  /** Allows scrolling on main container body when modal is open */
  allowScrolling: PropTypes.bool,
};

export default InformationModal;
