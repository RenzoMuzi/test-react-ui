import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, number, boolean, object } from '@storybook/addon-knobs';
import { Textarea } from 'ui/forms/Textarea';
import { withState } from '@dump247/storybook-state';

const stories = storiesOf('ui|forms/Textarea', module);
stories.addDecorator(withKnobs);

const onSubmit = () => {
  // eslint-disable-next-line
  alert('Submitted');
};

stories.add(
  'default',
  withState({ value: 'This is the value' })(
    withInfo(`
    ~~~js
    import { Textarea } from 'pw-ui/ui/forms';
    ~~~
    `)(({ store }) => (
      <Textarea
        {...store.state}
        viewOnly={boolean('viewOnly', false)}
        className={text('className', '')}
        maxLength={number('maxLength', 120)}
        placeholder={text('placeholder', '')}
        validRegex={object('validRegex', null)}
        autoFocus={boolean('autoFocus', false)}
        onChange={(e) => store.set({ value: e })}
      />
    ))),
);

stories.add(
  'view only',
  withState({ value: 'This is the value' })(
    withInfo(`
    ~~~js
    import { Textarea } from 'pw-ui/ui/forms';
    ~~~
    `)(({ store }) => (
      <Textarea
        {...store.state}
        onChange={(e) => store.set({ value: e })}
        viewOnly={boolean('viewOnly', true)}
        className={text('className', '')}
        maxLength={number('maxLength', 100)}
        placeholder={text('placeholder', 'This is the placeholder')}
        validRegex={object('validRegex', null)}
        autoFocus={boolean('autoFocus', false)}
        onSubmit={onSubmit}
      />
    ))),
);
