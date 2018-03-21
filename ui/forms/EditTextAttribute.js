import PropTypes from 'prop-types';
import React, { Component } from 'react';

import EditAttributeModal from './EditAttributeModal';

class EditTextAttribute extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({ text: nextProps.text });
    }
  }

  handleOnChange = ({ target: { value } }) => {
    const { validRegex } = this.props;

    if (!validRegex || value.match(validRegex) !== null) {
      this.setState({ text: value });
    }
  };

  render() {
    const { maxLength, title, onSubmit, isOpen, closeModal } = this.props;
    const { text } = this.state;

    return (
      <EditAttributeModal
        isOpen={isOpen}
        title={title}
        onSubmit={() => onSubmit(text)}
        onClose={closeModal}
      >
        <textarea
          maxLength={maxLength}
          value={text || ''}
          autoFocus
          onChange={this.handleOnChange}
          className="textarea input col-12 mb1 field"
        />
      </EditAttributeModal>
    );
  }
}

EditTextAttribute.defaultProps = {
  maxLength: null,
  title: '',
  text: '',
  validRegex: null,
  isOpen: false,
  onSubmit: () => {},
  closeModal: () => {},
};

EditTextAttribute.propTypes = {
  maxLength: PropTypes.number,
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  validRegex: PropTypes.object,
  onSubmit: PropTypes.func,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default EditTextAttribute;
