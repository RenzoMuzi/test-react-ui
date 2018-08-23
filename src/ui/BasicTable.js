import classNames from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import loadingGif from 'images/loading.gif';

import Checkbox from './forms/Checkbox';

class BasicTable extends Component {
  render() {
    const { loading } = this.props;
    return (
      <table
        className={classNames('c-table', {
          'c-table__modal': this.props.modal,
        })}
      >
        {this.renderHeader()}
        {loading ? this.renderLoading() : this.renderBody()}
      </table>
    );
  }

  renderLoading() {
    const { columns, loadingSrc, loadingClassName } = this.props;

    return (
      <tbody className="center p1">
        <tr>
          <td colSpan={columns.length}>
            <img
              src={loadingSrc}
              alt="loading"
              className={loadingClassName}
            />
          </td>
        </tr>
      </tbody>
    );
  }

  renderHeader() {
    const {
      columns, removeAction, selectAction, headerClassName,
    } = this.props;

    const tableFlexSize = this.calculateTableFlexSize();

    return (
      <thead className={headerClassName}>
        <tr className="pl1">
          {selectAction && this.renderSelectAllHeader()}
          {columns.map((column, index) =>
            this.renderColumnHeader(column, tableFlexSize, index),
          )}
          {removeAction && <th style={{ width: '21px' }} />}
        </tr>
      </thead>
    );
  }

  renderSelectAllHeader() {
    const { onSelectAllChange } = this.props;

    const isAllChecked = this.isAllChecked();

    return (
      <th className="p0 px1" style={{ width: '21px' }}>
        <Checkbox
          value={isAllChecked}
          onChange={checked => onSelectAllChange(checked)}
        />
      </th>
    );
  }

  renderColumnHeader(column, tableFlexSize, index) {
    const { alignTop, columnHeader } = this.props;

    const { title, flexSize } = column;

    const columnWidth = this.calculateColumnWidthStyle(flexSize, tableFlexSize);

    const className = classNames('uppercase', 'py1', 'fs13', {
      'align-top': alignTop,
    });

    const content = columnHeader ? (
      columnHeader(column)
    ) : (
      <div className="weight-700">{title.toUpperCase()}</div>
    );

    return (
      <th style={{ width: columnWidth }} className={className} key={index}>
        {content}
      </th>
    );
  }

  renderBody() {
    const {
      records, removeAction, selectAction, highlightFunc, highlightClass,
    } = this.props;

    return (
      <tbody>
        {records.map((record, index) => {
          const rowClass = highlightFunc && highlightFunc(record) ? highlightClass : '';

          return (
            <tr key={index} className={classNames('border-top border-gray-50 pl1', rowClass)}>
              {selectAction && this.renderSelectActionCell(record, index)}
              {this.renderRowCells(record)}
              {removeAction && this.renderDeleteActionCell(record, index)}
            </tr>
          );
        })}
        {isEmpty(records) && this.renderEmptyState()}
      </tbody>
    );
  }

  renderRowCells(record) {
    const { alignTop, columns } = this.props;

    const tableFlexSize = this.calculateTableFlexSize();

    const className = classNames('fs13', { 'align-top': alignTop });

    const cells = columns.map((column, columnIndex) => (
      <td
        className={className}
        key={columnIndex}
        style={{
          width: this.calculateColumnWidthStyle(column.flexSize, tableFlexSize),
        }}
      >
        {this.renderCellContent(record, column, columnIndex)}
      </td>
    ));

    return cells;
  }

  renderCellContent(record, column) {
    const { cell, viewOnly } = this.props;
    const { format, key } = column;

    return viewOnly && format ? format(get(record, key)) : cell(record, column);
  }

  renderSelectActionCell(record, index) {
    const { selectedRecords, onSelectChange } = this.props;

    return (
      <td className="p0 px1">
        <Checkbox
          value={selectedRecords[index]}
          onChange={checked => onSelectChange(record, checked, index)}
        />
      </td>
    );
  }

  renderDeleteActionCell(record, i) {
    const { viewOnly, onDelete, deleteClassName } = this.props;

    return (
      <td>
        {!viewOnly && (
          <i
            className={deleteClassName}
            onClick={() => onDelete(record, i)}
          />
        )}
      </td>
    );
  }

  renderEmptyState() {
    const { columns, removeAction, emptyState } = this.props;

    const colSpan = removeAction ? columns.length + 1 : columns.length;

    return (
      <tr className="pl1">
        <td colSpan={colSpan}>{emptyState()}</td>
      </tr>
    );
  }

  calculateTableFlexSize() {
    const { columns } = this.props;

    return columns.reduce((width, column) => width + (column.flexSize || 0), 0);
  }

  calculateColumnWidthStyle(columnFlexSize, tableFlexSize) {
    return isNil(columnFlexSize)
      ? 'auto'
      : `${100 * columnFlexSize / tableFlexSize}%`;
  }

  isAllChecked() {
    const { records, selectedRecords } = this.props;

    return (
      selectedRecords.every(selection => selection) &&
      selectedRecords.length === records.length
    );
  }
}

BasicTable.displayName = 'Table';

BasicTable.defaultProps = {
  alignTop: false,
  columnHeader: () => {},
  columns: [],
  records: [],
  selectedRecords: [],
  emptyState: () => {},
  modal: false,
  removeAction: false,
  selectAction: false,
  viewOnly: false,
  onDelete: () => {},
  onSelectAllChange: () => {},
  onSelectChange: () => {},
  highlightFunc: () => {},
  highlightClass: '',
  loading: false,
  loadingSrc: loadingGif,
  loadingClassName: 'align-center width-32px',
  headerClassName: 'c-table__header',
  deleteClassName: 'fa fa-times orange-primary pointer',
};

BasicTable.propTypes = {
  /** Enables top aligning for table cells */
  alignTop: PropTypes.bool,
  /** List of the columns that form the table */
  columns: PropTypes.array,
  /** Defines what to show when there are no records */
  emptyState: PropTypes.func,
  /** List that defines the rows of the table */
  records: PropTypes.array,
  /** Rows can be removed or not */
  removeAction: PropTypes.bool,
  /** Rows can be selected or not */
  selectAction: PropTypes.bool,
  /** List of currently selected records */
  selectedRecords: PropTypes.arrayOf(PropTypes.bool),
  /** Determines how the cell content is rendered */
  cell: PropTypes.func.isRequired,
  /** Determines how the headers will be rendered */
  columnHeader: PropTypes.func,
  /** Table can be modified or not */
  viewOnly: PropTypes.bool,
  /** Handler when a row is removed */
  onDelete: PropTypes.func,
  /** Handler when the option to select all is checked */
  onSelectAllChange: PropTypes.func,
  /** Handler when a row is selected */
  onSelectChange: PropTypes.func,
  /** Determines the condition for a row to be highlighted */
  highlightFunc: PropTypes.func,
  /** CSS class for highlighted rows */
  highlightClass: PropTypes.string,
  /** Table is included in a modal or not */
  modal: PropTypes.bool,
  /** Table content is loading or not */
  loading: PropTypes.bool,
  /** Loading img src */
  loadingSrc: PropTypes.string,
  /** Loading icon style */
  loadingClassName: PropTypes.string,
  /** CSS class name for table header */
  headerClassName: PropTypes.string,
  /** CSS class name for delete icon */
  deleteClassName: PropTypes.string,
};

export default BasicTable;
