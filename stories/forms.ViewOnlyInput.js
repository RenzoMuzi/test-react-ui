import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import ViewOnlyInput from 'ui/forms/ViewOnlyInput';

const stories = storiesOf('ui|forms/ViewOnlyInput', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { ViewOnlyInput } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <ViewOnlyInput
      value={text('value', 'Some value')}
    />
  )),
);
