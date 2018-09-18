import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import Icon from 'ui/Icon';

const stories = storiesOf('ui|Icon', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { Icon } from 'react-ui/ui';
    ~~~
  `)(() => (
    <Icon
      type={text('type', 'plus-circle')}
      size={number('size', 20)}
      className={text('className', 'pointer')}
    />
  )),
);

stories.add(
  'Custom color',
  withInfo(`
    ~~~js
    import { Icon } from 'react-ui/ui';
    ~~~
  `)(() => (
    <Icon
      type={text('type', 'plus-circle')}
      size={number('size', 20)}
      className={text('className', 'pointer orange')}
    />
  )),
);
