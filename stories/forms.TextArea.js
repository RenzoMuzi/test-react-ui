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
  'Default',
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
        showLimit={boolean('showLimit', false)}
        containerClassName={text('containerClassName')}
        limitClassName={text('limitClassName')}
      />
    ))),
);

stories.add(
  'With limit',
  withState({ value: 'This TextArea has a limit! And we can show it!' })(
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
        showLimit={boolean('showLimit', true)}
        containerClassName={text('containerClassName')}
        limitClassName={text('limitClassName', 'bold p1/2')}
      />
    ))),
);

stories.add(
  'View only',
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
        showLimit={boolean('showLimit', true)}
        limitClassName={text('limitClassName')}
        containerClassName={text('containerClassName')}
      />
    ))),
);
