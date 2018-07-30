import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs';
import FloatingList from 'ui/FloatingList';

const stories = storiesOf('ui|FloatingList', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { FloatingList } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <FloatingList
      onChange={action('changed')}
      items={object('options', [
        { label: 'First option', value: 7 },
        { label: 'Second Option', value: 14 },
        { label: 'Third Option', value: 21 },
        { label: 'Last Option', value: 28 },
      ])}
    />
  )),
);
