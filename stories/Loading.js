import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import Loading from 'ui/Loading';

const stories = storiesOf('ui|Loading', module);
stories.addDecorator(withKnobs);

stories.add(
  'default',
  withInfo(`
    ~~~js
    import { Loading } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <Loading
      text={text('text')}
      className={text('className')}
    />
  )),
);
