import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Checkbox from './Checkbox';

import Icon from './Icon';
import CustomDropdown from './CustomDropdown';

const emptyValue = '-';

class Table extends Component {
  render() {
    return (
      <div>
        <div className={this.props.headerContainerClassName}>
          {this.renderHeader()}
        </div>
        {this.renderBody()}
      </div>
    );
  }

  renderHeaderText = title => title.map(t => t.headerName[0]).filter(Boolean).join('/');

  renderSecondTitleHeader = title =>
    title.map(t => (t.headerName.length > 1 ? t.headerName[1] : ''))[0];

  renderColumnValues = (record, column, columnIndex, options = {}) => {
    const { dropdown, showDropdown } = this.props;
    let values = column.map(c => this.renderValue(record[c.key], c.prefix, c.subKey));
    values = options.skipBlank ? values.filter(value => value !== emptyValue) : values;

    const value = values.join('/');
    if (columnIndex === 0 && showDropdown && dropdown.length > 0) {
      return this.renderDropdown(value, options, record, dropdown);
    }

    if (options.subtitleJoin === 'list') {
      return values.map((val, index) => <div key={index}>{val}</div>);
    }

    return value;
  };

  renderDropdown = (value, options, record, dropdown) => {
    const {
      dropdownContainerClassName, linkClassName, dropdownProps, iconClassName,
    } = this.props;

    const dropdownHeader = () => <Icon className={iconClassName} type="caret-down" size={20} />;
    return (
      <div className="no-wrap">
        <a
          className={linkClassName}
          href={options.generateUrl && options.generateUrl(record)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </a>
        <div className={dropdownContainerClassName}>
          <CustomDropdown
            value={value}
            headerComponent={dropdownHeader}
            options={dropdown}
            record={record}
            {...dropdownProps}
          />
        </div>
      </div>
    );
  }

  renderValue = (value, prefix, subKey) => {
    let valueToShow = value || '';
    if (subKey && !isEmpty(value)) {
      valueToShow = value[0][subKey];
    }
    if (prefix) {
      return isEmpty(valueToShow) || valueToShow === '-' ? '' : `${prefix}${valueToShow}`;
    }
    return valueToShow;
  };

  renderLoading = () => (
    <div className="center p3">
      <img src={this.props.loadingSrc} alt="loading" />
    </div>
  );

  renderHeader = () => {
    const {
      columns, allSelected, onAllChange, highlightClassName,
      headerTitleClassName, headerSubtitleClassName,
    } = this.props;
    const tableColumns = columns.map((column, index) => (
      <div
        className={classNames(
          'sm-col sm-col-4 p1 fs11',
          column.highlighted ? highlightClassName : '', {
          center: index !== 0,
          'sm-col-10': index === 0,
        })}
        key={index}
      >
        <div className={headerTitleClassName} data-tip data-for={index.toString()} >
          {this.renderHeaderText(column.title)}
          <div className={headerSubtitleClassName}>
            {this.renderSecondTitleHeader(column.title)}
          </div>
        </div>
        <div className={headerSubtitleClassName}>{this.renderHeaderText(column.subtitle)}</div>
        {column.tooltip && this.renderTooltip(column, index)}
      </div>
    ));

    const checkboxColumn = (
      <div className="sm-col p1 fs11" key="selectAll">
        <Checkbox value={allSelected} onChange={onAllChange} />
      </div>
    );

    return [checkboxColumn, ...tableColumns];
  };

  renderTooltip = (column, index) => (
    <ReactTooltip place="top" type="dark" effect="solid" id={index.toString()} className="tootlip2" >
      {this.tooltip(column.tooltip)}
    </ReactTooltip>
  )

  renderBody = () => {
    const {
      columns,
      records,
      entityId,
      zeroStateText,
      isLoading,
      selectedRecords,
      onRowChange,
      renderAdditionalInfo,
      highlightClassName,
      zeroStateClassName,
      primaryValueClassName,
      secondaryValueClassName,
      tableBodyContainerClassName, // border-bottom border-gray-light fit px0
    } = this.props;

    if (isLoading) {
      return this.renderLoading();
    }

    return records && records.length ? (
      records.map(record => (
        <div key={record[entityId]}>
          <div className={tableBodyContainerClassName}>
            <div className="md-flex flex-auto">
              <div>
                <div className="sm-col p1 fs14">
                  <Checkbox
                    value={selectedRecords.includes(record[entityId])}
                    onChange={value => onRowChange({ value, [entityId]: record[entityId] })}
                  />
                </div>
              </div>
              {columns.map((column, columnIndex) => (
                <div
                  className={classNames('p1',
                  column.highlighted ? highlightClassName : '', {
                    'sm-col sm-col-4 center': columnIndex !== 0,
                    'md-col md-col-10': columnIndex === 0,
                  })}
                  key={columnIndex}
                >
                  {columnIndex !== 0 && (
                    <div className="md-hide lg-hide weight-600 fs14 uppercase">
                      {this.renderHeaderText(column.title)}{' '}
                      {this.renderSecondTitleHeader(column.title)}
                    </div>
                  )}
                  <div className={primaryValueClassName}>
                    {this.renderColumnValues(
                      record,
                      column.title,
                      columnIndex,
                      column.options,
                    )}
                  </div>
                  {column.subtitle.length > 0 && (
                    <div className={secondaryValueClassName}>
                      <div className="md-hide lg-hide weight-600 fs14 pt2 uppercase">
                        {this.renderHeaderText(column.subtitle)}
                      </div>
                      {this.renderColumnValues(
                        record, column.subtitle, null, column.options)}
                    </div>
                  )}
                  {column.additionalRender && column.additionalRender({ record })}
                </div>
              ))}
            </div>
            {renderAdditionalInfo && renderAdditionalInfo({ record })}
          </div>
        </div>
      ))
    ) : (
      <div className={zeroStateClassName}>{zeroStateText}</div>
    );
  };

  tooltip = value => {
    if (value) {
      return (
        <div>
          {value.map((v, i) => (
            <div key={i}>
              {value.length > 1 && i !== 0 && <hr className="tooltipHr" />}
              {v}
            </div>
          ))
        }
        </div>
      );
    }
    return null;
  }
}

Table.propTypes = {
  /** Columns rendered on the list defined with the following object structure:
   * {
   *  title: [{ headerName: ['name'], key: 'recordKey' }],
   *  subtitle: [{ headerName: [''], key: 'anotherRecordKey',
   *  highlighted: true
   * }
  */
  columns: PropTypes.array.isRequired,
  /** Table of Entity records to populate the table */
  records: PropTypes.array,
  /** Table of selected entityId */
  entityId: PropTypes.string.isRequired,
  /** Id name of the entities passed */
  selectedRecords: PropTypes.arrayOf(PropTypes.string),
  /** All records all selected or not */
  allSelected: PropTypes.bool,
  /** Callback executed when allSelection status changes  */
  onAllChange: PropTypes.func,
  /** Callback executed when a row changes */
  onRowChange: PropTypes.func,
  /** Customization point to render extra information for specific records */
  renderAdditionalInfo: PropTypes.func,
  /** Zero state text displayed when no records are present */
  zeroStateText: PropTypes.string,
  /** Loading */
  isLoading: PropTypes.bool,
  /** Show or not list dropdown */
  showDropdown: PropTypes.bool,
  /** Actions displayed in the first column */
  dropdown: PropTypes.array,
  /** Css class name for zero state text */
  zeroStateClassName: PropTypes.string,
  /** Css class name for dropdown components */
  dropdownContainerClassName: PropTypes.string,
  /** Css class name for header title */
  headerTitleClassName: PropTypes.string,
  /** Css class name for table body container */
  tableBodyContainerClassName: PropTypes.string,
  /** Css class name for header subtitle */
  headerSubtitleClassName: PropTypes.string,
  /** Css class name for body values */
  primaryValueClassName: PropTypes.string,
  /** Css class name for body sub values */
  secondaryValueClassName: PropTypes.string,
  /** Css class name for header conainer */
  headerContainerClassName: PropTypes.string,
  /** Css class name for links */
  linkClassName: PropTypes.string,
  /** Css class name for highlight */
  highlightClassName: PropTypes.string,
  /** Css class name for Icon of dropdown */
  iconClassName: PropTypes.string,
  /** props forwarded to the CustomDropdown component used to display dropdown */
  dropdownProps: PropTypes.object,
  /** Loading icon */
  loadingSrc: PropTypes.string.isRequired,
};

Table.defaultProps = {
  records: [],
  selectedRecords: [],
  dropdown: [],
  onAllChange: () => {},
  onRowChange: () => {},
  renderAdditionalInfo: null,
  allSelected: false,
  zeroStateText: 'No records',
  isLoading: false,
  showDropdown: false,
  dropdownContainerClassName: 'inline-block pointer',
  dropdownProps: {},
  iconClassName: 'inline-block fa-sm gray hover-primary pl1',
  linkClassName: 'a-link pointer',
  highlightClassName: 'bg-primary-highlight',
  headerTitleClassName: 'weight-700 uppercase',
  headerSubtitleClassName: 'weight-200 uppercase',
  zeroStateClassName: 'p2 center weight-300',
  tableBodyContainerClassName: 'border-bottom border-gray-light fit px0',
  primaryValueClassName: 'weight-300 fs18',
  secondaryValueClassName: 'weight-200 fs12',
  headerContainerClassName: 'xs-hide sm-hide flex items-center border-bottom-medium border-gray-50',
};

export default Table;
