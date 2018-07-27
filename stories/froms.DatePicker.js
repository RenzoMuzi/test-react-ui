import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { DatePicker } from 'ui/forms';

const stories = storiesOf('ui|forms/DatePicker', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { DatePicker } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <DatePicker
      onChange={() => {}}
      date={new Date()}
      inputClassName="input"
      disabledDays={[
        {
          before: new Date(),
        },
      ]}
    />
  )),
);
