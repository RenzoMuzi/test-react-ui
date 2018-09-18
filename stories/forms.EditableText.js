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
  'With text',
  withState({ text: 'Some text' })(
    withInfo(`
      ~~~js
      import { EditableText } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <EditableText
        text={text('text', store.state.text)}
        placeholder={text('placeholder', 'Some placeholder')}
        isEditable={boolean('isEditable', true)}
        onChange={(e) => store.set({ text: e })}
      />
    )),
  ),
);

stories.add(
  'Placeholder',
  withState({ text: '' })(
    withInfo(`
      ~~~js
      import { EditableText } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <EditableText
        text={text('text', store.state.text)}
        placeholder={text('placeholder', 'Some placeholder')}
        isEditable={boolean('isEditable', true)}
        onChange={(e) => store.set({ text: e })}
      />
    )),
  ),
);

stories.add(
  'Custom Icon',
  withState({ text: '' })(
    withInfo(`
      ~~~js
      import { EditableText } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <EditableText
        text={text('text', store.state.text)}
        placeholder={text('placeholder', 'Custom icon')}
        icon={text('icon', 'edit')}
        iconClassName={text('iconClassName', 'pl1')}
        isEditable={boolean('isEditable', true)}
        onChange={(e) => store.set({ text: e })}
      />
    )),
  ),
);

stories.add(
  'Non editable',
  withInfo(`
    ~~~js
    import { EditableText } from 'react-ui/ui/forms';
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


stories.add(
  'With save and cancel buttons',
  withState({ text: 'Some text' })(
    withInfo(`
      ~~~js
      import { EditableText } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <EditableText
        text={text('text', store.state.text)}
        placeholder={text('placeholder', 'Some placeholder')}
        isEditable={boolean('isEditable', true)}
        onChange={(e) => store.set({ text: e })}
        saveButtons
        cancelBtnClassName={text('cancelBtnClassName', 'uppercase')}
        saveBtnClassName={text('saveBtnClassName', 'uppercase primary pointer')}
      />
    )),
  ),
);
