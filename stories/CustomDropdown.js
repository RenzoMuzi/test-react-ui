import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import CustomDropdown from 'ui/CustomDropdown';

const stories = storiesOf('ui|CustomDropdown', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { CustomDropdown } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <CustomDropdown
      onChange={action('changed')}
      label={text('label', 'Custom dropdown')}
      options={object('options', [
        { label: 'First option', value: 7 },
        { label: 'Second Option', value: 14 },
        { label: 'Third Option', value: 21 },
        { label: 'Last Option', value: 28 },
      ])}
      className={text('className', '')}
    />
  )),
);
