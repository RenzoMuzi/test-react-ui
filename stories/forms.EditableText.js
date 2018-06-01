import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import EditableText from 'ui/forms/EditableText';

const stories = storiesOf('ui|forms/EditableText', module);
stories.addDecorator(withKnobs);

stories.add(
  'with text',
  withState({ text: 'Some text' })(
    withInfo(`
      ~~~js
      import { EditableText } from 'pw-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <EditableText
        text={text('text', store.state.text)}
        placeholder={text('placeholder', 'Some placeholder')}
        isEditable={boolean('isEditable', true)}
        onChange={(e) => store.set({ text: e })}
      />
    ))
  ),
);

stories.add(
  'placeholder',
  withState({ text: '' })(
    withInfo(`
      ~~~js
      import { EditableText } from 'pw-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <EditableText
        text={text('text', store.state.text)}
        placeholder={text('placeholder', 'Some placeholder')}
        isEditable={boolean('isEditable', true)}
        onChange={(e) => store.set({ text: e })}
      />
    ))
  ),
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
