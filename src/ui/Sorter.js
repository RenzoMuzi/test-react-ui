import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import update from 'immutability-helper';
import find from 'lodash/find';
import Icon from './Icon';
import CustomDropdown from './CustomDropdown';

const filterOptions = (available, selected) =>
  available.filter(option => !find(selected, ['value', option.value]));

const SortChicklet = ({
  name, asc, onChange, onDelete, className,
}) => (
  <div
    className={classNames(
      'mr1 mb1 mt1 rounded orange-primary bg-orange-highlight nowrap',
      className,
    )}
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
  onSortChange,
}) => {
  const filteredOptions = filterOptions(dropdownOptions, sorting);
  const onSelectOption = value => onSortChange([...sorting, value]);
  const onSelectedOptionsChange = (value, index) =>
    onSortChange(update(sorting, { $splice: [[index, 1, value]] }));
  const deleteSelectedOption = index =>
    onSortChange(update(sorting, { $splice: [[index, 1]] }));

  return (
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
      {filteredOptions.length > 0 && (
        <div>
          <CustomDropdown
            label={dropdownText}
            selectStyle={{ paddingTop: 0, paddingBottom: 0 }}
            selectClasses="sandy-brown border-none px2 fs-14"
            noIcon
            value=""
            onChange={index => onSelectOption(filteredOptions[index])}
            options={filteredOptions}
          />
        </div>
      )}
    </div>
  );
};

SortChicklet.displayName = 'SortChicklet';

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

Sorter.displayName = 'Sorter';

Sorter.defaultProps = {
  dropdownText: 'add sorting',
  className: '',
  chickletClassName: '',
};

Sorter.propTypes = {
  /** CSS class to customize the sorter */
  className: PropTypes.string,
  /** CSS class to customize the chicklet */
  chickletClassName: PropTypes.string,
  /** Dropdown options */
  dropdownOptions: PropTypes.array.isRequired,
  /** Dropdown label */
  dropdownText: PropTypes.string,
  /** Current sorting items */
  sorting: PropTypes.array.isRequired,
  /** onSortChange callback function */
  onSortChange: PropTypes.func.isRequired,
};

export default Sorter;
