import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import ActionButton from 'ui/ActionButton';

const stories = storiesOf('ui|ActionButton', module);
stories.addDecorator(withKnobs);

const actions = [
  {
    title: 'Message',
    items: [
      {
        name: 'On Demand',
        onSelect: () => {},
      },
    ],
  },
  {
    title: 'Print',
    items: [
      {
        name: 'Print Selected',
        onSelect: () => {},
      },
      {
        name: 'Print Page',
        onSelect: () => {},
      },
    ],
  },
  {
    title: 'Export',
    items: [
      {
        name: 'Export Selected',
        onSelect: () => {},
      },
      {
        name: 'Export All',
        onSelect: () => {},
      },
    ],
  },
];

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { ActionButton } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <ActionButton
      className={text('className', '')}
      dropdownClassName={text('dropdownClassName', '')}
      actions={object('actions', actions)}
    />
  )),
);
