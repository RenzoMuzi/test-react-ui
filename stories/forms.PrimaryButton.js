import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import PrimaryButton from 'ui/forms/PrimaryButton';

const stories = storiesOf('ui|forms/PrimaryButton', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
  ~~~js
  import { PrimaryButton } from 'pw-ui/ui/forms';
  ~~~
  `)(() => (
    <PrimaryButton
      onClick={action('clicked')}
      label={text('label', 'Primary Button')}
      disabled={boolean('disabled', false)}
    />
  )),
);

stories.add(
  'big',
  withInfo(`
  ~~~js
  import { PrimaryButton } from 'pw-ui/ui/forms';
  ~~~
  `)(() => (
    <PrimaryButton
      className={text('className', 'pc-btn--big')}
      onClick={action('clicked')}
      label={text('label', 'Primary Button Big')}
      disabled={boolean('disabled', false)}
    />
  )),
);
