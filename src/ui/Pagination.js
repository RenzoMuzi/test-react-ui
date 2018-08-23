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
      count, startIndex, pageSize, pageSizeOptions, text,
      pageClassName, disabledColor, changePageClassName, selectClassName,
    } = this.props;
    const currentPageEnd = startIndex + pageSize;
    const decreasePageClassName = classNames(
      startIndex === 0 ? disabledColor : '',
      'fs16 fa fa-caret-left px1',
      startIndex !== 0 ? `${changePageClassName} pointer` : '',
    );
    const increasePageClassName = classNames(
      currentPageEnd >= count ? disabledColor : '',
      'fs16 fa fa-caret-right pl1',
      currentPageEnd < count ? `${changePageClassName} pointer` : '',
    );

    return (
      <div className={classNames('flex items-center lh-21', pageClassName)}>
        <select
          className={selectClassName}
          value={pageSize}
          onChange={this.handleOnPageSizeChange}
        >
          {pageSizeOptions.map(size => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </select>
        <div className="px1">{text}</div>
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
  pageClassName: '',
  disabledColor: 'gray',
  changePageClassName: 'hover-orange-primary',
  selectClassName: 'px1 select-small',
  text: 'per page',
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

  pageClassName: PropTypes.string,
  disabledColor: PropTypes.string,
  changePageClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  text: PropTypes.string,
};

export default Pagination;
