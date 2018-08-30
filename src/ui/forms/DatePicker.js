import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import DayPicker from 'react-day-picker/DayPicker';
import onClickOutside from 'react-onclickoutside';

const TOTAL_YEARS = 5;
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

const modifiersStylesDefault = {
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
  showYearMonthForm,
  onChange,
}) => {
  const months = localeUtils.getMonths();
  const years = Array.from(Array(TOTAL_YEARS), (_, i) => currentYear + i);
  const handleChange = e => {
    const { year, month: inputMonth } = e.target.form;
    onChange(new Date(year.value, inputMonth.value));
  };
  if (!showYearMonthForm) {
    return (
      <div className="DayPicker-Caption fw600 fs25">
        {months[pickerYearMonth.getMonth()]}
      </div>
    );
  }
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
  showYearMonthForm: PropTypes.bool.isRequired,
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
  modifiersStyles,
  showYearMonthForm,
  pickerContainerClassName,
}) => (
  <div
    className={classNames('YearNavigation absolute shadow-faded z4', pickerContainerClassName, {
      'border border-gray': showCalendar,
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
            showYearMonthForm={showYearMonthForm}
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
  modifiersStyles: PropTypes.object.isRequired,
  handleDayClick: PropTypes.func.isRequired,
  handleDayHover: PropTypes.func.isRequired,
  handleDayLeave: PropTypes.func.isRequired,
  showYearMonthForm: PropTypes.bool.isRequired,
  handlePickerYearMonthChange: PropTypes.func.isRequired,
  fromMonth: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date),
  pickerContainerClassName: PropTypes.string,
};

CalendarPickerView.defaultProps = {
  hoveredDate: null,
  fromMonth: new Date(currentYear, currentMonth),
  toMonth: new Date(currentYear + TOTAL_YEARS, 11),
  pickerContainerClassName: 'bg-white',
};

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: (props.date ? moment(props.date).format(props.format) : ''),
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
      containerClassName,
      ...props
    } = this.props;
    return (
      <div className={containerClassName}>
        <input
          className={inputClassName}
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
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
          {...props}
        />
      </div>
    );
  }

  setSelectedDate = (date, { disabled }) => {
    if (disabled) return;
    const { format } = this.props;
    this.setState({
      value: date ? moment(date).format(format) : '',
      selectedDate: date ? new Date(date) : null,
      pickerYearMonth: date,
      showCalendar: this.props.closeCalendarOnSelect ? false : this.state.showCalendar,
    });
    this.props.onChange(date);
  };

  handlePickerYearMonthChange = (date) => this.setState({
    pickerYearMonth: date,
    selectedDate: date,
    value: date ? moment(date).format(this.props.format) : '',
  });

  handleFocus = () => this.setState({ showCalendar: true });

  handleClickOutside() {
    this.setState({ showCalendar: false });
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    const { format } = this.props;

    if (moment(value, format, true).isValid()) {
      const newDate = new Date(value);
      this.setSelectedDate(newDate);
    } else {
      this.setState({ value });
    }
  }

  handleDayHover = (date, { disabled }) => (!disabled && this.setState({ hoveredDate: date }))

  handleDayLeave = () => this.setState({ hoveredDate: null });
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  disabledDays: PropTypes.array,
  placeholder: PropTypes.string,
  inputClassName: PropTypes.string,
  format: PropTypes.string,
  containerClassName: PropTypes.string,
  date: PropTypes.object,
  closeCalendarOnSelect: PropTypes.bool,
  showYearMonthForm: PropTypes.bool,
  modifiersStyles: PropTypes.object,
  fromMonth: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date),
};

DatePicker.defaultProps = {
  onChange: () => {},
  disabledDays: [],
  placeholder: null,
  inputClassName: 'input',
  date: new Date(),
  closeCalendarOnSelect: true,
  modifiersStyles: modifiersStylesDefault,
  showYearMonthForm: true,
  containerClassName: 'full-width relative',
  format: 'MM/DD/YYYY',
  fromMonth: null,
  toMonth: new Date(currentYear + TOTAL_YEARS, 11),
};

export default onClickOutside(DatePicker);
