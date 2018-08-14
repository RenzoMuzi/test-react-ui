import PropTypes from 'prop-types';
import React, { Component } from 'react';

import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

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
              <SecondaryButton
                label="Cancel"
                onClick={this.close}
                className="mr2"
              />
              <PrimaryButton label="Save" onClick={onSubmit} />
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
