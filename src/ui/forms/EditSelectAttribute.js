import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Dropdown from './Dropdown';
import EditAttributeModal from './EditAttributeModal';

class EditSelectAttribute extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };
  }

  render() {
    const {
      options, title, onClose, onSubmit,
    } = this.props;
    const { value } = this.state;

    return (
      <EditAttributeModal
        isOpen
        title={title}
        onSubmit={() => onSubmit(value)}
        onClose={onClose}
      >
        <Dropdown
          value={value}
          onChange={dropdownValue => this.setState({ value: dropdownValue })}
          options={options}
        />
      </EditAttributeModal>
    );
  }
}

EditSelectAttribute.defaultProps = {
  title: '',
  value: '',
  onClose: () => {},
  onSubmit: () => {},
};

EditSelectAttribute.propTypes = {
  /** Dropdown options */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        optionLabel: PropTypes.array,
        value: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.object,
          PropTypes.string,
          PropTypes.bool,
        ]),
      }),
    ),
    PropTypes.object,
  ]).isRequired,
  /** Modal's title */
  title: PropTypes.string,
  /** Current selected value */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.bool,
  ]),
  /** onClose callback function */
  onClose: PropTypes.func,
  /** onSubmit callback function */
  onSubmit: PropTypes.func,
};

export default EditSelectAttribute;
