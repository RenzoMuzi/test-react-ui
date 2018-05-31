import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Modes = {
  Display: 'display',
  Edit: 'edit',
};

class EditableText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: Modes.Display,
      localText: null,
    };
  }

  handleOnKeyDown = ({ key }) => {
    if (this.isEnter(key)) {
      this.setState({ mode: Modes.Display });
      this.fireOnChange();
    } else if (this.isEsc(key)) {
      this.setState({ mode: Modes.Display });
    }
  };

  handleOnChange = e => {
    this.setState({ localText: e.target.value });
  };

  handleOnBlur = () => {
    this.setState({ mode: Modes.Display });

    this.fireOnChange();
  };

  handleOnClick = e => {
    const { isEditable, text } = this.props;

    if (isEditable) {
      this.setState({ mode: Modes.Edit, localText: text });

      e.stopPropagation();
    }
  };

  render() {
    const { placeholder } = this.props;

    const isEditMode = this.isEditMode();

    return (
      <div>
        {isEditMode
          ? this.editableText(placeholder)
          : this.displayText(placeholder)}
      </div>
    );
  }

  editableText(placeholder) {
    const { localText } = this.state;

    return (
      <input
        style={{ width: '100%' }}
        className="input"
        autoFocus
        onKeyDown={this.handleOnKeyDown}
        onChange={this.handleOnChange}
        onBlur={this.handleOnBlur}
        value={localText || ''}
        placeholder={placeholder}
        onClick={e => e.stopPropagation()}
      />
    );
  }

  displayText(placeholder) {
    const { isEditable, text } = this.props;

    const textClassName = classNames({ 'opacity-60': !text });

    return (
      <div className="edit-text" onClick={this.handleOnClick}>
        <span className={textClassName}>{text || placeholder}</span>

        {isEditable && (
          <span className="fs18 pl1 edit-pencil pointer">
            <i className="fa fa-pencil" />
          </span>
        )}
      </div>
    );
  }

  fireOnChange() {
    const { text, onChange } = this.props;

    const localText = (this.state.localText || '').trim();

    if (localText !== text) {
      onChange(localText);
    }
  }

  isEditMode() {
    const { mode } = this.state;

    return mode === Modes.Edit;
  }

  isEnter(key) {
    return key === 'Enter';
  }

  isEsc(key) {
    return key === 'Escape';
  }
}

EditableText.displayName = 'EditableText';

EditableText.defaultProps = {
  text: '',
  placeholder: '',
  isEditable: false,
  onChange: () => {},
};

EditableText.propTypes = {
  /** Text value */
  text: PropTypes.string,
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Specifies wether is editable or not */
  isEditable: PropTypes.bool,
  /** onChange event handler */
  onChange: PropTypes.func,
};

export default EditableText;
