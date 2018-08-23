import React from 'react';
import PropTypes from 'prop-types';
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
    className={className}
  >
    <Icon className="pointer px1" type={asc ? 'angle-up' : 'angle-down'} onClick={onChange} />
    <span>{name}</span>
    <Icon className="pointer px1" type="times" onClick={onDelete} />
  </div>
);

const Sorter = ({
  className,
  sortByClassName,
  chickletClassName,
  addSortingClassName,
  addSortingIconClassName,
  addSortingIconType,
  dropdownOptions,
  sorting,
  onSortChange,
  dropdownProps,
}) => {
  const filteredOptions = filterOptions(dropdownOptions, sorting);
  const onSelectOption = value => onSortChange([...sorting, value]);
  const onSelectedOptionsChange = (value, index) =>
    onSortChange(update(sorting, { $splice: [[index, 1, value]] }));
  const deleteSelectedOption = index =>
    onSortChange(update(sorting, { $splice: [[index, 1]] }));

  const dropdownHeader = () => (
    <div
      className={addSortingClassName}
    >
      add sorting
      {<Icon
        type={addSortingIconType}
        size={16}
        className={addSortingIconClassName}
      />}
    </div>
  );

  return (
    <div className={className}>
      <span className={sortByClassName}>Sort By</span>
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
            headerComponent={dropdownHeader}
            onChange={index => onSelectOption(filteredOptions[index])}
            options={filteredOptions}
            {...dropdownProps}
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
  sortByClassName: 'pr1 nowrap',
  className: 'flex flex-wrap items-center lh-21',
  chickletClassName: 'mr1 mb1 mt1 rounded orange-primary bg-orange-highlight nowrap',
  addSortingClassName: 'orange',
  addSortingIconClassName: 'inline-block fa-lg pl1 gray-border-color',
  addSortingIconType: 'caret-down',
  dropdownProps: {
    containerClassName: 'relative orange',
    className: 'pointer',
    optionsContainerClassName: 'ml1 py1/3 absolute border-bottom-shadow bg-white min-full-width flex flex-column z3 border border-gray gray-primary rounded max-height-1 overflow-scroll',
    optionClassName: 'p1 nowrap custom-select-option pointer',
    disabledOptionClassName: 'p1 nowrap gray',
  },
};

Sorter.propTypes = {
  /** CSS class to customize the sorter */
  className: PropTypes.string,
  /** CSS class to customize the chicklet */
  chickletClassName: PropTypes.string,
  /** CSS class to customize the sorty by label */
  sortByClassName: PropTypes.string,
  /** CSS class to customize the add sorting button */
  addSortingClassName: PropTypes.string,
  /** CSS class to customize the add sorting icon */
  addSortingIconClassName: PropTypes.string,
  /** Add sorting icon type */
  addSortingIconType: PropTypes.string,
  /** Dropdown options */
  dropdownOptions: PropTypes.array.isRequired,
  /** Current sorting items */
  sorting: PropTypes.array.isRequired,
  /** onSortChange callback function */
  onSortChange: PropTypes.func.isRequired,
  /** props forwarded to the CustomDropdown component used to display sorting options */
  dropdownProps: PropTypes.object,
};

export default Sorter;
