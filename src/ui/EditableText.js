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
    if (this.props.saveButtons) return;

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

  handleOnCancel = () => this.setState({ mode: Modes.Display });

  handleOnSave = () => {
    this.setState({ mode: Modes.Display });
    this.fireOnChange();
  }

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

  renderSaveButtons = () => {
    const { saveButtons, cancelBtnClassName, saveBtnClassName } = this.props;

    return saveButtons && (
      <div className="right">
        <div
          className={classNames('inline weight-400 pointer', cancelBtnClassName)}
          onClick={this.handleOnCancel}
        >
          Cancel
        </div>
        <div
          className={classNames('pl1 inline weight-700 pointer', saveBtnClassName)}
          onClick={this.handleOnSave}
        >
          Save
        </div>
      </div>
    );
  }

  editableText(placeholder) {
    const { localText } = this.state;

    return [
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
      />,
      this.renderSaveButtons(),
    ];
  }

  displayText(placeholder) {
    const {
      isEditable, text, displayClassName, icon, iconClassName,
    } = this.props;

    const textClassName = classNames({ 'opacity-60': !text });


    return (
      <div className={classNames('edit-text', displayClassName)} onClick={this.handleOnClick}>
        <span className={textClassName}>{text || placeholder}</span>

        {isEditable && (
          <i className={classNames(`fa fa-${icon} pointer`, iconClassName)} />
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
  onChange: () => { },
  saveButtons: false,
  displayClassName: '',
  icon: 'pencil',
  iconClassName: 'pl1',
  cancelBtnClassName: '',
  saveBtnClassName: '',
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
  /** CSS class for display mode */
  displayClassName: PropTypes.string,
  /** CSS class for the icon */
  iconClassName: PropTypes.string,
  /** CSS class for cancel button */
  cancelBtnClassName: PropTypes.string,
  /** CSS class for save button */
  saveBtnClassName: PropTypes.string,
  /** Icon to be shown */
  icon: PropTypes.string,
  /** Show save/cancel links below the field */
  saveButtons: PropTypes.bool,
};

export default EditableText;
