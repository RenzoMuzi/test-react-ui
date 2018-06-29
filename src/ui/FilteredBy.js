import React from 'react';
import update from 'immutability-helper';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import mPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import head from 'lodash/head';

import Icon from './Icon';

const OperatorToLabelMap = {
  Lte: 'Before',
  Gte: 'After',
  Eq: 'On',
  Between: 'Between',
};

const getChickletValue = value => {
  const safeValue = Array.isArray(value) ? head(value) : value;
  return moment.isMoment(safeValue) ? moment(safeValue).format('MM/DD/YYYY') : safeValue;
};

const getChickletLabel = (operator, value) => (
  operator === 'Between'
    ? `${getChickletValue(value[0])} - ${getChickletValue(value[1])}`
    : `${OperatorToLabelMap[operator]} ${getChickletValue(value)}`
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
  label, operator, value, onDelete, className,
}) => (
  <div
    className={classNames(
      'mr1 mb1 mt1 rounded orange-primary bg-orange-highlight nowrap',
      className,
    )}
  >
    <span className="bold px1">{label} </span>
    <span>{getChickletLabel(operator, value)}</span>
    <Icon className="pointer px1" type="times" onClick={onDelete} />
  </div>
);

FilterChicklet.defaultProps = {
  operator: 'Eq',
  onDelete: () => {},
  className: '',
};

FilterChicklet.propTypes = {
  label: PropTypes.string.isRequired,
  operator: PropTypes.string,
  value: allPossibleValueTypes.isRequired,
  onDelete: PropTypes.func,
  className: PropTypes.string,
};

const FilteredBy = ({
  className, filters, chickletClassName, onChange,
}) => (
  <div className={classNames('flex flex-wrap items-center lh-21', className)}>
    <span className="pr1 nowrap">Filtered By</span>
    {filters.map((option, index) => (
      <FilterChicklet
        key={option.value}
        label={option.label}
        operator={option.operator}
        value={option.value}
        onDelete={() => onChange(update(filters, { $splice: [[index, 1]] }))}
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
    }),
  ),
};

export default FilteredBy;
