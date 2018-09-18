import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import CustomDropdown from 'ui/CustomDropdown';
import Icon from 'ui/Icon';

const stories = storiesOf('ui|CustomDropdown', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'react-ui/ui';
    ~~~
  `)(() => (
    <CustomDropdown
      viewOnly={boolean('viewOnly', false)}
      placeholder={text('placeholder', 'Select')}
      handleSelect={(value, item) => console.log(value, item)}
      options={object('options', [
        { label: 'First option', value: 7 },
        { label: 'Second Option', value: 14 },
        { label: 'Third Option', value: 21 },
        { label: 'Last Option', value: 28 },
      ])}
      listContainerClassName={text('listContainerClassName', 'border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3')}
      containerClassName={text('containerClassName', '')}
      itemClassName={text('itemClassName', '')}
      optionsContainerClassName={text('optionsContainerClassName', '')}
      optionClassName={text('optionClassName', '')}
      disabledOptionClassName={text('disabledOptionClassName', '')}
      titleClassName={text('titleClassName', 'dropdown-title p1')}
      separatorClassName={text('separatorClassName', 'action-button-separator')}
      labelClassName={text('labelClassName', 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item')}
      customItemClassName={text('customItemClassName', '')}
    />
  )),
);

stories.add(
  'View Only',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'react-ui/ui';
    ~~~
  `)(() => (
    <CustomDropdown
      viewOnly={boolean('viewOnly', true)}
      placeholder={text('placeholder', 'Select')}
      options={object('options', [
        { label: 'First option', value: 7 },
        { label: 'Second Option', value: 14 },
        { label: 'Third Option', value: 21 },
        { label: 'Last Option', value: 28 },
      ])}
    />
  )),
);

