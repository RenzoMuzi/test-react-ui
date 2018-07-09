import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { ActionIcon } from 'ui/ActionIcon';

const stories = storiesOf('ui|ActionIcon', module);
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
    import { ActionIcon } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <ActionIcon
      icon={text('icon', 'cog')}
      className={text('className', '')}
      dropdownClassName={text('dropdownClassName', '')}
      actions={object('actions', actions)}
    />
  )),
);
