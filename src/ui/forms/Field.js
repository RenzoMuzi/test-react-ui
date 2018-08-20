import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from 'lodash/pick';

import Checkbox from './Checkbox';
import CustomDropdown from '../CustomDropdown';
import Input from './Input';
import TextArea from './Textarea';
import ToggleSwitch from './ToggleSwitch';

const Types = {
  select: CustomDropdown,
  text: Input,
  textarea: TextArea,
  checkbox: Checkbox,
  switch: ToggleSwitch,
};

const PropsByType = {
  date: ['value', 'onChange', 'range', 'errorMessage', 'viewOnly'],
  select: ['options', 'value', 'errorMessage', 'onChange', 'viewOnly'],
  text: [
    'validRegex',
    'placeholder',
    'value',
    'errorMessage',
    'onChange',
    'viewOnly',
  ],
  textarea: [
    'validRegex',
    'placeholder',
    'value',
    'errorMessage',
    'onChange',
    'autoFocus',
    'viewOnly',
  ],
  checkbox: ['value', 'onChange', 'viewOnly'],
  switch: ['value', 'onChange', 'viewOnly'],
};

export const filterPropsForType = (props, type) =>
  pick(props, PropsByType[type]);

export const getComponent = type => Types[type];

const Field = ({
  label, bold, subField, children,
}) => {
  const fieldClassNames = classNames(
    'py1',
    'flex',
    'flex-center',
    'justify-between',
    {
      'border-bottom border-gray-50': !subField && !bold,
    },
  );
  const labelClassNames = classNames(
    'lh3',
    'col',
    'col-4',
    'pr1',
    { pl2: !subField },
    { pl3: subField },
    { 'weight-700': bold },
  );
  return (
    <div className={fieldClassNames}>
      <div className={labelClassNames}>{label}</div>
      <div className="col col-8 pr2">{children}</div>
    </div>
  );
};

Field.displayName = 'Field';

Field.defaultProps = {
  bold: false,
  subField: false,
  children: null,
};

Field.propTypes = {
  /** Field label description */
  label: PropTypes.string.isRequired,
  /** Indicates if label is bold */
  bold: PropTypes.bool,
  /** Indicates if is a sub field */
  subField: PropTypes.bool,
  /** Field content */
  children: PropTypes.node,
};

export default Field;
