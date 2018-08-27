import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import Loading from 'ui/Loading';

const stories = storiesOf('ui|Loading', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { Loading } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <Loading
      text={text('text')}
      containerClassName={text('containerClassName')}
      textClassName={text('textClassName')}
      srcGif={text('srcGif')}
    />
  )),
);

stories.add(
  'Custom Loader',
  withInfo(`
    ~~~js
    import { Loading } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <Loading
      text={text('text', 'Another spinner')}
      containerClassName={text('containerClassName', 'bg-orange-highlight')}
      textClassName={text('textClassName', 'red bold pb1')}
      srcGif={text('srcGif', 'https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif')}
    />
  )),
);
