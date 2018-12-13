import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

import Button from './Button';
import DatePicker from './DatePicker';
import CustomDropdown from './CustomDropdown';

const HOURS = [...Array(12).keys()].map(i => `${i + 1}`);
const MINUTES = [...Array(60).keys()].map(i => (i < 10 ? `0${i}` : `${i}`));

class DateTimePicker extends PureComponent {
  render() {
    const hour = this.getHour();
    const minute = this.getMinute();
    const amPm = this.getAmPm();
    const date = this.getDate();
    const {
      showDate, showTime, containerClassName,
      datePickerContainerClassName, timeSectionContainerClassName, separatorClassName,
      timeDropdownProps, datePickerProps, btnProps,
    } = this.props;

    return (
      <div className={classNames('flex', containerClassName)}>
        { showDate &&
          <div className={datePickerContainerClassName} style={{ flex: '2 0 0px' }}>
            <DatePicker
              onChange={this.handleDateChange}
              date={date}
              {...datePickerProps}
            />
          </div>
        }
        { showTime &&
          (
          <div className={classNames('flex', containerClassName)}>
            <div className={timeSectionContainerClassName}>
              <CustomDropdown
                defaultValue="HH"
                value={hour}
                handleSelect={this.handleHourChange}
                options={this.handleOptionsForDropdown(HOURS)}
                {...timeDropdownProps}
              />
            </div>
            <span className={separatorClassName}>:</span>
            <div className={timeSectionContainerClassName}>
              <CustomDropdown
                defaultValue="MM"
                value={minute}
                handleSelect={this.handleMinuteChange}
                options={this.handleOptionsForDropdown(MINUTES)}
                {...timeDropdownProps}
              />
            </div>
            <span className={separatorClassName} />
            <Button onClick={this.handleAmPmChange} label={amPm} {...btnProps} />
          </div>
          )
        }
      </div>
    );
  }

  handleOptionsForDropdown = (options) => (
    options.map(o => ({ value: o, label: o }))
  );

  handleDateChange = date => {
    let momentObj = this.getMoment();
    momentObj.year(date.getFullYear());
    momentObj.month(date.getMonth());
    momentObj.date(date.getDate());
    this.onChange(momentObj);
  };

  handleHourChange = hour => {
    const momentObj = this.getMoment();
    const ampm = this.getAmPm();
    const newHour = moment(`${hour} ${ampm}`, 'hh A').hour();
    momentObj.hour(newHour);
    this.onChange(momentObj);
  };

  handleMinuteChange = minute => {
    const momentObj = this.getMoment();
    momentObj.minute(minute);
    this.onChange(momentObj);
  };

  handleAmPmChange = () => {
    const momentObj = this.getMoment();
    const oldHour = momentObj.get('hour');
    const newHour = oldHour < 12 ? oldHour + 12 : oldHour - 12;
    momentObj.hour(newHour);
    this.onChange(momentObj);
  };

  getMoment() {
    const { time, format } = this.props;

    return moment(time, format);
  }

  onChange(momentObj) {
    const { onChange, format } = this.props;

    onChange(momentObj.format(format));
  }

  getAmPm() {
    return this.getMoment().format('A');
  }

  getHour() {
    return this.getMoment().format('h');
  }

  getMinute() {
    return this.getMoment().format('mm');
  }

  getDate() {
    return this.getMoment().toDate();
  }
}

DateTimePicker.defaultProps = {
  format: null,
  time: moment().format(),
  onChange: () => {},
  showDate: true,
  showTime: true,

  containerClassName: 'max-width-2',
  datePickerContainerClassName: 'mr1',
  timeSectionContainerClassName: 'width-60',
  separatorClassName: 'mx1/3 my1/3 lh3',

  timeDropdownProps: {
    listContainerClassName: 'absolute border-bottom-shadow bg-white flex flex-column border border-gray gray-primary rounded max-height-1 overflow-y-scroll',
    optionClassName: 'p1 nowrap custom-select-option pointer',
    disabledOptionClassName: 'p1 nowrap gray',
    itemClassName: 'center',
  },

  datePickerProps: {
    inputClassName: 'input',
    containerClassName: 'relative flex min-height-important-40',
    pickerContainerClassName: 'full-width bg-white',
  },
  btnProps: {
    btnClassName: 'min-height-important-40',
  },
};

DateTimePicker.propTypes = {
  /** Date and time used */
  time: PropTypes.string,
  /** Format used for date */
  format: PropTypes.string,
  /** Function to be called when date changes */
  onChange: PropTypes.func,
  /** Should show date picker */
  showDate: PropTypes.bool,
  /** Should show time pickers */
  showTime: PropTypes.bool,
  /** CSS class name for the general continer */
  containerClassName: PropTypes.string,
  /** CSS class name for the time dropdowns container */
  timeSectionContainerClassName: PropTypes.string,
  /** CSS class name for the date picker container */
  datePickerContainerClassName: PropTypes.string,
  /** CSS class name for the separation between time pickers */
  separatorClassName: PropTypes.string,
  /** Props forwarded to the DatePicker component used to display date values */
  datePickerProps: PropTypes.object,
  /** Props forwarded to the CustomDropdown component used to display time values */
  timeDropdownProps: PropTypes.object,
  /** Props forwarded to the Button component used to display AM:PM values */
  btnProps: PropTypes.object,
};

export default DateTimePicker;
