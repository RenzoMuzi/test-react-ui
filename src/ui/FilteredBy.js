import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import mPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';

import Icon from './Icon';

const OperatorToLabelMap = (isDate) => ({
  Eq: '',
  Like: '',
  NotEq: '≠',
  Gt: isDate ? 'After' : '>',
  Lt: isDate ? 'Before' : '<',
  Lte: '≤',
  Gte: '≥',
  Between: 'Between',
  Contains: 'contains',
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
      'mr1 my1/3 ounded primary bg-primary-highlight nowrap',
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

const renderFilters = (title, filters, className, chickletClassName, onChange) => {
  if (isEmpty(filters)) return null;
  return (
    <div className={classNames('my1/3 flex flex-wrap items-center lh-21', className)}>
      <span className="pr1 nowrap">{title}</span>
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
};

const FilteredBy = ({
  className, filters, filtersExclude, chickletClassName, onChange,
}) => {
  if (isEmpty(filters) && isEmpty(filtersExclude)) return null;
  return (
    <div>
      { renderFilters('Filtered By', filters, className, chickletClassName, onChange) }
      { renderFilters('Exclude', filtersExclude, className, chickletClassName, onChange) }
    </div>
  );
};

FilteredBy.defaultProps = {
  className: '',
  chickletClassName: '',
  onChange: () => {},
  filters: [],
  filtersExclude: [],
};

const filtersPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    operator: PropTypes.string,
    value: allPossibleValueTypes.isRequired,
    type: PropTypes.string,
  }),
);

FilteredBy.propTypes = {
  /** CSS class name for the filter label */
  className: PropTypes.string,
  /** CSS class name for each chicklet */
  chickletClassName: PropTypes.string,
  /** Function called when filter is removed */
  onChange: PropTypes.func,
  /** Items to be render in filter chicklets */
  filters: filtersPropTypes,
  /** Items to be render in exclud chicklets */
  filtersExclude: filtersPropTypes,
};

export default FilteredBy;
