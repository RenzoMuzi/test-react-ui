import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import ViewOnlyText from 'ui/forms/ViewOnlyText';

const stories = storiesOf('ui|forms/ViewOnlyText', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { ViewOnlyText } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <ViewOnlyText
      value={text('value', 'Some value')}
    />
  )),
);
