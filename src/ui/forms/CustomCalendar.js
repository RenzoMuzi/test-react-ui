import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import DayPicker from 'react-day-picker/DayPicker';
import onClickOutside from 'react-onclickoutside';

const TOTAL_YEARS = 5;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const modifiersStyles = {
  selectedDate: {
    color: 'white',
    backgroundColor: '#f79674',
    borderRadius: '10%',
  },
  hoveredDate: {
    backgroundColor: 'silver',
    borderRadius: '10%',
  },
};

const YearMonthForm = ({
  pickerYearMonth,
  localeUtils,
  onChange,
}) => {
  const months = localeUtils.getMonths();
  const years = Array.from(Array(TOTAL_YEARS), (_, i) => currentYear + i);
  const handleChange = e => {
    const { year, month: inputMonth } = e.target.form;
    onChange(new Date(year.value, inputMonth.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select
        name="month"
        onChange={handleChange}
        value={pickerYearMonth.getMonth()}
      >
        {months.map((monthName, i) => (
          <option key={monthName} value={i}>
            {monthName}
          </option>
        ))}
      </select>
      <select
        name="year"
        onChange={handleChange}
        value={pickerYearMonth && pickerYearMonth.getFullYear()}
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
};

YearMonthForm.propTypes = {
  pickerYearMonth: PropTypes.object.isRequired,
  localeUtils: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CalendarPickerView = ({
  showCalendar,
  disabledDays,
  pickerYearMonth,
  selectedDate,
  hoveredDate,
  handleDayClick,
  handleDayHover,
  handleDayLeave,
  handlePickerYearMonthChange,
  fromMonth,
  toMonth,
}) => (
  <div
    className={classNames('YearNavigation absolute bg-white shadow-faded z4', {
      'border border-grey': showCalendar,
    })}
    style={{ top: '40px' }}
  >
    {showCalendar && (
      <DayPicker
        month={pickerYearMonth}
        selectedDate={selectedDate}
        fromMonth={fromMonth}
        toMonth={toMonth}
        disabledDays={disabledDays}
        modifiers={{ selectedDate, hoveredDate }}
        modifiersStyles={modifiersStyles}
        selectedDays={selectedDate}
        onDayClick={handleDayClick}
        onDayMouseEnter={handleDayHover}
        onDayMouseLeave={handleDayLeave}
        onMonthChange={handlePickerYearMonthChange}
        onYearChange={handlePickerYearMonthChange}
        captionElement={({ localeUtils }) => (
          <YearMonthForm
            date={selectedDate}
            pickerYearMonth={pickerYearMonth}
            localeUtils={localeUtils}
            onChange={handlePickerYearMonthChange}
          />
        )}
      />
    )}
  </div>
);

CalendarPickerView.propTypes = {
  showCalendar: PropTypes.bool.isRequired,
  pickerYearMonth: PropTypes.object.isRequired,
  disabledDays: PropTypes.array.isRequired,
  selectedDate: PropTypes.object.isRequired,
  hoveredDate: PropTypes.object,
  handleDayClick: PropTypes.func.isRequired,
  handleDayHover: PropTypes.func.isRequired,
  handleDayLeave: PropTypes.func.isRequired,
  handlePickerYearMonthChange: PropTypes.func.isRequired,
};

CalendarPickerView.defaultProps = {
  hoveredDate: null,
};

class CustomCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: (props.date ? moment(props.date).format('MM/DD/YYYY') : ''),
      showCalendar: false,
      selectedDate: (props.date ? new Date(props.date) : null),
      pickerYearMonth: props.date,
      hoveredDate: null,
    };
  }

  render() {
    const {
      inputClassName,
      placeholder,
      ...props
    } = this.props;
    return (
      <div className="full-width relative">
        <input
          className={inputClassName}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder={placeholder}
        />
        <CalendarPickerView
          selectedDate={this.state.selectedDate}
          showCalendar={this.state.showCalendar}
          pickerYearMonth={this.state.pickerYearMonth}
          hoveredDate={this.state.hoveredDate}
          handleDayClick={this.setSelectedDate}
          handleDayHover={this.handleDayHover}
          handleDayLeave={this.handleDayLeave}
          handlePickerYearMonthChange={this.handlePickerYearMonthChange}
          onChange={this.handleChange}
          {...props}
        />
      </div>
    );
  }

  setSelectedDate = (date) => this.setState({
    value: date ? moment(date).format('MM/DD/YYYY') : '',
    selectedDate: date ? new Date(date) : null,
    showCalendar: false,
  });

  handlePickerYearMonthChange = (date) => this.setState({
    pickerYearMonth: date,
    selectedDate: date,
    value: date ? moment(date).format('MM/DD/YYYY') : '',
  });

  handleFocus = () => this.setState({ showCalendar: true });

  handleClickOutside() {
    this.setState({ showCalendar: false });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ value });
    if (moment(value, 'MM/DD/YYYY', true).isValid()) {
      const newDate = new Date(value);
      this.setSelectedDate(newDate);
      this.props.onChange(newDate);
    }
  }

  handleDayHover = (date) => this.setState({ hoveredDate: date });

  handleDayLeave = () => this.setState({ hoveredDate: null });
}

CustomCalendar.propTypes = {
  onChange: PropTypes.func,
  disabledDays: PropTypes.array,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  date: PropTypes.object,
  fromMonth: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date),
};

CustomCalendar.defaultProps = {
  onChange: () => {},
  disabledDays: [],
  placeholder: null,
  inputClassName: 'input',
  date: new Date(),
  fromMonth: new Date(currentYear, currentMonth),
  toMonth: new Date(currentYear + TOTAL_YEARS, 11),
};

export default onClickOutside(CustomCalendar);
