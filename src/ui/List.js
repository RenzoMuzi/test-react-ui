import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import valuesUtils from 'utils/values';
import isEmpty from 'lodash/isEmpty';
import { Checkbox } from './forms';
import loadingGif from '../images/loading.gif';
import ListDropdown from './ListDropdown';

class List extends Component {
  render() {
    return (
      <div>
        <div className="xs-hide sm-hide flex items-center border-bottom-medium border-gray-50">
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
    let values = column.map(c => this.renderValue(record[c.key], c.format, c.prefix, c.subKey));
    values = options.skipBlank ? values.filter(value => value !== valuesUtils.emptyValue) : values;

    const value = values.join('/');
    if (columnIndex === 0 && showDropdown && dropdown.length > 0) {
      return <ListDropdown
        value={value}
        dropdown={dropdown}
        record={record}
        redirect={options.redirect}
      />;
    }

    if (options.subtitleJoin === 'list') {
      return values.map((val, index) => <div key={index}>{val}</div>);
    }

    return value;
  };

  renderValue = (value, format, prefix, subKey) => {
    let valueToShow = value || '';
    if (subKey && !isEmpty(value)) {
      valueToShow = value[0][subKey];
    }
    switch (format) {
      case 'percent':
        valueToShow = valuesUtils.formatPercent(valueToShow);
        break;
      case 'currency':
        valueToShow = valuesUtils.formatCurrency(valueToShow);
        break;
      case 'date':
        valueToShow = valuesUtils.formatDate(valueToShow);
        break;
      case 'phone':
        valueToShow = valuesUtils.formatPhoneNumber(valueToShow);
        break;
      default:
        valueToShow = valuesUtils.formatDefault(valueToShow);
        break;
    }
    if (prefix) {
      return isEmpty(valueToShow) || valueToShow === '-' ? '' : `${prefix}${valueToShow}`;
    }
    return valueToShow;
  };

  renderLoading = () => (
    <div className="center p3">
      <img src={loadingGif} alt="loading" />
    </div>
  );

  renderHeader = () => {
    const { columns, allSelected, onAllChange } = this.props;

    const patientColumns = columns.map((column, index) => (
      <div
        className={classNames('sm-col sm-col-5 p1 fs11', {
          center: index !== 0,
          'sm-col-10': index === 0,
          'bg-orange-highlight': column.highlighted,
        })}
        key={index}
      >
        <div className="weight-700 uppercase">
          {this.renderHeaderText(column.title)}
          <div className="weight-200 uppercase">{this.renderSecondTitleHeader(column.title)}</div>
        </div>
        <div className="weight-200 uppercase">{this.renderHeaderText(column.subtitle)}</div>
      </div>
    ));

    const checkboxColumn = (
      <div className="sm-col p1 fs11" key="selectAll">
        <Checkbox value={allSelected} onChange={onAllChange} />
      </div>
    );

    return [checkboxColumn, ...patientColumns];
  };

  renderBody = () => {
    const {
      columns,
      records,
      zeroStateText,
      isLoading,
      selectedRecords,
      onRowChange,
      renderAdditionalInfo,
    } = this.props;

    if (isLoading) {
      return this.renderLoading();
    }

    return records && records.length ? (
      records.map(record => (
        <div key={record.PatientId}>
          <div className="border-bottom border-gray-light fit px0">
            <div className="md-flex flex-auto">
              <div>
                <div className="sm-col p1 fs14">
                  <Checkbox
                    value={selectedRecords.includes(record.PatientId)}
                    onChange={value => onRowChange({ value, PatientId: record.PatientId })}
                  />
                </div>
              </div>
              {columns.map((column, columnIndex) => (
                <div
                  className={classNames('p1', {
                    'sm-col sm-col-5 center': columnIndex !== 0,
                    'md-col md-col-10': columnIndex === 0,
                    'bg-orange-highlight': column.highlighted,
                  })}
                  key={columnIndex}
                >
                  {columnIndex !== 0 && (
                    <div className="md-hide lg-hide weight-600 fs14 uppercase">
                      {this.renderHeaderText(column.title)}{' '}
                      {this.renderSecondTitleHeader(column.title)}
                    </div>
                  )}
                  <div className="weight-300 fs18">
                    {this.renderColumnValues(
                      record,
                      column.title,
                      columnIndex,
                      column.options,
                    )}
                  </div>
                  {column.subtitle.length > 0 && (
                    <div className="weight-200 fs12">
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
      <div className="p2 center weight-300">{zeroStateText}</div>
    );
  };
}

List.propTypes = {
  /** Columns rendered on the list defined with the following object structure:
   * {
   *  title: [{ headerName: ['name'], key: 'recordKey' }],
   *  subtitle: [{ headerName: [''], key: 'anotherRecordKey',
   *  format: 'currency', prefix: 'Amount:' }],
   *  highlighted: true
   * }
  */
  columns: PropTypes.array.isRequired,
  /** List of Patient records to populate the table */
  records: PropTypes.array,
  /** List of selected patientIDs */
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
};

List.defaultProps = {
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
};

export default List;
