import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';
import Input from 'ui/forms/Input';

const stories = storiesOf('ui|forms/Input', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withState({ value: 'Some text' })(
    withInfo(`
      ~~~js
      import { Input } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <Input
        className={text('className', '')}
        inputRef={() => {}}
        maxLength={number('maxLength', 100)}
        placeholder={text('placeholder', 'Some placeholder')}
        value={store.state.value}
        validRegex={object('validRegex', null)}
        viewOnly={boolean('viewOnly', false)}
        onBlur={action('onBlur')}
        onChange={(e) => store.set({ value: e })}
        onSubmit={action('onSubmit')}
        autoFocus={boolean('autoFocus', false)}
        prefix={text('prefix', '')}
        prefixClassName={text('prefixClassName', '')}
      />
    )),
  ),
);

stories.add(
  'View only',
  withState({ value: 'Some text' })(
    withInfo(`
      ~~~js
      import { Input } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <Input
        inputRef={() => {}}
        placeholder={text('placeholder', 'Some placeholder')}
        value={store.state.value}
        viewOnly={boolean('viewOnly', true)}
        prefix={text('prefix', '')}
        prefixClassName={text('prefixClassName', '')}
      />
    )),
  ),
);

stories.add(
  'With prefix',
  withState({ value: 'Some text with prefix' })(
    withInfo(`
      ~~~js
      import { Input } from 'react-ui/ui/forms';
      ~~~
    `)(({ store }) => (
      <Input
        inputRef={() => {}}
        placeholder={text('placeholder', 'Some placeholder')}
        value={store.state.value}
        viewOnly={boolean('viewOnly', false)}
        prefix={text('prefix', '$')}
        prefixClassName={text('prefixClassName', 'bold red')}
      />
    )),
  ),
);
