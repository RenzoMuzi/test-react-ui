import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import EditSelectAttribute from 'ui/forms/EditSelectAttribute';

const stories = storiesOf('ui|forms/EditSelectAttribute', module);
stories.addDecorator(withKnobs);

const options = [
  { label: 'First option', value: 7 },
  { label: 'Second Option', value: 14 },
  { label: 'Third Option', value: 21 },
  { label: 'Last Option', value: 28 },
]

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { EditSelectAttribute } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditSelectAttribute
      options={object('options', options )}
      title={text('title', 'Some title')}
      onClose={action('cancel')}
      onSubmit={action('save')}
    >
      Some content
    </EditSelectAttribute>
  )),
);

stories.add(
  'with selected value',
  withInfo(`
    ~~~js
    import { EditSelectAttribute } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditSelectAttribute
      options={object('options', options )}
      value={14}
      title={text('title', 'Some title')}
      onClose={action('cancel')}
      onSubmit={action('save')}
    >
      Some content
    </EditSelectAttribute>
  )),
);
