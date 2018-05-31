import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Button from 'ui/forms/Button';

const stories = storiesOf('ui|forms/Button', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { Button } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Button
      onClick={action('clicked')}
      label={text('label', 'Button')}
      disabled={boolean('disabled', false)}
    />
  )),
);
