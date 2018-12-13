import React from 'react';
import PropTypes from 'prop-types';

import Modal from './Modal';
import Button from './Button';

const BasicModal = ({
  isOpen,
  title,
  body,
  onClose,
  allowScrolling,
  headerClassName,
  titleClassName,
  closeIconClassName,
  bodyClassName,
  contentClassName,
  closeButtonClassName,
  closeButtonLabel,
  footerClassName,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} allowScrolling={allowScrolling}>
    <div className={headerClassName}>
      <span className={titleClassName}>{title}</span>
      <i
        className={closeIconClassName}
        onClick={onClose}
      />
    </div>
    <div className={contentClassName}>
      <div className={bodyClassName}>
        {body}
      </div>
      <div className={footerClassName}>
        <Button label={closeButtonLabel} onClick={onClose} btnClassName={closeButtonClassName} />
      </div>
    </div>
  </Modal>
);

BasicModal.displayName = 'BasicModal';

BasicModal.defaultProps = {
  isOpen: true,
  title: '',
  onClose: () => {},
  allowScrolling: false,
  headerClassName: 'p2 flex justify-between',
  contentClassName: 'center border-top border-gray-50',
  bodyClassName: 'mt3 fs16 weight-700 gray-primary opacity-80 px1',
  footerClassName: 'my3 flex justify-around',
  titleClassName: 'fs16 weight-700 gray-primary',
  closeIconClassName: 'fa fa-times gray-primary opacity-80 right pointer',
  closeButtonClassName: 'pc-btn--big',
  closeButtonLabel: 'OK',
};

BasicModal.propTypes = {
  /** Modal is shown or not */
  isOpen: PropTypes.bool,
  /** Modal title */
  title: PropTypes.string,
  /** Modal content */
  body: PropTypes.node.isRequired,
  /** Handler when modal closes */
  onClose: PropTypes.func,
  /** Allows scrolling on main container body when modal is open */
  allowScrolling: PropTypes.bool,
  /** CSS className for the header container */
  headerClassName: PropTypes.string,
  /** CSS className for the content (body and footer) container */
  contentClassName: PropTypes.string,
  /** CSS className for the body container */
  bodyClassName: PropTypes.string,
  /** CSS className for the footer container */
  footerClassName: PropTypes.string,
  /** CSS className for the title */
  titleClassName: PropTypes.string,
  /** CSS className for the close icon */
  closeIconClassName: PropTypes.string,
  /** CSS className for the close button */
  closeButtonClassName: PropTypes.string,
  /** Label for close button */
  closeButtonLabel: PropTypes.string,
};

export default BasicModal;
