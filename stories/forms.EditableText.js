import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import EditableText from 'ui/forms/EditableText';

const stories = storiesOf('ui|forms/EditableText', module);
stories.addDecorator(withKnobs);

stories.add(
  'with text',
  withInfo(`
    ~~~js
    import { EditableText } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditableText
      text={text('text', 'Some text')}
      placeholder={text('placeholder', 'Some placeholder')}
      isEditable={boolean('isEditable', true)}
      onChange={action('onChange')}
    />
  )),
);

stories.add(
  'placeholder',
  withInfo(`
    ~~~js
    import { EditableText } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditableText
      text={text('text', '')}
      placeholder={text('placeholder', 'Some placeholder')}
      isEditable={boolean('isEditable', true)}
      onChange={action('onChange')}
    />
  )),
);

stories.add(
  'non editable',
  withInfo(`
    ~~~js
    import { EditableText } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <EditableText
      text={text('text', 'Some text non editable')}
      placeholder={text('placeholder', 'Some placeholder')}
      isEditable={boolean('isEditable', false)}
      onChange={action('onChange')}
    />
  )),
);
