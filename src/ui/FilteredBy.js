import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import mPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import head from 'lodash/head';

import Icon from './Icon';

const OperatorToLabelMap = (isDate) => ({
  Eq: '',
  NotEq: '≠',
  Gt: isDate ? 'Before' : '>',
  Lt: isDate ? 'After' : '<',
  Lte: '≤',
  Gte: '≥',
  Between: 'Between',
});

const convertValue = value => {
  const safeValue = Array.isArray(value) ? head(value) : value;

  switch (safeValue) {
    case 'true':
      return 'Yes';
    case 'false':
      return 'No';
    default:
      return safeValue;
  }
};

const getChickletValue = (value, isDate) => {
  const safeValue = convertValue(value);

  return isDate || moment.isMoment(safeValue) ? moment(safeValue).format('MM/DD/YYYY') : safeValue;
};

const getChickletLabel = (operator, value, isDate) => (
  operator === 'Between'
    ? `${getChickletValue(value[0], isDate)} - ${getChickletValue(value[1], isDate)}`
    : `${OperatorToLabelMap(isDate)[operator]} ${getChickletValue(value, isDate)}`
);

const possibleValueTypes = [
  PropTypes.string,
  PropTypes.number,
  mPropTypes.momentObj,
];

const allPossibleValueTypes = PropTypes
  .oneOfType([
    ...possibleValueTypes,
    PropTypes.arrayOf(
      PropTypes.oneOfType(possibleValueTypes),
    )],
  );

const FilterChicklet = ({
  label, operator, value, type, onDelete, className,
}) => (
  <div
    className={classNames(
      'mr1 my1/3 ounded orange-primary bg-orange-highlight nowrap',
      className,
    )}
  >
    <span className="bold px1">{label}:</span>
    <span>{getChickletLabel(operator, value, type === 'Date')}</span>
    <Icon className="pointer px1" type="times" onClick={onDelete} />
  </div>
);

FilterChicklet.defaultProps = {
  operator: 'Eq',
  type: '',
  onDelete: () => {},
  className: '',
};

FilterChicklet.propTypes = {
  label: PropTypes.string.isRequired,
  operator: PropTypes.string,
  value: allPossibleValueTypes.isRequired,
  type: PropTypes.string,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

const FilteredBy = ({
  className, filters, chickletClassName, onChange,
}) => (
  <div className={classNames('my1 flex flex-wrap items-center lh-21', className)}>
    <span className="pr1 nowrap">Filtered By</span>
    {filters.map((option, index) => (
      <FilterChicklet
        key={option.label}
        label={option.label}
        operator={option.operator}
        value={option.value}
        type={option.type}
        onDelete={() => onChange(option, index)}
        className={chickletClassName}
      />
    ))}
  </div>
);

FilteredBy.defaultProps = {
  className: '',
  chickletClassName: '',
  onChange: () => {},
  filters: [],
};

FilteredBy.propTypes = {
  className: PropTypes.string,
  chickletClassName: PropTypes.string,
  onChange: PropTypes.func,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      operator: PropTypes.string,
      value: allPossibleValueTypes.isRequired,
      type: PropTypes.string,
    }),
  ),
};

export default FilteredBy;
