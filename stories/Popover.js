import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import Popover from 'ui/Popover';
import TextareaWithPopover from 'ui/forms/Textarea';

const stories = storiesOf('ui|Popover', module);
stories.addDecorator(withKnobs);

stories.add(
  'Default',
  withInfo(`
    ~~~js
    import { Popover } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <div style={{ height: '42px' }}>
      <Popover
        content={text('content', 'Custom content')}
      />
    </div>
  )),
);

stories.add(
  'Custom Popover',
  withInfo(`
    ~~~js
    import { Popover } from 'pw-ui/ui';
    ~~~
  `)(() => (
    <div style={{ height: '42px' }}>
      <Popover
        content={text('content', 'Custom content')}
        popoverClassName={text('popoverClassName', 'c-popover-custom')}
        containerClassName={text('containerClassName', 'black bold')}
      />
    </div>
  )),
);

stories.add(
  'Textarea with popover',
  withInfo(`
    ~~~js
    import { TextareaWithPopover } from 'pw-ui/ui/forms';
    ~~~
  `)(() => (
    <div className="max-width-1">
      <TextareaWithPopover
        value="Some value"
        errorMessage={{ id: 1, text: 'Popover content' }}
      />
    </div>
  )),
);
