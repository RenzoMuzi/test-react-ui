import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import * as validationsUtils from '../utils/validations';

const MarginX = 20;

class Popover extends Component {
  constructor(props) {
    super(props);

    this.$parent = null;
    this.$popover = null;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleOnResize, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleOnResize, {
      passive: true,
    });
  }

  handleOnResize = () => {
    if (!this.$parent) return;

    this.adjustPosition();
  };

  render() {
    const { content, containerClassName, popoverClassName } = this.props;

    const containerStyles = classNames(containerClassName, 'c-popover__container');
    const popoverStyles = classNames(popoverClassName, 'c-popover');

    return (
      <div className={containerStyles}>
        <div
          ref={ref => {
            this.$popover = ref;
          }}
          className={popoverStyles}
        >
          <div>{content}</div>
        </div>
      </div>
    );
  }

  adjust($parent) {
    this.$parent = $parent;

    this.adjustPosition();
  }

  adjustPosition() {
    const newLeft = this.calculateLeft();
    const newMaxWidth = this.calculateMaxWidth();

    window.requestAnimationFrame(() => {
      if (!this.$popover) return;

      this.$popover.style.left = `${newLeft}px`;
      this.$popover.style.maxWidth = `${newMaxWidth}px`;

      const newTop = this.calculateTop();
      this.$popover.style.top = `${newTop}px`;
    });
  }

  calculateTop() {
    const { clientHeight } = this.$popover;

    const midHeight = clientHeight / 2;
    const parentHeight = this.$parent.clientHeight / 2;

    return parentHeight - midHeight;
  }

  calculateLeft() {
    const rect = this.$parent.getBoundingClientRect();

    return rect.width;
  }

  calculateMaxWidth() {
    const rect = this.$parent.getBoundingClientRect();

    const bodyWidth = document.body.clientWidth;

    return bodyWidth - rect.left - rect.width - MarginX;
  }
}

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || 'Component';

export const withPopover = WrappedComponent => {
  /* eslint-disable-next-line react/no-multi-comp */
  const wrapper = class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        currentErrorMessage: props.errorMessage,
        isPopoverDismissed: false,
      };

      this.$root = null;
      this.$popover = null;
    }

    componentDidMount() {
      this.positionPopover();
    }

    componentWillReceiveProps(nextProps) {
      const { errorMessage: nextErrorMessage } = nextProps;
      const { currentErrorMessage } = this.state;

      if (!validationsUtils.hasId(nextErrorMessage)) {
        this.destroyPopover();
      }

      if (
        validationsUtils.errorChanged(currentErrorMessage, nextErrorMessage)
      ) {
        this.attachNewPopover(nextProps);
      }
    }

    componentDidUpdate() {
      this.positionPopover();
    }

    componentWillUnmount() {
      this.destroyPopover();
    }

    handleOnChange = (...args) => {
      const { onChange } = this.props;

      this.destroyPopover();

      onChange(...args);
    };

    render() {
      const { wrapperClassName, ...passThroughProps } = this.props;
      const { currentErrorMessage, isPopoverDismissed } = this.state;

      const popover =
        validationsUtils.hasId(currentErrorMessage) && !isPopoverDismissed ? (
          <Popover
            ref={ref => {
              this.$popover = ref;
            }}
            key={currentErrorMessage.id}
            content={currentErrorMessage.text}
          />
        ) : null;

      return (
        <span className={`flex flex-auto ${wrapperClassName}`}>
          {popover}
          <span
            className="c-popover__component-wrapper"
            ref={ref => {
              this.$root = ref;
            }}
          >
            <WrappedComponent
              onChange={this.handleOnChange}
              {...passThroughProps}
            />
          </span>
        </span>
      );
    }

    attachNewPopover(props) {
      const { errorMessage } = props;

      this.setState({
        currentErrorMessage: errorMessage,
        isPopoverDismissed: false,
      });
    }

    destroyPopover() {
      this.setState({ isPopoverDismissed: true });
    }

    positionPopover() {
      let { currentErrorMessage, isPopoverDismissed } = this.state;

      if (validationsUtils.hasId(currentErrorMessage) && !isPopoverDismissed) {
        this.$popover.adjust(this.$root);
      }
    }
  };

  wrapper.displayName = `WithPopover(${getDisplayName(WrappedComponent)})`;

  wrapper.defaultProps = {
    wrapperClassName: '',
    errorMessage: {},
    onChange: () => {},
  };

  wrapper.propTypes = {
    errorMessage: PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    }),
    wrapperClassName: PropTypes.string,
    onChange: PropTypes.func,
  };

  return wrapper;
};

Popover.displayName = 'Popover';

Popover.propTypes = {
  /** Popover's content */
  content: PropTypes.string.isRequired,
  /** Popover's container CSS class */
  containerClassName: PropTypes.string,
  /** Popover's CSS class */
  popoverClassName: PropTypes.string,
};

Popover.defaultProps = {
  containerClassName: '',
  popoverClassName: '',
};

export default Popover;
