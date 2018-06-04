import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import SecondaryButton from 'ui/forms/SecondaryButton';
import Button from 'ui/forms/Button';

const stories = storiesOf('ui|forms/SecondaryButton', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo({
    text: `
      ~~~js
      import { SecondaryButton } from 'pw-ui/ui/forms';
      ~~~
    `,
    propTables: [Button], // Showing Button's props beacuse of this https://github.com/storybooks/storybook/issues/3493
    propTablesExclude: [SecondaryButton],
  })(() => (
    <SecondaryButton
      onClick={action('clicked')}
      label={text('label', 'Secondary Button')}
      disabled={boolean('disabled', false)}
    />
  )),
);
