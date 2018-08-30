import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import moment from 'moment';
import DateTimePicker from 'ui/forms/DateTimePicker';

const stories = storiesOf('ui|DateTimePicker', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withState({ value: moment().format() })(
    withInfo(`
      ~~~js
      import { DateTimePicker } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <DateTimePicker
        onChange={(e) => { store.set({ value: e }); }}
        time={store.state.value}
        showTime={boolean('showTime', true)}
        showDate={boolean('showDate', true)}
        timeDropdownProps={{
          containerClassName: 'absolute',
          listContainerClassName: 'full-width border-bottom-shadow bg-orange flex flex-column border border-gray gray-primary rounded max-height-1 overflow-y-scroll center',
          labelClassName: 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item-example',
        }}
      />
    )),
  ),
);

stories.add(
  'Custom',
  withState({ value: moment().format() })(
    withInfo(`
      ~~~js
      import { DateTimePicker } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <DateTimePicker
        onChange={(e) => { store.set({ value: e }); }}
        time={text('time', store.state.value)}
        showTime={boolean('showTime', true)}
        showDate={boolean('showDate', true)}
        containerClassName={text('containerClassName', '')}
        datePickerContainerClassName={text('datePickerContainerClassName', 'mr1')}
        timeSectionContainerClassName={text('timeSectionContainerClassName', 'width-60')}
        separatorClassName={text('separatorClassName', 'mx1/3 my1/3 bold')}
        timeDropdownProps={object('timeDropdownProps', {
          containerClassName: 'absolute bg-gray',
          listContainerClassName: 'full-width border-bottom-shadow bg-sky-blue flex flex-column border border-gray gray-primary rounded max-height-1 overflow-y-scroll center',
          labelClassName: 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item-example',
        })}
        datePickerProps={object('datePickerProps', {
          showYearMonthForm: false,
          pickerContainerClassName: 'bg-gray',
          modifiersStyles: {
            selectedDate: {
              color: '#316eaa',
              backgroundColor: '#BABABA',
            },
            hoveredDate: {
              backgroundColor: '#85CCB8',
              borderRadius: '10%',
              color: 'red',
            },
          },
          containerClassName: 'relative flex height-important-40',
          inputClassName: 'input bg-gray',
        })}
        btnProps={object('btnProps', {
          btnClassName: 'height-important-40 bg-gray',
        })}
      />
    )),
  ),
);

stories.add(
  'Disabled past dates navigation',
  withState({ value: moment().format() })(
    withInfo(`
      ~~~js
      import { DateTimePicker } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <DateTimePicker
        onChange={(e) => { store.set({ value: e }); }}
        time={text('time', store.state.value)}
        showTime={boolean('showTime', true)}
        showDate={boolean('showDate', true)}
        containerClassName={text('containerClassName', '')}
        datePickerContainerClassName={text('datePickerContainerClassName', 'mr1')}
        timeSectionContainerClassName={text('timeSectionContainerClassName', 'width-60')}
        separatorClassName={text('separatorClassName', 'mx1/3 my1/3 bold')}
        timeDropdownProps={object('timeDropdownProps', {
          containerClassName: 'absolute bg-gray',
          listContainerClassName: 'full-width border-bottom-shadow bg-orange flex flex-column border border-gray gray-primary rounded max-height-1 overflow-y-scroll center',
          labelClassName: 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item-example',
        })}
        datePickerProps={object('datePickerProps', {
          showYearMonthForm: false,
          fromMonth: new Date(new Date().getFullYear(), new Date().getMonth()),
          pickerContainerClassName: 'bg-gray',
          modifiersStyles: {
            selectedDate: {
              color: 'black',
              backgroundColor: 'yellow',
            },
            hoveredDate: {
              backgroundColor: 'black',
              borderRadius: '10%',
              color: 'yellow',
            },
          },
          containerClassName: 'relative flex height-important-40',
          inputClassName: 'input bg-gray',
        })}
        btnProps={object('btnProps', {
          btnClassName: 'height-important-40 bg-gray',
        })}
      />
    )),
  ),
);

stories.add(
  'Disabled days',
  withState({ value: moment().format() })(
    withInfo(`
      ~~~js
      import { DateTimePicker } from 'pw-ui/ui';
      ~~~
    `)(({ store }) => (
      <DateTimePicker
        onChange={(e) => { store.set({ value: e }); }}
        time={text('time', store.state.value)}
        showTime={boolean('showTime', true)}
        showDate={boolean('showDate', true)}
        containerClassName={text('containerClassName', '')}
        datePickerContainerClassName={text('datePickerContainerClassName', 'mr1')}
        timeSectionContainerClassName={text('timeSectionContainerClassName', 'width-60')}
        separatorClassName={text('separatorClassName', 'mx1/3 my1/3 bold')}
        timeDropdownProps={object('timeDropdownProps', {
          containerClassName: 'absolute bg-gray',
          listContainerClassName: 'full-width border-bottom-shadow bg-gray flex flex-column border border-gray gray-primary rounded max-height-1 overflow-y-scroll center',
          labelClassName: 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item-example',
        })}
        datePickerProps={object('datePickerProps', {
          showYearMonthForm: false,
          disabledDays: { daysOfWeek: [0, 6] },
          pickerContainerClassName: 'bg-gray',
          modifiersStyles: {
            selectedDate: {
              color: '#316eaa',
              backgroundColor: '#BABABA',
            },
            disabled: {
              color: 'blue',
            },
            hoveredDate: {
              backgroundColor: '#85CCB8',
              borderRadius: '10%',
              color: 'red',
            },
          },
          containerClassName: 'relative flex height-important-40',
          inputClassName: 'input bg-gray',
        })}
        btnProps={object('btnProps', {
          btnClassName: 'height-important-40 bg-gray',
        })}
      />
    )),
  ),
);
