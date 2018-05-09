import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, withHandlers } from 'recompose';
import update from 'react-addons-update';
import find from 'lodash/find';
import Icon from './Icon';
import CustomDropdown from './CustomDropdown';

const SortChicklet = ({
  name, asc, onChange, onDelete, className,
}) => (
  <div
    className={classNames('mr1 mb1 mt1 rounded orange-primary bg-orange-highlight nowrap', className)}
  >
    <Icon className="pointer px1" type={asc ? 'angle-up' : 'angle-down'} onClick={onChange} />
    <span>{name}</span>
    <Icon className="pointer px1" type="times" onClick={onDelete} />
  </div>
);

const Sorter = ({
  className,
  chickletClassName,
  dropdownOptions,
  dropdownText,
  sorting,
  onSelectOption,
  onSelectedOptionsChange,
  deleteSelectedOption,
}) => (
  <div className={classNames('flex flex-wrap items-center lh-21', className)}>
    <span className="pr1 nowrap">Sort By</span>
    {sorting.map((option, index) => (
      <SortChicklet
        key={option.value}
        name={option.label}
        asc={option.asc}
        onChange={() => onSelectedOptionsChange({ ...option, asc: !option.asc }, index)}
        onDelete={() => deleteSelectedOption(index)}
        className={chickletClassName}
      />
    ))}
    <div>
      <CustomDropdown
        defaultValue={dropdownText}
        selectStyle={{ paddingTop: 0, paddingBottom: 0 }}
        selectClasses="sandy-brown border-none px2 fs-14"
        noIcon
        value=""
        onChange={index => onSelectOption(dropdownOptions[index])}
        options={dropdownOptions.filter(option => !find(sorting, ['label', option.label]))}
      />
    </div>
  </div>
);

SortChicklet.defaultProps = {
  className: '',
};

SortChicklet.propTypes = {
  name: PropTypes.string.isRequired,
  asc: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Sorter.defaultProps = {
  dropdownText: 'add sorting',
  className: '',
  chickletClassName: '',
};

Sorter.propTypes = {
  className: PropTypes.string,
  chickletClassName: PropTypes.string,
  dropdownOptions: PropTypes.array.isRequired,
  dropdownText: PropTypes.string,
  sorting: PropTypes.array.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onSelectedOptionsChange: PropTypes.func.isRequired,
  deleteSelectedOption: PropTypes.func.isRequired,
};

export default compose(
  withHandlers({
    onSelectOption: ({ sorting, onSortChange }) => value => onSortChange([...sorting, value]),
    onSelectedOptionsChange: ({ sorting, onSortChange }) => (value, index) =>
      onSortChange(update(sorting, { $splice: [[index, 1, value]] })),
    deleteSelectedOption: ({ sorting, onSortChange }) => index =>
      onSortChange(update(sorting, { $splice: [[index, 1]] })),
  }),
)(Sorter);
