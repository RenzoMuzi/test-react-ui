import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Button from 'ui/forms/Button';

const stories = storiesOf('ui|forms/Button', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
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

stories.add(
  'Disabled',
  withInfo(`
    ~~~js
    import { Button } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Button
      onClick={action('clicked')}
      label={text('label', 'Button')}
      disabled={boolean('disabled', true)}
    />
  )),
);

stories.add(
  'Primary Styles',
  withInfo(`
    ~~~js
    import { Button } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Button
      onClick={action('clicked')}
      label={text('label', 'Button')}
      disabled={boolean('disabled', false)}
      btnClassName={text('btnClassName', 'pc-btn-primary')}
      labelClassName={text('labelClassName', 'mx1')}
    />
  )),
);

stories.add(
  'Secondary Styles',
  withInfo(`
    ~~~js
    import { Button } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Button
      onClick={action('clicked')}
      label={text('label', 'Button')}
      disabled={boolean('disabled', false)}
      btnClassName={text('btnClassName', 'pc-btn-secondary')}
      labelClassName={text('labelClassName', 'mx1')}
    />
  )),
);
