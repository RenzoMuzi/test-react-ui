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
      isOpen, children, positionClassName, wide, styleClass,
    } = this.props;

    const containerClassName = classNames(
      'c-modal__container',
      positionClassName,
    );

    const modalClassName = classNames(
      'c-modal',
      { 'width-35': !wide },
      { 'width-40': wide },
      'bg-white',
      'border',
      'border-gray',
      'width-100-sm',
      'width-70-md',
      styleClass,
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

Modal.defaultProps = {
  isOpen: false,
  positionClassName: null,
  wide: false,
  children: null,
  onClose: () => {},
  styleClass: '',
  allowScrolling: false,
};

Modal.propTypes = {
  /** Modal is shown or not */
  isOpen: PropTypes.bool,
  /** CSS class to determine modal positioning */
  positionClassName: PropTypes.string,
  /** Modal can be wider or not */
  wide: PropTypes.bool,
  /** Modal content */
  children: PropTypes.node,
  /** handler when modal closes */
  onClose: PropTypes.func,
  /** CSS class for modal styles */
  styleClass: PropTypes.string,
  /** Allows scrolling on main container body when modal is open */
  allowScrolling: PropTypes.bool,
};

export default Modal;
