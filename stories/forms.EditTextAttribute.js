import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, number, boolean } from '@storybook/addon-knobs';
import EditTextAttribute from 'ui/forms/EditTextAttribute';

const stories = storiesOf('ui|forms/EditTextAttribute', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { EditTextAttribute } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditTextAttribute
      isOpen={boolean('isOpen', true)}
      maxLength={number('maxLength', 20)}
      title={text('title', 'Some title')}
      text={text('text', 'Some text to edit')}
      validRegex={object('validRegex', null)}
      closeModal={action('cancel')}
      onSubmit={action('save')}
    />
  )),
);
