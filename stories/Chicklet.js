import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import Chicklet from 'ui/Chicklet';

const stories = storiesOf('ui|Chicklet', module);
stories.addDecorator(withKnobs);

stories.add(
  'Standard',
  withInfo(`
  ~~~js
  import { Chicklet } from 'pw-ui/ui';
  ~~~
  `)(() => (
    <Chicklet
      className="mr1 rounded orange-primary nowrap bg-orange-highlight inline-block my1x3 px1/3"
      onClick={action('clicked')}
    >
      Chicklet content
    </Chicklet>
  )),
);

stories.add(
  'Custom Chicklet',
  withInfo(`
  ~~~js
  import { Chicklet } from 'pw-ui/ui';
  ~~~
  `)(() => (
    <Chicklet
      className={text('className', 'mr1 bold px1/3 sky-blue')}
      onClick={action('clicked')}
    >
      Custom Chicklet
    </Chicklet>
  )),
);
