import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';
import Dropdown from 'ui/forms/Dropdown';

const stories = storiesOf('ui|forms/Dropdown', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { Dropdown } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <Dropdown
      onChange={action('changed')}
      title={text('title', 'Select')}
      options={object('options', [
        { label: 'First option', value: 7 },
        { label: 'Second Option', value: 14 },
        { label: 'Third Option', value: 21 },
        { label: 'Last Option', value: 28 },
      ])}
      includeBlank={boolean('includeBlank', true)}
      viewOnly={boolean('viewOnly', false)}
      className={text('className', 'fs12 p1 bg-orange border-orange')}
      containerClass={text('containerClass', 'mr1 fs12 white')}
    />
  )),
);
