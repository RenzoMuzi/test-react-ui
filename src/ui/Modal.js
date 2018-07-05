import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const ModalContainerSelector = '.c-modal__container';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.backdrop = null;
  }

  componentDidMount() {
    const { isOpen, allowScrolling } = this.props;

    if (isOpen && !allowScrolling) {
      this.hideBodyOverflow();
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen, allowScrolling } = this.props;
    if (allowScrolling) return;

    if (!prevProps.isOpen && isOpen) {
      this.hideBodyOverflow();
    } else if (prevProps.isOpen && !isOpen) {
      this.unsetBodyOverflow();
    }
  }

  componentWillUnmount() {
    const { isOpen } = this.props;

    if (isOpen) {
      this.unsetBodyOverflow();
    }
  }

  handleOnClickModal = e => {
    e.stopPropagation();
  };

  render() {
    const {
      isOpen,
      children,
      positionClassName,
      styleClass,
      position,
    } = this.props;

    const containerClassName = classNames(
      'c-modal__container',
      positionClassName,
      {
        'c-modal__container-left': position.includes('left'),
        'c-modal__container-right': position.includes('right'),
        'c-modal__container-top': position.includes('top'),
        'c-modal__container-bottom': position.includes('bottom'),
      },
    );

    const modalClassName = classNames(
      'c-modal',
      'bg-white',
      'border',
      'border-gray',
      styleClass,
      {
        'c-modal-width': !position || position === 'center',
      },
    );

    return (
      isOpen && (
        <div className="c-modal__viewport">
          <div
            className="c-modal__backdrop bg-white-muted"
            onClick={this.close}
            ref={ref => {
              this.backdrop = ref;
            }}
          >
            <div className={containerClassName}>
              <div className={modalClassName} onClick={this.handleOnClickModal}>
                {children}
              </div>
            </div>
          </div>
        </div>
      )
    );
  }

  close = e => {
    const { onClose } = this.props;
    e.preventDefault();

    if (onClose) {
      onClose();
    }
  };

  scrollToTop() {
    this.backdrop.scrollTop = 0;
  }

  hideBodyOverflow() {
    document.body.style.overflow = 'hidden';
  }

  unsetBodyOverflow() {
    document.body.style.overflow = 'visible';
  }
}

Modal.displayName = 'Modal';

Modal.defaultProps = {
  isOpen: false,
  positionClassName: null,
  children: null,
  onClose: () => {},
  styleClass: '',
  allowScrolling: false,
  position: 'center',
};

Modal.propTypes = {
  /** Modal is shown or not */
  isOpen: PropTypes.bool,
  /** CSS class to determine modal positioning */
  positionClassName: PropTypes.string,
  /** Modal content */
  children: PropTypes.node,
  /** handler when modal closes */
  onClose: PropTypes.func,
  /** CSS class for modal styles */
  styleClass: PropTypes.string,
  /** Allows scrolling on main container body when modal is open */
  allowScrolling: PropTypes.bool,
  /** Modal position, center, left-bottom, right-bottom, left-top, right-top */
  position: PropTypes.string,
};

export default Modal;
