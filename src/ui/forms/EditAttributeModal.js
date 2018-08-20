import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Button from './Button';

/**
 * @deprecated this component is deprecated and should not be used anymore.
*/

class EditAttributeModal extends Component {
  render() {
    // eslint-disable-next-line
    console.warn('EditAttributeModal is a deprecated component and will be removed on future versions.');
    const {
      isOpen, title, children, onSubmit,
    } = this.props;

    return (
      isOpen && (
        <div className="bg-red">
          <div className="c-edit-modal bg-white border border-gray rounded-large max-width-5 min-width-2 mb2">
            <div className="p1 rounded-top-large bg-gray fit">{title}</div>
            <div className="p1 fit">{children}</div>
            <div className="p1 flex justify-center">
              <Button
                label="Cancel"
                onClick={this.close}
                btnClassName="pc-btn-secondary"
                labelClassName="mr2"
              />
              <Button btnClassName="pc-btn-primary" label="Save" onClick={onSubmit} />
            </div>
          </div>
          <div className="c-edit-modal__backdrop" onClick={this.close} />
        </div>
      )
    );
  }

  close = e => {
    e.preventDefault();
    this.props.onClose();
  };
}

EditAttributeModal.displayName = 'EditAttributeModal';

EditAttributeModal.defaultProps = {
  isOpen: false,
  children: null,
  title: '',
  onClose: () => {},
  onSubmit: () => {},
};

EditAttributeModal.propTypes = {
  /** Shows or hides the modal */
  isOpen: PropTypes.bool,
  /** Modal's content */
  children: PropTypes.node,
  /** Modal's title */
  title: PropTypes.string,
  /** onClose callback function */
  onClose: PropTypes.func,
  /** onSubmit callback function */
  onSubmit: PropTypes.func,
};

export default EditAttributeModal;
