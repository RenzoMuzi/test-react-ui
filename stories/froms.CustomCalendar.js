import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { CustomCalendar } from 'ui/forms';

const stories = storiesOf('ui|forms/CustomCalendar', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { CustomCalendar } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <CustomCalendar
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
