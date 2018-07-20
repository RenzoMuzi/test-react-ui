import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Pagination extends React.PureComponent {
  handleOnPageSizeChange = (event) => {
    const pageSize = Number(event.target.value);
    this.props.onPaginationChange({ startIndex: 0, pageSize });
  };

  handleOnIncreasePage = () => {
    const {
      startIndex, pageSize, count, onPaginationChange,
    } = this.props;
    if (startIndex + pageSize >= count) return;
    onPaginationChange({ startIndex: Math.min(count, startIndex + pageSize), pageSize });
  };

  handleOnDecreasePage = () => {
    const { startIndex, pageSize, onPaginationChange } = this.props;
    if (startIndex === 0) return;
    onPaginationChange({ startIndex: Math.max(0, startIndex - pageSize), pageSize });
  };

  render() {
    const {
      count, startIndex, pageSize, pageSizeOptions,
    } = this.props;
    const currentPageEnd = startIndex + pageSize;
    const decreasePageClassName = classNames(
      'fs16 fa fa-caret-left px1',
      { gray: startIndex === 0 },
      { 'pointer hover-orange-primary gray-primary': startIndex !== 0 },
    );
    const increasePageClassName = classNames(
      'fs16 fa fa-caret-right pr2 px1',
      { gray: currentPageEnd >= count },
      { 'pointer hover-orange-primary gray-primary': currentPageEnd < count },
    );

    return (
      <div className="flex items-center lh-21">
        <select
          className="px1 select-small"
          value={pageSize}
          onChange={this.handleOnPageSizeChange}
        >
          {pageSizeOptions.map(size => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </select>
        <div className="px1">per page</div>
        <i
          className={decreasePageClassName}
          onClick={this.handleOnDecreasePage}
        />
        <div>{`${startIndex + 1} - ${Math.min(count, currentPageEnd)} of ${count}`}</div>
        <i
          className={increasePageClassName}
          onClick={this.handleOnIncreasePage}
        />
      </div>
    );
  }
}

Pagination.defaultProps = {
  count: 0,
  pageSizeOptions: [10, 100, 500, 1000, 5000],
  pageSize: 10,
  startIndex: 0,
};

Pagination.propTypes = {
  /** Options for amount of items per page */
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  /** Amount of items per page */
  pageSize: PropTypes.number,
  /** Parent callback function for pagination changes */
  onPaginationChange: PropTypes.func.isRequired,
  /** Maximum amount of items */
  count: PropTypes.number,
  /** The index of item the pagination should start at */
  startIndex: PropTypes.number,
};

export default Pagination;