stories.add(
  'Action Dropdown',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'react-ui/ui';
    ~~~
  `)(() => (
    <CustomDropdown
      viewOnly={boolean('viewOnly', false)}
      placeholder={text('placeholder', 'Actions')}
      handleSelect={(value, item) => console.log(value, item)}
      options={object('options', [
        {
          title: 'Message',
        },
        {
          label: 'On Demand',
          value: 'On Demand',
          handleItemSelect: () => console.log('On Demand'),
        },
        {
          separator: true,
        },
        {
          title: 'Print',
        },
        {
          label: 'Print Selected',
          value: 'Print Selected',
          handleItemSelect: () => console.log('Print Selected'),
        },
        {
          label: 'Print Page',
          value: 'Print Page',
          handleItemSelect: () => console.log('Print Page'),
        },
        {
          separator: true,
        },
        {
          title: 'Export',
        },
        {
          label: 'Export Selected',
          value: 'Export Selected',
          handleItemSelect: () => console.log('Export Selected'),
        },
        {
          label: 'Export All',
          value: 'Export All',
          handleItemSelect: () => console.log('Export All'),
        },
      ])}
      titleClassName={text('titleClassName', 'sky-blue py1/2 pl1 fs12 weight-600')}
      separatorClassName={text('separatorClassName', 'action-button-separator')}
      labelClassName={text('labelClassName', 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item')}
      listContainerClassName={text('listContainerClassName', 'ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3')}
      containerClassName={text('containerClassName', '')}
      itemClassName={text('itemClassName', '')}
      optionsContainerClassName={text('optionsContainerClassName', '')}
      optionClassName={text('optionClassName', '')}
      disabledOptionClassName={text('disabledOptionClassName', '')}
      customItemClassName={text('customItemClassName', '')}
    />
  )),
);

const IconHeader = () => <Icon
  className="pointer inline-block fa-sm gray pl1"
  type="plus-circle"
  size={20}
/>;

stories.add(
  'Action Icon (Custom Header)',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'react-ui/ui';

    const IconHeader = () => (
      <Icon
        className="pointer inline-block fa-sm gray pl1"
        type="plus-circle"
        size={20}
      />);
    ~~~
  `)(() => (
    <CustomDropdown
      viewOnly={boolean('viewOnly', false)}
      placeholder={text('placeholder', 'Actions')}
      handleSelect={(value, item) => console.log(value, item)}
      headerComponent={IconHeader}
      options={object('options', [
        {
          title: 'Message',
        },
        {
          label: 'On Demand',
          value: 'On Demand',
          handleItemSelect: () => console.log('On Demand'),
        },
        {
          separator: true,
        },
        {
          title: 'Print',
        },
        {
          label: 'Print Selected',
          value: 'Print Selected',
          handleItemSelect: () => console.log('Print Selected'),
        },
        {
          label: 'Print Page',
          value: 'Print Page',
          handleItemSelect: () => console.log('Print Page'),
        },
        {
          separator: true,
        },
        {
          title: 'Export',
        },
        {
          label: 'Export Selected',
          value: 'Export Selected',
          handleItemSelect: () => console.log('Export Selected'),
        },
        {
          label: 'Export All',
          value: 'Export All',
          handleItemSelect: () => console.log('Export All'),
        },
      ])}
      titleClassName={text('titleClassName', 'sky-blue py1/2 pl1 fs12 weight-600')}
      separatorClassName={text('separatorClassName', 'action-button-separator')}
      labelClassName={text('labelClassName', 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item')}
      listContainerClassName={text('listContainerClassName', 'ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3')}
      containerClassName={text('containerClassName', '')}
      itemClassName={text('itemClassName', '')}
      optionsContainerClassName={text('optionsContainerClassName', '')}
      optionClassName={text('optionClassName', '')}
      disabledOptionClassName={text('disabledOptionClassName', '')}
      customItemClassName={text('customItemClassName', '')}
    />
  )),
);

const CustomHeader = () => (<div className="orange pointer"> This is a custom header </div>);

stories.add(
  'Custom Header',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'react-ui/ui';

    const CustomHeader = () => (<div className="orange pointer"> This is a custom header </div>);
    ~~~
  `)(() => (
    <CustomDropdown
      viewOnly={boolean('viewOnly', false)}
      headerComponent={CustomHeader}
      options={object('options', [
        { title: 'Option 1' },
        {
          label: 'Press Option 1',
          value: 'Press Option 1',
          handleItemSelect: () => console.log('Pressed Option 1'),
        },
        {
          separator: true,
        },
        { title: 'Option 2' },
        {
          label: 'Press Option 2',
          value: 'Press Option 2',
          handleItemSelect: () => console.log('Pressed Option 2'),
        },
      ])}
      listContainerClassName={text('listContainerClassName', 'ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3')}
      containerClassName={text('containerClassName', '')}
      itemClassName={text('itemClassName', '')}
      optionsContainerClassName={text('optionsContainerClassName', '')}
      optionClassName={text('optionClassName', '')}
      disabledOptionClassName={text('disabledOptionClassName', '')}
      titleClassName={text('titleClassName', 'dropdown-title p1')}
      separatorClassName={text('separatorClassName', 'action-button-separator')}
      labelClassName={text('labelClassName', 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item')}
      customItemClassName={text('customItemClassName', '')}
    />
  )),
);

const IconCustom = () => <Icon
  className="pointer inline-block fa-sm gray pl1"
  type="child"
  size={25}
/>;

const IconCustom2 = () => (<div className="orange pointer"> This is custom </div>);

stories.add(
  'Custom Item on options',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'react-ui/ui';

    const IconCustom1 = () => <Icon
      className="pointer inline-block fa-sm gray pl1"
      type="child"
      size={25}
    />;
    const IconCustom2 = () => (<div className="orange pointer"> This is custom </div>);
    ~~~
  `)(() => (
    <CustomDropdown
      viewOnly={boolean('viewOnly', false)}
      headerComponent={CustomHeader}
      options={object('options', [
        { title: 'This are custom items!' },
        {
          separator: true,
        },
        {
          customItem: IconCustom(),
        },
        {
          separator: true,
        },
        {
          customItem: IconCustom2(),
        },
      ])}
      listContainerClassName={text('listContainerClassName', 'ml1 absolute border-bottom-shadow bg-white flex flex-column z3 border border-gray gray-primary max-height-5 overflow-y-scroll py1/3')}
      containerClassName={text('containerClassName', '')}
      itemClassName={text('itemClassName', '')}
      optionsContainerClassName={text('optionsContainerClassName', '')}
      optionClassName={text('optionClassName', '')}
      disabledOptionClassName={text('disabledOptionClassName', '')}
      titleClassName={text('titleClassName', 'dropdown-title p1')}
      separatorClassName={text('separatorClassName', 'action-button-separator')}
      labelClassName={text('labelClassName', 'p1 nowrap fs12 pl1 py1/2 pointer action-button-item')}
      customItemClassName={text('customItemClassName', 'center')}
    />
  )),
);
