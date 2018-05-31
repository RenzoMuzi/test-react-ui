import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Checkbox from 'ui/forms/Checkbox';

const stories = storiesOf('ui|forms/Checkbox', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { Checkbox } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Checkbox
      onChange={action('changed')}
      value={boolean('value', false)}
      viewOnly={boolean('viewOnly', false)}
    />
  )),
);
